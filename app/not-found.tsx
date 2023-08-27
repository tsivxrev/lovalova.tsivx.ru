import ErrorCard from '@/components/ErrorCard';
import { HelpCircle } from 'lucide-react';

export default function NotFoundView() {
    return (
        <ErrorCard title='404' description='Кажется, тут ничего нет'>
            <HelpCircle className="flex h-12 w-12" />
        </ErrorCard>
    );
}
