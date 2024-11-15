import { Box } from '@mui/material';
import { DRAWER_WIDTH, MAIN_APPBAR_HEIGHT } from './constants/styles';
import { memo, ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

const MainContent = memo<MainContentProps>(function MainContent({ children }) {
  return (
    <Box
      component='main'
      sx={{ 
        flexGrow: 1, 
        py: '18px',
        mb: 4,
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        mt: { xs: `${MAIN_APPBAR_HEIGHT.xs + 48}px`, md: 0 }
      }}
    >
      {children}
    </Box>
  );
});

export default MainContent;
