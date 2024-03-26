import { Menu, Transition } from '@headlessui/react';
import type { Session, User } from 'lucia';
import Link from 'next/link';
import { Fragment } from 'react';
import { logout } from '~/actions';

interface Props {
  user: User;
  session: Session;
}

export function UserMenu({ user, session }: Props) {
  return (
    <Menu as='div' className='relative ml-auto'>
      <Menu.Button type='button'>
        <div className='flex items-center p-0.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-full'>
          <span className='pl-2.5 pr-2 font-medium text-[15px] leading-4'>
            {user.name}
          </span>
          <img
            src={user.image}
            className='w-[34px] h-[34px] rounded-full'
            alt={user.name}
          />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-300'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-100'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 rounded-xl shadow-lg origin-top-right focus:outline-none'>
          <div className='p-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/'
                  className={`${
                    active
                      ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'
                      : 'border-transparent'
                  } flex items-center w-full px-2.5 py-2 font-medium text-zinc-800 dark:text-zinc-100 text-sm border rounded-[10px]`}
                >
                  프로필
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/'
                  className={`${
                    active
                      ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'
                      : 'border-transparent'
                  } flex items-center w-full px-2.5 py-2 font-medium text-zinc-800 dark:text-zinc-100 text-sm border rounded-[10px]`}
                >
                  설정
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className='p-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  type='button'
                  className={`${
                    active
                      ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'
                      : 'border-transparent'
                  } flex items-center w-full px-2.5 py-2 font-medium text-zinc-800 dark:text-zinc-100 text-sm border rounded-[10px]`}
                  onClick={() => logout(session)}
                >
                  로그아웃
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
