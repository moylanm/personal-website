import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { FilterListOutlined } from '@mui/icons-material';
import { MAIN_APPBAR_HEIGHT } from './constants/styles';
import { memo } from 'react';

interface MobileAppBarProps {
  onDrawerToggle: () => void;
}

const MobileAppBar = memo<MobileAppBarProps>(function MobileAppBar({ onDrawerToggle }) {
  return (
    <AppBar 
      position='fixed' 
      sx={{ 
        display: { md: 'none' },
        backgroundColor: 'background.paper',
        color: 'text.primary',
        top: MAIN_APPBAR_HEIGHT,
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar variant='dense'>
        <IconButton
          color='inherit'
          aria-label='open filters'
          edge='start'
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <FilterListOutlined />
        </IconButton>
        <Typography variant='subtitle1' noWrap component='div'>
          Filters
        </Typography>
      </Toolbar>
    </AppBar>
  );
});

export default MobileAppBar;
