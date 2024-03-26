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

const items: { href: string; label: string }[] = [
  { href: '/', label: '탐색' },
  { href: '/radio', label: '라디오' },
  { href: '/library', label: '보관함' },
];

export function Nav({ user, session }: Props) {
  const pathname = usePathname();

  return (
    <nav className='flex sticky top-0 h-[4.5rem] px-4 bg-white dark:bg-zinc-950 border-b border-b-zinc-100 dark:border-b-zinc-800 select-none'>
      <div className='flex items-center w-full max-w-4xl mx-auto'>
        <Link className='flex items-center gap-x-2' href='/'>
          <Logo className='w-7 h-7' />
          <h1 className='font-display font-semibold text-2xl leading-7'>
            tuned
          </h1>
        </Link>
        <ul className='flex h-full ml-10'>
          {items.map((item) => (
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
                className='flex items-center h-full px-5 font-medium group-data-[selected]:font-semibold text-zinc-600 group-data-[selected]:text-black dark:text-zinc-300 dark:group-data-[selected]:text-white hover:opacity-80'
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
            className='flex items-center gap-x-2 ml-auto px-3 py-2 bg-zinc-50 dark:bg-zinc-900 font-semibold text-zinc-700 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-800 rounded-full'
            onClick={() => login(location.href)}
          >
            <GoogleIcon className='w-5 h-5' />
            <span className='flex-shrink-0'>로그인</span>
          </button>
        )}
        {user && session && <UserMenu user={user} session={session} />}
      </div>
    </nav>
  );
}
