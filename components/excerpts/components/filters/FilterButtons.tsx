import { FilterFormButton } from '@/styles';
import { Box } from '@mui/material';
import { memo } from 'react';

interface FilterButtonsProps {
  onRandom: () => void;
  onReset: () => void;
}

export const FilterButtons = memo<FilterButtonsProps>(function FilterButtons({ 
  onRandom, 
  onReset 
}) {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1, 
      '& .MuiButton-root': { flex: 1 }
    }}>
      <FilterFormButton variant="outlined" size="small" onClick={onRandom}>
        Random
      </FilterFormButton>
      <FilterFormButton variant="outlined" size="small" onClick={onReset}>
        Reset
      </FilterFormButton>
    </Box>
  );
});

export default FilterButtons;