import { NotFoundBox, NotFoundButton } from '@/styles';
import { Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <NotFoundBox sx={{ mt: 1, gap: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Excerpt Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The excerpt you&apos;re looking for doesn&apos;t exist or has been removed.
        </Typography>
        <NotFoundButton
          sx={{ mt: 1 }}
          component={Link}
          href="/excerpts" 
          variant="outlined" 
        >
          Back to Excerpts
        </NotFoundButton>
      </NotFoundBox>
    </Container>
  );
}
