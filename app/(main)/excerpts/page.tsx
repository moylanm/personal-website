import { fetchAllExcerpts } from "@/app/_lib/data";
import FilterForm from "./_components/FilterForm";
import List from "./_components/List";
import { unstable_cache } from "next/cache";

const getAllExcerpts = unstable_cache(
  async () => {
    return await fetchAllExcerpts();
  },
  ['excerpts'],
  { revalidate: 3600, tags: ['excerpts'] }
);

export default async function Page() {
  const excerpts = await getAllExcerpts();

  return (
    <>
      <FilterForm />
      <List excerpts={excerpts} />
    </>
  );
}

