// app/excerpts/[id]/not-found.tsx
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Excerpt Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The excerpt you&apos;re looking for doesn&apos;t exist or has been removed.
        </Typography>
        <Button
          sx={{ mt: 1 }}
          component={Link} 
          href="/excerpts" 
          variant="contained" 
          color="primary"
        >
          Back to Excerpts
        </Button>
      </Box>
    </Container>
  );
}
