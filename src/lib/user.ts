import type { Session, User } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { lucia } from './auth';

export const getSession = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { user: null, session: null };

    const res = await lucia.validateSession(sessionId);

    try {
      if (res.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(res.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!res.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}

    return res;
  },
);
