import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { memo } from 'react';
import { SortDirection } from '@/lib/excerpts/types';

interface SortControlsProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortControls = memo<SortControlsProps>(function SortControls({ 
  value, 
  onChange 
}) {
  return (
    <>
      <FormLabel component="legend">Sort by:</FormLabel>
      <RadioGroup
        sx={{ my: 1 }}
        aria-labelledby='sort-by'
        name='sort-by'
        value={value}
        onChange={onChange}
        row
      >
        <FormControlLabel value={SortDirection.Newest} control={<Radio />} label='Newest' />
        <FormControlLabel value={SortDirection.Oldest} control={<Radio />} label='Oldest' />
      </RadioGroup>
    </>
  );
});

export default SortControls;