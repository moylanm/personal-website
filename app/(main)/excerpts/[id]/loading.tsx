import { Container, Skeleton, Paper, Box } from '@mui/material';

export default function Loading() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Skeleton variant="text" width="50%" sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="text" width="30%" sx={{ mx: 'auto' }} />
        </Box>
        <Box>
          {[...Array(4)].map((_, i) => (
            <Skeleton 
              key={i} 
              variant="text" 
              height={24} 
              sx={{ mb: 1.5 }} 
            />
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
