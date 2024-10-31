import type { Metadata } from 'next';
import { fetchExcerptById } from "@/app/_lib/data";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { cache } from "react";
import Markdown from 'react-markdown';

const getExcerpt = cache(async (id: string) => {
	const excerpt = await fetchExcerptById(id);

  if (!excerpt) notFound()

  return excerpt;
});

export async function generateMetadata({
	params
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const { id } = await params;

	const { author } = await getExcerpt(id);

	return {
		title: author
	};
}

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const {
    author,
    work,
    body
  } = await getExcerpt(id);

  return (
		<Container maxWidth='md'>
			<Card sx={{
				p: 2,
				mt: '180px',
				mb: '110px',
				mx: 3,
				display: 'flex',
				justifyContent: 'center',
			}}>
				<CardContent>
					<Typography sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
						{author}
						<br />
						{work}
					</Typography>
					<Markdown>
						{body}
					</Markdown>
				</CardContent>
			</Card>
		</Container>
	);
}
