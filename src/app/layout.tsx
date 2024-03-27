import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import './fonts.css';
import './index.css';

export const metadata: Metadata = {
  title: {
    template: '%s - tuned',
    default: 'tuned',
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
