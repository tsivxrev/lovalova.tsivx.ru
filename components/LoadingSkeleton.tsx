import { Skeleton } from './ui/skeleton';

export default function LoadingSkeleton() {
    return (
        <div className="flex flex-col gap-4 items-center py-2">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex flex-col items-center gap-2 w-full">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
            </div>
        </div>
    );
}
