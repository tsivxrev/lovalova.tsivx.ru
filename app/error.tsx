'use client';

import ErrorCard from '@/components/ErrorCard';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function ErrorView({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <>
            <ErrorCard title='Произошла ошибка' description={error.message}>
                <XCircle className="flex h-12 w-12" />
            </ErrorCard>
            <Button onClick={() => { reset(); }}>Перезагрузить страницу</Button>
        </>
    );
}
