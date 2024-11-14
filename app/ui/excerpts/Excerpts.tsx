'use client'

import type { Excerpt } from '@/lib/definitions';
import { useCallback, useMemo, useReducer, useState } from 'react';
import { initialState, reducer } from '@/lib/excerpts/reducer';
import { ActionType, SortDirection, type AppState } from '@/lib/excerpts/types';
import { FilterFormPaper, ScrollableSection, WorksList } from '@/app/ui/style';
import List from './List';
import ScrollToTop from './ScrollToTop';
import { FilterListOutlined } from '@mui/icons-material';
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Container,
  Box
} from '@mui/material';

const createInitialState = (excerpts: Excerpt[]): AppState => {
  const authors = [...new Set(excerpts.map((excerpt) => excerpt.author))].sort();
  const works = excerpts.reduce<{ [author: string]: string[] }>((acc, excerpt) => {
    if (!acc[excerpt.author]) {
      acc[excerpt.author] = [];
    }

    if (!acc[excerpt.author].includes(excerpt.work)) {
      acc[excerpt.author].push(excerpt.work);
    }

    return acc;
  }, {});

  return {
    ...initialState,
    excerpts: excerpts,
    authors: authors,
    works: works,
  };
};

const DRAWER_WIDTH = 300;
const MAIN_APPBAR_HEIGHT = 64;

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

  const filterContent = (
    <Box sx={{ width: DRAWER_WIDTH }}>
      <FilterFormPaper elevation={2}>
        <Container sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button type='button' onClick={handleRandomClick} aria-label='Select a random excerpt'>Random Excerpt</Button>
          <Button type='button' onClick={handleReset} aria-label='Reset filter'>Reset</Button>
        </Container>
        <FormLabel id='sort-by'>Sort by:</FormLabel>
        <RadioGroup
          sx={{ display: 'flex', justifyContent: 'center', my: 1 }}
          aria-labelledby='sort-by'
          name='sort-by'
          value={state.sortDirection}
          onChange={handleSortChange}
          row
        >
          <FormControlLabel value={SortDirection.Newest} control={<Radio />} label='Newest' />
          <FormControlLabel value={SortDirection.Oldest} control={<Radio />} label='Oldest' />
        </RadioGroup>
        <FormLabel component='legend' sx={{ mb: 1 }}>Authors</FormLabel>
        <ScrollableSection>
          <FormControl component='fieldset' sx={{ width: '100%' }}>
            {state.authors.map((author) => (
              <Box key={author}>
                <FormControlLabel
                  sx={{
                    width: '100%',
                    margin: 0,
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                      wordBreak: 'break-word'
                    }
                  }}
                  control={
                    <Checkbox
                      checked={state.selectedAuthors.includes(author)}
                      onChange={(e) => handleAuthorChange(author, e.target.checked)}
                    />
                  }
                  label={author}
                />
                {state.selectedAuthors.includes(author) && (
                  <WorksList>
                    {state.works[author].map((work) => (
                      <FormControlLabel
                        key={work}
                        control={
                          <Checkbox
                            checked={state.selectedWorks[author]?.includes(work) || false}
                            onChange={(e) => handleWorkChange(author, work, e.target.checked)}
                            size='small'
                          />
                        }
                        label={work}
                      />
                    ))}
                  </WorksList>
                )}
              </Box>
            ))}
          </FormControl>
        </ScrollableSection>
      </FilterFormPaper>
    </Box>
  );

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
          <Toolbar variant='dense'> {/* Use dense Toolbar for smaller height */}
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
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              top: `${MAIN_APPBAR_HEIGHT + 48}px`, // Add height of filter AppBar (48px for dense Toolbar)
              height: `calc(100% - ${MAIN_APPBAR_HEIGHT + 48}px)`,
              '& .MuiPaper-root': {
                position: 'static',
                height: '100%',
                top: 0
              }
            },
          }}
        >
          {filterContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: DRAWER_WIDTH,
          }}
        >
          {filterContent}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component='main'
        sx={{ 
          flexGrow: 1, 
          p: 3,
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
