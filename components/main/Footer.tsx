'use client'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      sx={{
        py: 3,
        bottom: 0,
        width: '100%',
        position: 'fixed',
        backgroundColor: '#282828'
      }}
    >
      <Container>
        <Typography variant='body2' color='text.secondary' align='center'>
          {'Powered by '}
          <Link color='inherit' href='https://nextjs.org/'>
            Next.js
          </Link>{' in '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};