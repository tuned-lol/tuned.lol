import type { User } from 'lucia';

interface Props {
  user: User;
}

export function UserMenu({ user }: Props) {
  return (
    <div className='ml-auto'>
      <div className='flex items-center bg-zinc-900'>
        <span>{user.name}</span>
        <img
          src={user.image}
          className='w-10 h-10 rounded-full'
          alt={user.name}
        />
      </div>
    </div>
  );
}
