import type { Excerpt } from '@/lib/constants/definitions';
import { ActionType, SortDirection, type AppState } from '@/lib/excerpts/types';
import { initialState, reducer } from '@/lib/excerpts/reducer';
import { useReducer, useState, useCallback, useMemo } from 'react';

const createInitialState = (excerpts: Excerpt[]): AppState => {
  const authorsSet = new Set<string>();
  const works: { [author: string]: Set<string> } = {};

  for (const excerpt of excerpts) {
    const { author, work } = excerpt;
    authorsSet.add(author);
    works[author] = works[author] || new Set<string>();
    works[author].add(work);
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

const useExcerptsFilter = (excerpts: Excerpt[]) => {
  const [state, dispatch] = useReducer(reducer, excerpts, createInitialState);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlers = {
    handleDrawerToggle: useCallback(() => {
      setMobileOpen(prev => !prev);
    }, []),

    handleSortChange: useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: ActionType.SetSortOrder,
        payload: event.target.value
      });
    }, []),

    handleAuthorChange: useCallback((author: string, checked: boolean) => {
      dispatch({
        type: ActionType.SetSelectedAuthors,
        payload: { author, checked }
      });
    }, []),

    handleWorkChange: useCallback((author: string, work: string, checked: boolean) => {
      dispatch({
        type: ActionType.SetSelectedWorks,
        payload: { author, work, checked }
      });
    }, []),

    handleRandomClick: useCallback(() => {
      if (state.excerpts.length === 0) return;
      const randomIndex = Math.floor(Math.random() * state.excerpts.length);
      dispatch({
        type: ActionType.SetRandomExcerpt,
        payload: state.excerpts[randomIndex] ?? null
      });
    }, [state.excerpts]),

    handleReset: useCallback(() => {
      dispatch({
        type: ActionType.Reset,
        payload: state.resetKey + 1
      });
    }, [state.resetKey])
  };

  const sortedAndFilteredExcerpts = useMemo(() => {
    if (state.randomExcerpt) return [state.randomExcerpt];

    let filteredExcerpts = state.selectedAuthors.length > 0
      ? state.excerpts.filter(excerpt => state.selectedAuthors.includes(excerpt.author))
      : [...state.excerpts];

    if (Object.keys(state.selectedWorks).length > 0) {
      filteredExcerpts = filteredExcerpts.filter(excerpt => {
        const authorWorks = state.selectedWorks[excerpt.author];
        return !authorWorks || authorWorks.length === 0 || authorWorks.includes(excerpt.work);
      });
    }

    return state.sortDirection === SortDirection.Oldest ? filteredExcerpts.reverse() : filteredExcerpts;
  }, [state.excerpts, state.randomExcerpt, state.selectedAuthors, state.selectedWorks, state.sortDirection]);

  return {
    state,
    mobileOpen,
    handlers,
    sortedAndFilteredExcerpts
  };
};

export default useExcerptsFilter;