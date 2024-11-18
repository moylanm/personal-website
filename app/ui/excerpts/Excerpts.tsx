'use client'

import type { Excerpt } from '@/lib/constants/definitions';
import useExcerptsFilter from './hooks/useExcerptsFilter';
import FilterContent from './components/filters/FilterContent';
import MobileAppBar from './components/MobileAppBar';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import List from './List';
import ScrollToTop from './ScrollToTop';
import {
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';

const Excerpts = ({ excerpts }: { excerpts: Excerpt[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { state, mobileOpen, handlers, sortedAndFilteredExcerpts } = useExcerptsFilter(excerpts);

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && <MobileAppBar onDrawerToggle={handlers.handleDrawerToggle} />}

      <Navigation
        mobileOpen={mobileOpen}
        onDrawerClose={handlers.handleDrawerToggle}
        isMobile={isMobile}
      >
        <FilterContent
          variant={isMobile ? 'mobile' : 'desktop'}
          state={state}
          handlers={handlers}
        />
      </Navigation>

      <MainContent>
        <List key={state.resetKey} excerpts={sortedAndFilteredExcerpts} />
      </MainContent>

      <ScrollToTop />
    </Box>
  );
};

export default Excerpts;