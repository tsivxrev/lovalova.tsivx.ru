'use client';

import { Nullable, User } from '@/types';
import React, { createContext, useContext } from 'react';

const UserContext = createContext<Nullable<User>>(null);

export function UserProvider({ children, user }: { children: React.ReactNode, user: Nullable<User> }) {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): Nullable<User> {
    const user = useContext(UserContext);
    return user;
}
