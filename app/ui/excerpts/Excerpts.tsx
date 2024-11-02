'use client'

import type { Excerpt } from '@/app/lib/definitions';
import { useCallback, useMemo, useReducer } from 'react';
import { initialState, reducer } from './lib/reducer';
import { ActionType, SortDirection, type AppState } from './lib/types';
import { FilterFormContainer, FilterFormControl } from '@/app/ui/style';
import List from './List';
import {
  type SelectChangeEvent,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Container
} from '@mui/material';

const createInitialState = (excerpts: Excerpt[]): AppState => {
  const authors = [...new Set(excerpts.map((excerpt) => excerpt.author))];
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

const Excerpts = ({
  excerpts
}: {
  excerpts: Excerpt[]
}) => {
  const [state, dispatch] = useReducer(reducer, excerpts, createInitialState);

  const handleSortChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SetSortOrder,
      payload: event.target.value
    });
  }, []);

  const handleAuthorChange = useCallback((event: SelectChangeEvent) => {
    
    dispatch({
      type: ActionType.SetSelectedAuthor,
      payload: event.target.value
    });
  }, []);

  const handleWorkChange = useCallback((event: SelectChangeEvent) => {
    dispatch({
      type: ActionType.SetSelectedWork,
      payload: event.target.value
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

    let filteredExcerpts = state.selectedAuthor
      ? state.excerpts.filter(excerpt => excerpt.author === state.selectedAuthor)
      : [...state.excerpts];

    if (state.selectedWork) {
      filteredExcerpts = filteredExcerpts.filter(excerpt => excerpt.work === state.selectedWork);
    }

    return state.sortDirection === SortDirection.Oldest ? filteredExcerpts.reverse() : filteredExcerpts;
  }, [state.excerpts, state.randomExcerpt, state.selectedAuthor, state.selectedWork, state.sortDirection]);

  return (
    <>
      <FilterFormContainer maxWidth='sm'>
        <FilterFormControl>
          <FormLabel id='sort-by'>Sort by:</FormLabel>
          <RadioGroup
            aria-labelledby='sort-by'
            name='sort-by'
            value={state.sortDirection}
            onChange={handleSortChange}
          >
            <FormControlLabel value={SortDirection.Newest} control={<Radio />} label='Newest' />
            <FormControlLabel value={SortDirection.Oldest} control={<Radio />} label='Oldest' />
          </RadioGroup>
        </FilterFormControl>
        <FilterFormControl>
          <InputLabel id='author'>Author</InputLabel>
          <Select
            sx={{ minWidth: '200px' }}
            labelId='author'
            id='author-select'
            value={state.selectedAuthor}
            label='Author'
            onChange={handleAuthorChange}
          >
            <MenuItem key='any' value=''>Any</MenuItem>
            {
              state.authors.map((author) => (
                <MenuItem key={author} value={author}>{author}</MenuItem>
              ))
            }
          </Select>
        </FilterFormControl>
        {
          state.selectedAuthor && (
            <FormControl>
              <InputLabel id='work'>Work</InputLabel>
              <Select
                sx={{ minWidth: '200px' }}
                labelId='work'
                id='work-select'
                value={state.selectedWork}
                label='Work'
                onChange={handleWorkChange}
              >
                <MenuItem key='any' value=''>Any</MenuItem>
                {
                  state.works[state.selectedAuthor].map((work) => (
                    <MenuItem key={work} value={work}>{work}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          )
        }
      </FilterFormContainer>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button type='button' onClick={handleRandomClick} aria-label='Select a random excerpt'>Random Excerpt</Button>
        <Button type='button' onClick={handleReset} aria-label='Reset filter'>Reset</Button>
      </Container>
      <List excerpts={sortedAndFilteredExcerpts} />
    </>
  );
};

export default Excerpts;
