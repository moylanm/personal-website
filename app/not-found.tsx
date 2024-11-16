import { Metadata } from 'next';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { NotFoundBox } from './ui/style';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'Sorry, the page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <NotFoundBox>
      <Typography variant='h2' component='h1' gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant='h5' gutterBottom sx={{ mb: 4 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Link href='/' passHref style={{ textDecoration: 'none' }}>
        <Button variant='contained' color='primary'>
          Return Home
        </Button>
      </Link>
    </NotFoundBox>
  );
}
