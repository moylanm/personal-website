'use client'

import { Box, Paper, Skeleton } from '@mui/material';
import { SkeletonContainer } from '@/styles';

export function ExcerptSkeleton() {
  return (
    <SkeletonContainer>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Skeleton animation='wave' width='60%' height={28} style={{ margin: '0 auto' }} />
          <Skeleton animation='wave' width='40%' height={28} style={{ margin: '0 auto' }} />
        </Box>
        <Skeleton animation='wave' height={20} />
        <Skeleton animation='wave' height={20} />
        <Skeleton animation='wave' height={20} width='80%' />
        <Skeleton animation='wave' height={20} width='90%' />
        <Skeleton animation='wave' height={20} width='75%' />
      </Paper>
    </SkeletonContainer>
  );
}