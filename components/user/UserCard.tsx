'use client';

import { User } from '@/types';
import React from 'react';
import Tag from '../tags/Tag';
import Tags from '../tags/TagsList';
import { Avatar, AvatarImage } from '../ui/avatar';

export default function UserCard({ children, user }: { children: React.ReactNode, user: User }) {
    return (
        <div className="w-full rounded-md p-4 border flex flex-col gap-3 items-center">
            <Avatar className='w-32 h-32 ring-2 ring-primary'>
                <AvatarImage key={user.avatar} src={user.avatar} alt={user.name} />
            </Avatar>

            <div className="info flex flex-col items-center text-center">
                <div className="name text-2xl font-medium">{user.name}</div>
            </div>

            <Tags>
                <Tag variant='default'>@{user.username}</Tag>
                {user.tags.map((tag) => (
                    <Tag key={tag.type} variant={tag.type}>{tag.text}</Tag>))}
            </Tags>

            {children}
        </div>
    );
}
