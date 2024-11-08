import type { Metadata } from 'next';
import { allExcerpts } from '@/lib/data';
import Excerpts from '@/app/ui/excerpts/Excerpts'

export const metadata: Metadata = {
  title: 'Excerpts'
};

export default async function Page() {
  const excerpts = await allExcerpts();

  return <Excerpts excerpts={excerpts} />
}
