'use server';

import { generateCodeVerifier, generateState } from 'arctic';
import type { CookieAttributes, Session } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { google, lucia } from './lib/auth';

export async function login(url: string) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const authUrl = await google(new URL(url)).createAuthorizationURL(
    state,
    codeVerifier,
    { scopes: ['profile', 'email'] },
  );

  const attributes: CookieAttributes = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  };

  cookies().set('oauth_state', state, attributes);
  cookies().set('code_verifier', codeVerifier, attributes);

  redirect(authUrl.toString());
}

export async function logout(session: Session) {
  await lucia.invalidateSession(session.id);

  const cookie = lucia.createBlankSessionCookie();
  cookies().set(cookie.name, cookie.value, cookie.attributes);

  redirect('/');
}
