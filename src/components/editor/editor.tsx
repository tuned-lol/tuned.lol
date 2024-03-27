import type { Session, User } from 'lucia';
import { Nav } from './nav';
import { Items } from './items';

interface Props {
  user: User | null;
  session: Session | null;
}

export async function Editor({ user, session }: Props) {
  return (
    <div className='flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950'>
      <Nav user={user} session={session} />
      <div className='flex h-full'>
        <Items />
      </div>
    </div>
  );
}
