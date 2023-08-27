import { getUser } from '@/actions/user';
import UserCard from '@/components/user/UserCard';
import { notFound } from 'next/navigation';

export default async function UserView({ params }: { params: { username: string } }) {
  const user = await getUser({ username: params.username });

  if (!user) {
    notFound();
  }

  return (
    <UserCard user={user}>
    </UserCard>
  );
}
