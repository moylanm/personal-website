import { memo, type ReactNode } from 'react';
import { Box, Drawer } from '@mui/material';
import { DRAWER_WIDTH, DRAWER_STYLES } from './constants/styles';

interface NavigationProps {
  mobileOpen: boolean;
  onDrawerClose: () => void;
  isMobile: boolean;
  children: ReactNode;
}

const Navigation = memo<NavigationProps>(function Navigation({ 
  mobileOpen,
  onDrawerClose,
  isMobile,
  children
}) {
  return (
    <Box
      component='nav'
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
    >
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={onDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={DRAWER_STYLES}
        >
          {children}
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: DRAWER_WIDTH,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
});

export default Navigation;
