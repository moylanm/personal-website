import { Metadata } from 'next';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { NotFoundBox, NotFoundButton } from '@/styles';

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
      <NotFoundButton
        component={Link}
        href='/'
        variant='outlined'
      >
        Return Home
      </NotFoundButton>
    </NotFoundBox>
  );
}
