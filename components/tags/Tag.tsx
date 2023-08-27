import { Nullable } from '@/types';
import React from 'react';
import { Badge } from '../ui/badge';

export default function Tag({ children, variant }: { children: React.ReactNode, variant?: Nullable<'default' | 'secondary' | 'destructive' | 'outline'> }) {
    return (
        <Badge className='cursor-pointer' variant={variant}>
            {children}
        </Badge>
    );
}
