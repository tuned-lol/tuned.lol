import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { google, lucia } from '~/lib/auth';
import { db } from '~/lib/db';
import { userTable } from '~/lib/schema';
import type { GoogleUser } from '~/types.d';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('oauth_state')?.value ?? null;
  const codeVerifier = cookies().get('code_verifier')?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    !codeVerifier ||
    state !== storedState
  ) {
    redirect('/?error');
  }

  const res = await (async (): Promise<
    { success: true; redirect: string } | { success: false; status: number }
  > => {
    try {
      const tokens = await google(url).validateAuthorizationCode(
        code,
        codeVerifier,
      );
      const user: GoogleUser = await fetch(
        'https://openidconnect.googleapis.com/v1/userinfo',
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        },
      ).then((res) => res.json());

      const existingUser = await db.query.user.findFirst({
        where: (u, { eq }) => eq(u.googleId, user.sub),
      });

      if (existingUser) {
        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );

        return { success: true, redirect: '/' };
      }

      const userId = generateId(15);

      await db.insert(userTable).values({
        id: userId,
        googleId: user.sub,
        name: user.name,
        email: user.email,
        image: user.picture,
        createdAt: Date.now(),
      });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { success: true, redirect: '/onboard' };
    } catch (e) {
      if (e instanceof OAuth2RequestError) {
        return { success: false, status: 400 };
      }
      console.error(e);
      return { success: false, status: 500 };
    }
  })();

  if (!res.success) redirect('/?error');

  redirect(res.redirect);
}
