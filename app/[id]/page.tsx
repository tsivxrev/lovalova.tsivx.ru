import { getRelationship } from '@/actions/relationship';
import RelationshipCard from '@/components/relationship/RelationshipCard';
import { notFound } from 'next/navigation';

export default async function Relationship({ params }: { params: { id: string } }) {
  const relationship = await getRelationship({ id: params.id });

  if (!relationship) {
    notFound();
  }

  return (
    <RelationshipCard relationship={relationship}>
    </RelationshipCard>
  );
}
