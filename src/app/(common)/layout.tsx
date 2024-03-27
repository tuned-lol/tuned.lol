import type { PropsWithChildren } from 'react';
import { Nav } from '~/components/layout/nav';
import { getSession } from '~/lib/user';

export default async function CommonLayout({ children }: PropsWithChildren) {
  const { user, session } = await getSession();

  return (
    <>
      <Nav user={user} session={session} />
      {children}
    </>
  );
}
