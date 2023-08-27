import { getAuthUser } from '@/actions/user';
import UserCard from '@/components/user/UserCard';
import { UserEditDialog } from '@/components/user/UserEditDialog';
import { redirect } from 'next/navigation';

export default async function UserMeView() {
    const user = await getAuthUser();

    if (!user) {
        redirect('/auth');
    }

    return (
        <UserCard user={user}>
            <UserEditDialog user={user} />
        </UserCard>
    );
}
