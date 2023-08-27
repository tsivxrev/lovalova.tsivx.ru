'use client';

import { calculateDaysDifftoNow, declOfNum } from '@/lib/utils';
import { Relationship } from '@/types';
import dayjs from 'dayjs';
import { ExternalLink, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Summary = ({ relationship }: { relationship: Relationship }) => {
  const daysDiff = calculateDaysDifftoNow(relationship.created_at);
  const startDate = dayjs(+relationship.created_at * 1000).format('DD MMMM YYYY');

  return (
        <div className="summary grid grid-cols-1">
            <div className="flex gap-4 items-center px-6 py-4 bg-muted rounded-md">
                <div className="info w-full flex flex-col">
                    <div className="days-count text-sm">{relationship.partners.map((partner) => partner.name).join(' и ')} вместе</div>
                    <div className="days-count text-primary text-4xl font-bold">{`${daysDiff} ${declOfNum(daysDiff, ['день', 'дня', 'дней'])}`}</div>
                    <div className="days-count text-sm">начиная с {startDate}</div>
                </div>
                <Heart className='h-12 w-12 text-primary' />
            </div>
        </div>
  );
};

const Stats = ({ relationship }: { relationship: Relationship }) => {
  const completedTodos = relationship.todos.filter((todoItem) => todoItem.completed).length;
  const momentsCount = relationship.todos.length; // todo

  return (
        <div className="stats grid grid-cols-2 gap-2">
            <div className="flex gap-4 items-center px-6 py-4 bg-muted rounded-md">
                <div className="info w-full flex flex-col">
                    <div className="days-count text-sm">Выполнили</div>
                    <div className="days-count text-primary text-4xl font-bold">{completedTodos}</div>
                    <div className="days-count text-sm">общих {declOfNum(completedTodos, ['план', 'плана', 'планов'])}</div>
                </div>
            </div>

            <div className="flex gap-4 items-center px-6 py-4 bg-muted rounded-md">
                <div className="info w-full flex flex-col">
                    <div className="days-count text-sm">Запечатлили</div>
                    <div className="days-count text-primary text-4xl font-bold">{momentsCount}</div>
                    <div className="days-count text-sm">{declOfNum(momentsCount, ['момент', 'момента', 'моментов'])}</div>
                </div>
            </div>
        </div>
  );
};

const PartnerLinks = ({ relationship }: { relationship: Relationship }) => {
  const router = useRouter();

  return (
        <div className="partners grid grid-cols-2 gap-2">
            {relationship.partners.map((partner) => (
                <div
                    onClick={() => { router.push(`/user/${partner.username}`); }}
                    key={partner.username}
                    style={{ backgroundImage: `url(${partner.avatar})` }}
                    className="partner-card h-32 bg-cover bg-center flex justify-center items-center rounded-md transition-opacity cursor-pointer hover:opacity-50"
                >
                    <ExternalLink className='h-8 w-8 bg-muted rounded-md p-1' />
                </div>
            ))}
        </div>
  );
};

export default function RelationshipInfo({ relationship }: { relationship: Relationship }) {
    return (
        <>
            <Summary relationship={relationship} />
            <Stats relationship={relationship} />
            <PartnerLinks relationship={relationship} />
        </>
    );
}
