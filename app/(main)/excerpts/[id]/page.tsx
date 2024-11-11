import { Metadata } from 'next';
import { Typography } from '@mui/material';
import { excerptById } from '@/lib/data';
import Markdown from 'react-markdown';

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const id = (await params).id;
  const excerpt = await excerptById(id);

  return {
    title: excerpt.author
  };
}

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
	const id = (await params).id;
	const { author, work, body } = await excerptById(id);

  return (
		<>
			<Typography sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
				{author}
				<br />
				{work}
			</Typography>
			<Markdown>
				{body}
			</Markdown>
		</>
	);
}
