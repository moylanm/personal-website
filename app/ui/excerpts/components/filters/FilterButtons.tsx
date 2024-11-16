import { Box, Button } from '@mui/material';
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
      <Button variant="outlined" size="small" onClick={onRandom}>
        Random
      </Button>
      <Button variant="outlined" size="small" onClick={onReset}>
        Reset
      </Button>
    </Box>
  );
});

export default FilterButtons;