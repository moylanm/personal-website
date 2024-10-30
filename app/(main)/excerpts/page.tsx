import { fetchAllExcerpts } from "@/app/_lib/data";
import FilterForm from "./_components/FilterForm";
import List from "./_components/List";

export default async function Page() {
  const excerpts = await fetchAllExcerpts();

  return (
    <>
      <FilterForm excerpts={excerpts} />
      <List excerpts={excerpts} />
    </>
  );
}

