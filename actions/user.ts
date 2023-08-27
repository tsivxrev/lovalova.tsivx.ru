'use server';

import database from '@/lib/mongodb';
import { checkTelegramHash } from '@/lib/utils';
import {
    Nullable, TelegramUser, UpdateUser, UpdateUserResult, User,
} from '@/types';
import { Document, Filter } from 'mongodb';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type CreateUser = {
    id: number,
    name: string,
    avatar: string,
    username: string,
}

export async function createUser({
 id, name, username, avatar,
}: CreateUser): Promise<Nullable<User>> {
    const { insertedId } = await database.collection('users').insertOne({
        id, name, username, avatar, tags: [],
    });

    const user = await database.collection('users').findOne<Nullable<User>>({ _id: insertedId }, { projection: { _id: 0 } });

    return user;
}

export async function getAuthUser(): Promise<Nullable<User>> {
    const auth = cookies().get('telegram-user-data')?.value;

    if (!auth) return null;

    const telegramUser = JSON.parse(auth) as TelegramUser;
    const valid = checkTelegramHash(telegramUser);

    if (!valid) return null;

    const user = await database.collection('users').findOne<Nullable<User>>({ id: +telegramUser.id }, { projection: { _id: 0 } });

    return user;
}

export async function getUser(filter: Filter<Document>): Promise<Nullable<User>> {
    const user = await database.collection('users').findOne<Nullable<User>>(filter, { projection: { _id: 0 } });
    return user;
}

export async function editUser({ name, username, avatar }: UpdateUser): Promise<UpdateUserResult> {
    const user = await getAuthUser();

    if (!user) {
        return { success: false, message: 'Пользователь не найден' };
    }

    try {
        await database.collection('users').updateOne({ id: user.id }, { $set: { name, username, avatar } });

        return {
            success: true,
            message: 'Изменения сохранены',
        };
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
        };
    }
}

export async function logout() {
    const cookieStore = cookies();
    cookieStore.delete('telegram-user-data');

    redirect('/auth');
}
