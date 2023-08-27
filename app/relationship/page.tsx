import { getRelationship } from '@/actions/relationship';
import { getAuthUser } from '@/actions/user';
import RelationshipCard from '@/components/relationship/RelationshipCard';
import { RelationshipEditDialog } from '@/components/relationship/RelationshipEditDialog';
import { notFound, redirect } from 'next/navigation';

export default async function RelationshipMy() {
    const user = await getAuthUser();

    if (!user) {
        redirect('/auth');
    }

  const relationship = await getRelationship({ partner_ids: user.id });

  if (!relationship) {
    notFound();
  }

  return (
    <RelationshipCard relationship={relationship}>
        <RelationshipEditDialog relationship={relationship} />
    </RelationshipCard>
  );
}
