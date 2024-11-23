import { Metadata } from 'next';
import { Box, Container, Typography, Paper } from '@mui/material';
import { excerptById } from '@/lib/data';
import Markdown from 'react-markdown';
import { notFound } from 'next/navigation';

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

export default async function ExcerptPage({ params }: PageProps) {
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
              fontWeight: 'bold',
              color: 'primary.main' 
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

        <Box 
          component='article'
          sx={{ 
            '& p': { 
              mb: 2,
              lineHeight: 1.7,
              fontSize: '1.1rem'
            },
            '& blockquote': {
              borderLeft: 4,
              borderColor: 'primary.main',
              pl: 2,
              ml: 0,
              fontStyle: 'italic'
            }
          }}
        >
          <Markdown>{excerpt.body}</Markdown>
        </Box>
      </Paper>
    </Container>
  );
}
