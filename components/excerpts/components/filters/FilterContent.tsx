import { AppState } from '@/lib/excerpts/types';
import { Box, FormControl, FormLabel } from '@mui/material';
import { memo } from 'react';
import AuthorItem from './AuthorItem';
import { DRAWER_WIDTH } from '../constants/styles';
import SortControls from './SortControls';
import FilterButtons from './FilterButtons';
import { FilterFormPaper, ScrollableSection } from '@/styles';

interface FilterContentProps {
  variant: 'mobile' | 'desktop';
  state: AppState;
  handlers: {
    handleSortChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAuthorChange: (author: string, checked: boolean) => void;
    handleWorkChange: (author: string, work: string, checked: boolean) => void;
    handleRandomClick: () => void;
    handleReset: () => void;
  };
}

const FilterContent = memo<FilterContentProps>(function FilterContent({
  variant,
  state,
  handlers
}) {
  const { handleSortChange, handleRandomClick, handleReset, handleAuthorChange, handleWorkChange } = handlers;

  const AuthorsList = (
    <FormControl component='fieldset' sx={{ width: '100%' }}>
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
  );

  if (variant === 'mobile') {
    return (
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
        <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', p: 2 }}>
          <FormLabel component='legend' sx={{ mb: 1 }}>Authors</FormLabel>
          {AuthorsList}
        </Box>
      </Box>
    );
  }

  return (
    <FilterFormPaper elevation={2}>
      <SortControls value={state.sortDirection} onChange={handleSortChange} />
      <FilterButtons onRandom={handleRandomClick} onReset={handleReset} />
      <FormLabel component='legend' sx={{ my: 1 }}>Authors</FormLabel>
      <ScrollableSection>
        {AuthorsList}
      </ScrollableSection>
    </FilterFormPaper>
  );
});

export default FilterContent;