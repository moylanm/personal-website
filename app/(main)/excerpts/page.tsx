import type { Metadata } from 'next';
import { fetchAllExcerpts } from '@/app/lib/data';
import { unstable_cache } from 'next/cache';
import Excerpts from '@/app/ui/excerpts/Excerpts'

export const metadata: Metadata = {
  title: 'Excerpts'
};

const getAllExcerpts = unstable_cache(
  async () => {
    return await fetchAllExcerpts();
  },
  ['excerpts'],
  { revalidate: 3600, tags: ['excerpts'] }
);

export default async function Page() {
  const excerpts = await getAllExcerpts();

  return <Excerpts excerpts={excerpts} />;
}
