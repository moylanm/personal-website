import type { Metadata } from 'next';
import { excerptById } from '@/lib/data';
import { Card, CardContent, Container, Typography } from '@mui/material';
import Markdown from 'react-markdown';
import { Suspense } from 'react';
import BodySkeleton from '@/app/ui/excerpts/BodySkeleton';

export async function generateMetadata({
	params
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const id = (await params).id;

	const { author } = await excerptById(id);

	return {
		title: author
	};
}

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id;
  const {
    author,
    work,
  } = await excerptById(id);

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
					<Suspense fallback={<BodySkeleton />}>
						<ExcerptBody id={id} />
					</Suspense>
				</CardContent>
			</Card>
		</Container>
	);
}

async function ExcerptBody({ id }: { id: string }) {
	const { body } = await excerptById(id);

	return (
		<Markdown>
			{body}
		</Markdown>
	);
}