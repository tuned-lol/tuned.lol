import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { Nav } from '~/components/layout/nav';
import { getSession } from '~/lib/user';
import './fonts.css';
import './index.css';

export const metadata: Metadata = {
  title: {
    template: '%s - tuned',
    default: 'tuned',
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const { user } = await getSession();

  return (
    <html lang='ko'>
      <body>
        <Nav user={user} />
        {children}
      </body>
    </html>
  );
}
