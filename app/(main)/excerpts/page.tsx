import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid2,
  Typography
} from "@mui/material";
import { unstable_cache } from "next/cache";
import { fetchExcerpts } from "@/app/_lib/data";
import Markdown from "react-markdown";
import type { Excerpt } from "@/app/_lib/definitions";

const CHUNK_SIZE = 12;

const getExcerpts = unstable_cache(
  async () => {
    return await fetchExcerpts();
  },
  ['excerpts'],
  { revalidate: 3600, tags: ['excerpts'] }
);

export default async function Page() {
  const excerpts = await getExcerpts();

  return (
    <>
      <FilterForm excerpts={excerpts} />
      <List excerpts={excerpts} />
    </>
  );
}

const FilterForm = ({
  excerpts
}: {
  excerpts: Excerpt[]
}) => {
  return (
    <>
    </>
  );
};

const List = ({
  excerpts
}: {
  excerpts: Excerpt[]
}) => {
  return (
    <>

    </>
  );
}
