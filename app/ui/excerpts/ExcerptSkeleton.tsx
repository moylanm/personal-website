'use client'

import { Box, Skeleton } from "@mui/material";
import { SkeletonContainer } from "../style";

export default function ExcerptSkeleton() {
  return (
    <>
      <SkeletonContainer>
        <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Skeleton animation='wave' width='60%' height={28} style={{ margin: '0 auto' }} />
          <Skeleton animation='wave' width="40%" height={28} style={{ margin: '0 auto' }} />
        </Box>
        <Skeleton animation='wave' height={20} />
        <Skeleton animation='wave' height={20} />
        <Skeleton animation='wave' height={20} width="80%" />
        <Skeleton animation='wave' height={20} width="90%" />
        <Skeleton animation='wave' height={20} width="75%" />
      </SkeletonContainer>
    </>
  );
}