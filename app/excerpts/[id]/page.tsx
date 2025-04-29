import type { Metadata } from 'next';
import { Box, Container, Typography, Paper } from '@mui/material';
import { excerptById } from '@/lib/data';
import { notFound } from 'next/navigation';
import ExcerptBody from '@/components/excerpts/ExcerptBody';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = (await params).id;
  const excerpt = await excerptById(id);

  if (!excerpt) return { title: 'Excerpt Not Found' };

  return {
    title: `${excerpt.author} - ${excerpt.work}`,
    description: `Excerpt from ${excerpt.work} by ${excerpt.author}`,
    openGraph: {
      title: `${excerpt.author} - ${excerpt.work}`,
      description: `Excerpt from ${excerpt.work} by ${excerpt.author}`,
      type: 'article',
    },
  };
}

export default async function Page({ params }: PageProps) {
  const id = (await params).id;
  const excerpt = await excerptById(id);

  if (!excerpt) notFound();

  return (
    <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
        }}
      >
        <Box
          component='header' 
          sx={{ 
            mb: 4,
            textAlign: 'center',
            borderBottom: 1,
            borderColor: 'divider',
            pb: 2
          }}
        >
          <Typography 
            variant='h5' 
            component='h1' 
            gutterBottom
            sx={{ 
              fontWeight: 'bold'
            }}
          >
            {excerpt.author}
          </Typography>
          <Typography 
            variant='subtitle1' 
            component='h2'
            sx={{ 
              fontStyle: 'italic',
              color: 'text.secondary' 
            }}
          >
            {excerpt.work}
          </Typography>
        </Box>
        <ExcerptBody body={excerpt.body} />
      </Paper>
    </Container>
  );
}
