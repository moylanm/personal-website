import type { Metadata } from 'next';
import { excerptById } from '@/lib/data';
import { Card, CardContent, Container, Typography } from '@mui/material';
import Markdown from 'react-markdown';
import { Suspense } from 'react';

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
				<Suspense fallback={<div>Loading excerpt...</div>}>
					<ExcerptContent id={id} />
				</Suspense>
			</Card>
		</Container>
	);
}

async function ExcerptContent({ id }: { id: string }) {
  const { author, work, body } = await excerptById(id);

  return (
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
  );
}