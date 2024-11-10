import { Box, Skeleton } from '@mui/material';

export default function BodySkeleton() {
  return (
    <Box sx={{ mt: 1 }}>
      <Skeleton width={740} height={200} />
    </Box>
  );
}