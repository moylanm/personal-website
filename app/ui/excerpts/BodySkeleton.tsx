import { Box, Skeleton } from '@mui/material';

export default function BodySkeleton() {
  return (
    <Box sx={{ mt: 1 }}>
      <Skeleton width={740} height={20} />
      <Skeleton width={740} height={20} /> 
      <Skeleton width='80%' height={20} />
      <Skeleton width='90%' height={20} />
      <Skeleton width='75%' height={20} />
    </Box>
  );
}