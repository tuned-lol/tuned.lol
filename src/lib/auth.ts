import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Google } from 'arctic';
import { Lucia } from 'lucia';
import { db } from './db';
import { sessionTable, userTable } from './schema';

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => ({
    googleId: attributes.googleId,
    name: attributes.name,
    email: attributes.email,
    image: attributes.image,
    createdAt: attributes.createdAt,
  }),
});

interface DatabaseUserAttributes {
  googleId: string;
  name: string;
  email: string;
  image: string;
  createdAt: number;
}

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export const google = (url: URL) =>
  new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    `${url.protocol}//${url.host}/callback`,
  );
