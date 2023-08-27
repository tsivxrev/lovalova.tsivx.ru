import { Relationship } from '@/types';
import React from 'react';
import Tag from '../tags/Tag';
import Tags from '../tags/TagsList';
import { Separator } from '../ui/separator';
import {
    Tabs, TabsContent, TabsList, TabsTrigger,
} from '../ui/tabs';
import RelationshipInfo from './RelationshipInfo';
import RelationshipPartnerAvatars from './RelationshipPartnerAvatars';

export default function RelationshipCard({ children, relationship }: { children: React.ReactNode, relationship: Relationship }) {
    return (
        <div className="w-full rounded-md p-4 border flex flex-col gap-3 items-center">
            <div style={{ backgroundImage: `url(${relationship.cover})` }} className="!w-full !h-56 bg-neutral bg-center bg-cover rounded-md border"></div>

            <RelationshipPartnerAvatars partners={relationship.partners} />

            <div className="info flex flex-col items-center text-center">
                <div className="name text-2xl font-medium">{relationship.name}</div>
                <div className="description">{relationship.description}</div>
            </div>

            <Tags>
                <Tag variant='default'>@{relationship.id}</Tag>
                {relationship.tags.map((tag) => (
                    <Tag key={tag.type} variant={tag.type}>{tag.text}</Tag>
                ))}
            </Tags>

            {children}

            <Separator />

            <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-3">
                    <TabsTrigger value="info">Информация</TabsTrigger>
                    <TabsTrigger value="todos">Планы</TabsTrigger>
                    <TabsTrigger value="gallery">Моменты</TabsTrigger>
                </TabsList>

                <TabsContent className='info flex flex-col gap-2' value="info">
                    <RelationshipInfo relationship={relationship} />
                </TabsContent>

                <TabsContent className='todos' value="todos">
                    <div>In dev</div>
                </TabsContent>

                <TabsContent className="gallery" value="gallery">
                    <div>In dev</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
