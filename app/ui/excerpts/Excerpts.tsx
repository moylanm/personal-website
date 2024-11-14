'use client'

import type { Excerpt } from '@/lib/definitions';
import React, { useCallback, useMemo, useReducer, useState } from 'react';
import { initialState, reducer } from '@/lib/excerpts/reducer';
import { ActionType, SortDirection, type AppState } from '@/lib/excerpts/types';
import { FilterFormPaper, ScrollableSection } from '@/app/ui/style';
import { FilterListOutlined } from '@mui/icons-material';
import { DRAWER_WIDTH, MAIN_APPBAR_HEIGHT, DRAWER_STYLES } from './components/constants/styles';
import SortControls from './components/SortControls';
import FilterButtons from './components/FilterButtons';
import AuthorItem from './components/AuthorItem';
import List from './List';
import ScrollToTop from './ScrollToTop';
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  FormControl,
  FormLabel,
  Box
} from '@mui/material';

const createInitialState = (excerpts: Excerpt[]): AppState => {
  const authorsSet = new Set<string>();
  const works: { [author: string]: Set<string> } = {};

  for (const excerpt of excerpts) {
    authorsSet.add(excerpt.author);
    if (!works[excerpt.author]) {
      works[excerpt.author] = new Set<string>();
    }
    works[excerpt.author].add(excerpt.work);
  }

  return {
    ...initialState,
    excerpts,
    authors: Array.from(authorsSet).sort(),
    works: Object.fromEntries(
      Object.entries(works).map(([author, worksSet]) => [
        author,
        Array.from(worksSet)
      ])
    )
  };
};

const Excerpts = ({
  excerpts
}: {
  excerpts: Excerpt[]
}) => {
  const [state, dispatch] = useReducer(reducer, excerpts, createInitialState);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSortChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SetSortOrder,
      payload: event.target.value
    });
  }, []);

  const handleAuthorChange = useCallback((author: string, checked: boolean) => {
    dispatch({
      type: ActionType.SetSelectedAuthors,
      payload: {
        author,
        checked
      }
    });
  }, []);

  const handleWorkChange = useCallback((author: string, work: string, checked: boolean) => {
    dispatch({
      type: ActionType.SetSelectedWorks,
      payload: {
        author,
        work,
        checked
      }
    });
  }, []);

  const handleRandomClick = useCallback(() => {
    if (state.excerpts.length === 0) return;

    const randomIndex = Math.floor(Math.random() * state.excerpts.length);

    dispatch({
      type: ActionType.SetRandomExcerpt,
      payload: state.excerpts[randomIndex]
    });
  }, [state.excerpts]);

  const handleReset = useCallback(() => {
    dispatch({
      type: ActionType.Reset,
      payload: state.resetKey + 1
    });
  }, [state.resetKey]);

  const sortedAndFilteredExcerpts = useMemo(() => {
    if (state.randomExcerpt) return [state.randomExcerpt];

    let filteredExcerpts = state.selectedAuthors.length > 0
      ? state.excerpts.filter(excerpt => state.selectedAuthors.includes(excerpt.author))
      : [...state.excerpts];

    // Filter by selected works for each author
    if (Object.keys(state.selectedWorks).length > 0) {
      filteredExcerpts = filteredExcerpts.filter(excerpt => {
        const authorWorks = state.selectedWorks[excerpt.author];
        return !authorWorks || authorWorks.length === 0 || authorWorks.includes(excerpt.work);
      });
    }

    return state.sortDirection === SortDirection.Oldest ? filteredExcerpts.reverse() : filteredExcerpts;
  }, [state.excerpts, state.randomExcerpt, state.selectedAuthors, state.selectedWorks, state.sortDirection]);

  const MobileFilterContent = useMemo(() => (
    <Box sx={{ 
      width: DRAWER_WIDTH,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <SortControls value={state.sortDirection} onChange={handleSortChange} />
        <FilterButtons onRandom={handleRandomClick} onReset={handleReset} />
      </Box>
      {/* Scrollable authors section */}
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        p: 2
      }}>
        <FormLabel component="legend" sx={{ mb: 1 }}>Authors</FormLabel>
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          {state.authors.map((author) => (
            <AuthorItem
              key={author}
              author={author}
              works={state.works[author]}
              isSelected={state.selectedAuthors.includes(author)}
              selectedWorks={state.selectedWorks[author]}
              onAuthorChange={handleAuthorChange}
              onWorkChange={handleWorkChange}
            />
          ))}
        </FormControl>
      </Box>
    </Box>
  ), [
    state.sortDirection,
    state.selectedAuthors,
    state.selectedWorks,
    state.authors,
    state.works,
    handleAuthorChange,
    handleWorkChange,
    handleSortChange,
    handleRandomClick,
    handleReset
  ]);

  const DesktopFilterContent = useMemo(() => (
    <FilterFormPaper elevation={2}>
      <SortControls value={state.sortDirection} onChange={handleSortChange} />
      <FilterButtons onRandom={handleRandomClick} onReset={handleReset} />
      <FormLabel component="legend" sx={{ my: 1 }}>Authors</FormLabel>
      <ScrollableSection>
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          {state.authors.map((author) => (
            <AuthorItem
              key={author}
              author={author}
              works={state.works[author]}
              isSelected={state.selectedAuthors.includes(author)}
              selectedWorks={state.selectedWorks[author]}
              onAuthorChange={handleAuthorChange}
              onWorkChange={handleWorkChange}
            />
          ))}
        </FormControl>
      </ScrollableSection>
    </FilterFormPaper>
  ), [
    state.sortDirection,
    state.selectedAuthors,
    state.selectedWorks,
    state.authors,
    state.works,
    handleAuthorChange,
    handleWorkChange,
    handleSortChange,
    handleRandomClick,
    handleReset
  ]);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Mobile Filter AppBar - positioned below main AppBar */}
      {isMobile && (
        <AppBar 
          position='fixed' 
          sx={{ 
            display: { md: 'none' },
            backgroundColor: 'background.paper',
            color: 'text.primary',
            top: MAIN_APPBAR_HEIGHT, // Position below main AppBar
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Toolbar variant='dense'>
            <IconButton
              color='inherit'
              aria-label='open filters'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <FilterListOutlined />
            </IconButton>
            <Typography variant='subtitle1' noWrap component='div'>
              Filters
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Navigation Drawer */}
      <Box
        component='nav'
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={DRAWER_STYLES}
        >
          {MobileFilterContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: DRAWER_WIDTH,
          }}
        >
          {DesktopFilterContent}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component='main'
        sx={{ 
          flexGrow: 1, 
          py: '18px',
          mb: 4,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: `${MAIN_APPBAR_HEIGHT + 48}px`, md: 0 } // Account for both AppBars on mobile
        }}
      >
        <List key={state.resetKey} excerpts={sortedAndFilteredExcerpts} />
      </Box>
      <ScrollToTop />
    </Box>
  );
};

export default Excerpts;
