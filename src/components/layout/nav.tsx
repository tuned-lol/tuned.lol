'use client';

import type { Session, User } from 'lucia';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { login } from '~/actions';
import { Logo } from '../common/logo';
import { GoogleIcon } from '../icons/google';
import { UserMenu } from './user-menu';

interface Props {
  user: User | null;
  session: Session | null;
}

const items: { href: string; label: string; protected?: boolean }[] = [
  { href: '/', label: '탐색' },
  { href: '/radio', label: '라디오' },
  { href: '/editor', label: '만들기', protected: true },
  { href: '/library', label: '보관함' },
];

export function Nav({ user, session }: Props) {
  const pathname = usePathname();

  return (
    <nav className='flex sticky top-0 h-[4.5rem] px-4 bg-gray-app border-b border-b-gray-3 dark:border-b-graydark-3 select-none'>
      <div className='flex items-center w-full max-w-4xl mx-auto'>
        <Link className='flex items-center gap-x-2' href='/'>
          <Logo className='w-7 h-7' />
          <h1 className='font-display font-semibold text-2xl leading-7'>
            tuned
          </h1>
        </Link>
        <ul className='flex h-full ml-10'>
          {items
            .filter((i) => (user && session) || !i.protected)
            .map((item) => (
              <li
                className='relative h-full group'
                data-selected={
                  (
                    item.href !== '/'
                      ? pathname.startsWith(item.href)
                      : pathname === item.href
                  )
                    ? true
                    : null
                }
                key={item.href}
              >
                <Link
                  className='flex items-center h-full px-5 font-medium group-data-[selected]:font-semibold text-gray-11 group-data-[selected]:text-black dark:text-graydark-11 dark:group-data-[selected]:text-white hover:opacity-80'
                  href={item.href}
                >
                  {item.label}
                </Link>
                <div className='absolute w-full px-6 -bottom-px'>
                  <div className='w-full h-0.5 bg-black dark:bg-white opacity-0 group-data-[selected]:opacity-100 rounded-t-full' />
                </div>
              </li>
            ))}
        </ul>
        {(!user || !session) && (
          <button
            type='button'
            className='flex items-center gap-x-2 ml-auto px-3.5 py-2 bg-gray-subtle font-medium text-gray-12 dark:text-graydark-12 border border-gray-4 dark:border-graydark-4 rounded-full'
            onClick={() => login(location.href)}
          >
            <GoogleIcon className='w-[18px] h-[18px]' />
            <span className='flex-shrink-0'>로그인</span>
          </button>
        )}
        {user && session && <UserMenu user={user} session={session} />}
      </div>
    </nav>
  );
}
