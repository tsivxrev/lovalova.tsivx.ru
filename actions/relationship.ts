'use server';

import database from '@/lib/mongodb';
import { Nullable, Relationship, User } from '@/types';
import { Document, Filter } from 'mongodb';
import { getAuthUser, getUser } from './user';

export async function getRelationship(filter: Filter<Document>): Promise<Nullable<Relationship>> {
    const relationship = await database.collection('relationships').findOne<Nullable<Relationship>>(filter, { projection: { _id: 0 } });

    if (!relationship) return null;

    relationship.partners = await Promise.all(relationship.partner_ids.map(async (partnerId) => {
        const user = await getUser({ id: partnerId }) as User;
        return user;
    }));

    return relationship;
}

type UpdateRelationship = {
    id: string,
    name: string,
    description: string,
    cover: string,
}

type UpdateRelationshipResult = {
    success: boolean,
    message: string,
}

export async function editRelationship({ id, name, description, cover }: UpdateRelationship): Promise<UpdateRelationshipResult> {
    const user = await getAuthUser();

    if (!user) {
        return { success: false, message: 'Пользователь не найден' };
    }

    const relationship = await getRelationship({ partner_ids: user.id });

    if (!relationship) {
        return { success: false, message: 'Отношения не найдены' };
    }

    try {
        await database.collection('relationships').updateOne({ partner_ids: user.id }, { $set: { id, name, description, cover } });

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
