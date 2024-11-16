import { memo } from 'react';
import { Box, FormControlLabel } from '@mui/material';
import { FilterFormCheckbox, WorksList } from '@/app/ui/style';
import { COMMON_FORM_STYLES } from '../constants/styles';

interface AuthorItemProps {
  author: string;
  works: string[];
  isSelected: boolean;
  selectedWorks: string[];
  onAuthorChange: (author: string, checked: boolean) => void;
  onWorkChange: (author: string, work: string, checked: boolean) => void;
}

const AuthorItem = memo<AuthorItemProps>(function AuthorItem({ 
  author, 
  works, 
  isSelected, 
  selectedWorks, 
  onAuthorChange, 
  onWorkChange 
}) {
  return (
    <Box>
      <FormControlLabel
        sx={COMMON_FORM_STYLES}
        control={
          <FilterFormCheckbox
            checked={isSelected}
            onChange={(e) => onAuthorChange(author, e.target.checked)}
          />
        }
        label={author}
      />
      {isSelected && (
        <WorksList>
          {works.map((work) => (
            <FormControlLabel
              key={work}
              control={
                <FilterFormCheckbox
                  checked={selectedWorks?.includes(work) || false}
                  onChange={(e) => onWorkChange(author, work, e.target.checked)}
                  size="small"
                />
              }
              label={work}
            />
          ))}
        </WorksList>
      )}
    </Box>
  );
});

export default AuthorItem;