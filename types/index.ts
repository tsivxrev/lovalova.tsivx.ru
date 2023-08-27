import { ObjectId } from 'mongodb';

export type Nullable<T> = T | undefined | null;

export type TodoItem = {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    date: number
}

export type ITag = {
    type: 'secondary' | 'default' | 'destructive' | 'outline' | null | undefined,
    text: string
}

export type TelegramUser = {
    id: string,
    first_name: string,
    username?: string,
    photo_url?: string,
    auth_date: string,
    hash: string
}

export type UpdateUser = {
    name: string,
    username: string,
    avatar: string
}

export type UpdateUserResult = {
    success: boolean,
    message: string,
}

export type User = {
    _id?: Nullable<ObjectId>,
    id: number,
    name: string,
    username: string,
    avatar: string,
    tags: Array<ITag>
}

export type Relationship = {
    _id?: Nullable<ObjectId>,
    id: string,
    name: string,
    description: string,
    cover: string,
    created_at: number,
    tags: Array<ITag>,
    partners: Array<User>,
    todos: Array<TodoItem>
    partner_ids: Array<number>,
}
