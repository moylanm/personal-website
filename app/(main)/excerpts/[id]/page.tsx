import { fetchExcerptById } from "@/app/lib/data";
import Markdown from 'react-markdown';

export default async function Page({
  params
}: {
  params: { id: string }
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
