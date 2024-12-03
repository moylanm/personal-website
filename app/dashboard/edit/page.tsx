'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import { APIStatus } from '@/lib/constants/definitions';
import { MessageSnackbar } from '@/components';
import { Virtuoso } from 'react-virtuoso';
import useDebounceSearch from '@/lib/hooks/useDebounceSearch';
import { 
  selectAllExcerpts, 
  resetState 
} from '@/lib/dashboard/features/excerpts/excerptSlice';
import { fetchCsrfToken } from '@/lib/dashboard/features/csrf/csrfSlice';
import { selectStatusState } from '@/lib/dashboard/features/excerpts/types';
import { ExcerptSearch } from '@/components/dashboard/ExcerptSearch';
import { ExcerptItem } from '@/components/dashboard/ExcerptItem';

export default function Page() {
  const dispatch = useAppDispatch();
  const { status, statusMessage } = useAppSelector(selectStatusState); 
  const excerpts = useAppSelector(selectAllExcerpts);
  const { searchTerm, debouncedTerm, setSearchTerm } = useDebounceSearch();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    void dispatch(fetchCsrfToken());
  }, [dispatch]);

  useEffect(() => {
    setIsSearching(searchTerm !== debouncedTerm);
  }, [searchTerm, debouncedTerm]);

  const filteredExcerpts = useMemo(() => {
    if (!debouncedTerm) return excerpts;

    const searchLower = debouncedTerm.toLowerCase();
    return excerpts.filter(excerpt => {
      const { id, author, work } = excerpt;
      const searchableText = `${id} ${author} ${work}`.toLowerCase();
      return searchableText.includes(searchLower);
    });
  }, [excerpts, debouncedTerm]);

  const handleSnackbarClose = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, [setSearchTerm]);

  return (
    <Box sx={{ mb: 5 }}>
      <ExcerptSearch
        searchTerm={searchTerm}
        isSearching={isSearching}
        onSearchChange={handleSearchChange}
      />

      <Virtuoso
        style={{ height: 'calc(100vh - 200px)' }}
        data={filteredExcerpts}
        itemContent={(index, excerpt) => (
          <ExcerptItem
            key={excerpt.id}
            excerpt={excerpt}
            searchTerm={debouncedTerm}
            isLast={index === filteredExcerpts.length - 1}
          />
        )}
      />

      {status === APIStatus.Fulfilled && statusMessage && (
        <MessageSnackbar 
          severity='success' 
          response={statusMessage} 
          handleClose={handleSnackbarClose} 
        />
      )}
      {status === APIStatus.Rejected && statusMessage && (
        <MessageSnackbar 
          severity='error' 
          response={statusMessage} 
          handleClose={handleSnackbarClose} 
        />
      )}
    </Box>
  );
}
