import { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';

const useDebounceSearch = (delay: number = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  const debouncedCallback = useMemo(
    () => debounce((term: string) => {
      setDebouncedTerm(term);
    }, delay),
    [delay]
  );

  useEffect(() => {
    debouncedCallback(searchTerm);

    return () => {
      debouncedCallback.cancel();
    };
  }, [searchTerm, debouncedCallback]);

  return {
    searchTerm,
    debouncedTerm,
    setSearchTerm,
  };
};

export default useDebounceSearch;