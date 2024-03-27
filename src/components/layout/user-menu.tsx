import { Menu, Transition } from '@headlessui/react';
import type { Session, User } from 'lucia';
import Link from 'next/link';
import { Fragment } from 'react';
import { logout } from '~/actions';
import { cn } from '~/lib/cn';

interface Props {
  user: User;
  session: Session;
}

export function UserMenu({ user, session }: Props) {
  return (
    <Menu as='div' className='relative ml-auto'>
      <div className='flex items-center'>
        <Menu.Button type='button'>
          {({ open }) => (
            <img
              src={user.image}
              className={cn(
                'w-[38px] h-[38px] border border-zinc-50 dark:border-zinc-900 rounded-full',
                open && 'ring-2 ring-blue-200 dark:ring-blue-800',
              )}
              alt={user.name}
            />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-300'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-100'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-1 w-36 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 rounded-xl shadow-lg origin-top-right focus:outline-none'>
          <div className='p-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href='/'
                  className={`${
                    active
                      ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'
                      : 'border-transparent'
                  } flex items-center w-full px-2.5 py-2 font-medium text-zinc-800 dark:text-zinc-100 text-[15px] border rounded-[10px]`}
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
                  } flex items-center w-full px-2.5 py-2 font-medium text-zinc-800 dark:text-zinc-100 text-[15px] border rounded-[10px]`}
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
                  } flex items-center w-full px-2.5 py-2 font-medium text-zinc-800 dark:text-zinc-100 text-[15px] border rounded-[10px]`}
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
