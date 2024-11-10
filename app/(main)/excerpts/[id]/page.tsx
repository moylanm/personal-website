import type { Metadata } from 'next';
import { excerptById } from '@/lib/data';
import { Card, CardContent, Container, Typography, Skeleton } from '@mui/material';
import Markdown from 'react-markdown';
import { Suspense } from 'react';

async function ExcerptBody({ id }: { id: string }) {
  const { body } = await excerptById(id);

  return (
    <Markdown>
      {body}
    </Markdown>
  );
}

function BodySkeleton() {
  return (
    <div style={{ marginTop: '1rem' }}>
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} width="80%" />
      <Skeleton height={20} width="90%" />
      <Skeleton height={20} width="75%" />
    </div>
  );
}

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
  const { author, work } = await excerptById(id);

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
