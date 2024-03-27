'use client';

import type { Session, User } from 'lucia';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { login } from '~/actions';
import { Logo } from '../common/logo';
import { GoogleIcon } from '../icons/google';
import { UserMenu } from '../layout/user-menu';

interface Props {
  user: User | null;
  session: Session | null;
}

type Category = 'worldcup' | 'view' | 'help';

const categories: { name: Category; label: string }[] = [
  { name: 'worldcup', label: '월드컵' },
  { name: 'view', label: '보기' },
  { name: 'help', label: '도움말' },
];

export function Nav({ user, session }: Props) {
  const pathname = usePathname();

  const [category, setCategory] = useState<Category>('worldcup');

  return (
    <>
      <nav className='flex sticky top-0 h-16 px-6 bg-zinc-50 dark:bg-zinc-950 select-none'>
        <div className='flex items-center w-full mx-auto'>
          <Link href='/'>
            <Logo className='w-7 h-7' />
          </Link>
          <input
            placeholder='제목을 입력하세요'
            className='w-60 ml-4 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 font-medium border border-zinc-200 dark:border-zinc-800 focus:border-blue-400 dark:focus:border-blue-600 rounded-xl focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:outline-none'
          />
          <ul className='flex h-full ml-4'>
            {categories.map((item) => (
              <li
                className='relative h-full group'
                data-selected={item.name === category ? true : null}
                key={item.name}
              >
                <button
                  type='button'
                  className='flex items-center h-full px-5 font-medium group-data-[selected]:font-semibold text-zinc-600 group-data-[selected]:text-black dark:text-zinc-300 dark:group-data-[selected]:text-white hover:opacity-80'
                  onClick={() => setCategory(item.name)}
                >
                  {item.label}
                </button>
                <div className='absolute w-full px-6 -bottom-px'>
                  <div className='w-full h-0.5 bg-black dark:bg-white opacity-0 group-data-[selected]:opacity-100 rounded-t-full' />
                </div>
              </li>
            ))}
          </ul>
          {(!user || !session) && (
            <button
              type='button'
              className='flex items-center gap-x-2 ml-auto px-3 py-2 bg-zinc-100 dark:bg-zinc-900 font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-full'
              onClick={() => login(location.href)}
            >
              <GoogleIcon className='w-5 h-5' />
              <span className='flex-shrink-0'>로그인</span>
            </button>
          )}
          {user && session && <UserMenu user={user} session={session} />}
        </div>
      </nav>
      <section className='h-10 mx-2 mb-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900 rounded-xl shadow-sm'></section>
    </>
  );
}
