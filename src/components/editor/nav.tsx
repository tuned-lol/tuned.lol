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
      <nav className='flex sticky top-0 h-16 px-6 bg-gray-app select-none'>
        <div className='flex items-center w-full mx-auto'>
          <Link href='/'>
            <Logo className='w-7 h-7' />
          </Link>
          <input
            placeholder='제목을 입력하세요'
            className='w-60 ml-4 px-3 py-1.5 bg-gray-subtle font-medium border border-gray-4 dark:border-graydark-4 focus:border-blue-8 dark:focus:border-bluedark-8 rounded-xl focus:ring-2 focus:ring-blue-5 dark:focus:ring-bluedark-5 focus:outline-none'
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
                  className='flex items-center h-full px-5 font-medium group-data-[selected]:font-semibold text-gray-11 group-data-[selected]:text-black dark:text-graydark-11 dark:group-data-[selected]:text-white hover:opacity-80'
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
      <section className='h-12 mx-2 mb-2 bg-gray-subtle border border-gray-4 dark:border-graydark-4 rounded-xl shadow-sm'></section>
    </>
  );
}
