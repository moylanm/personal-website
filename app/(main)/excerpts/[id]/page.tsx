import { fetchExcerptById, fetchExcerpts } from "@/app/lib/data";
import type { Excerpt } from "@/app/lib/definitions";
import Markdown from 'react-markdown';

export async function generateStaticParams() {
  return await fetchExcerpts();
}

export default async function Page({
  params
}: {
  params: Excerpt
}) {
  const { id } = await params;
  const {
    author,
    work,
    body
  } = await fetchExcerptById(id);

  return (
    <>
      <h2>Excerpt detail page...</h2>
      <h3>{author}</h3>
      <h3>{work}</h3>
      <Markdown>{body}</Markdown>
    </>
  );
}
