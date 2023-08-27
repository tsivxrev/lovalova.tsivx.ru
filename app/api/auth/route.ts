import { createUser, getAuthUser } from '@/actions/user';
import { checkTelegramHash } from '@/lib/utils';
import { TelegramUser } from '@/types';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams) as TelegramUser;

    const valid = checkTelegramHash(params);

    if (valid) {
        const cookieStore = cookies();
        cookieStore.set('telegram-user-data', JSON.stringify(params));

        let user = await getAuthUser();
        if (!user) {
            user = await createUser({
                id: +params.id,
                name: params.first_name,
                username: params.username || randomUUID(),
                avatar: params.photo_url || 'https://vk.com/images/camera_200.png',
            });
        }

        redirect(`/user/${user?.username}`);
    } else {
        redirect('/auth');
    }
}
