import { Editor as _Editor } from '~/components/editor/editor';
import { getSession } from '~/lib/user';

export default async function Editor() {
  const { user, session } = await getSession();

  return <_Editor user={user} session={session} />;
}
