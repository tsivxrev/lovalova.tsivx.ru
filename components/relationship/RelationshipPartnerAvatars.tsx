import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';

export default function RelationshipPartnerAvatars({ partners }: { partners: Array<User> }) {
    return (
        <div className="partner-avatars flex justify-center -space-x-3 w-full">
            {partners.map((partner) => (
                <Avatar key={partner.avatar} className='w-32 h-32 ring ring-primary'>
                    <AvatarImage key={partner.avatar} src={partner.avatar} alt={partner.name} />
                </Avatar>
            ))}
        </div>
    );
}
