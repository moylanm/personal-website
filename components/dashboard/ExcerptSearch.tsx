import { SearchOutlined } from '@mui/icons-material';
import { Box, CircularProgress, InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface ExcerptSearchProps {
  searchTerm: string;
  isSearching: boolean;
  onSearchChange: (value: string) => void;
}

export function ExcerptSearch({ searchTerm, isSearching, onSearchChange }: ExcerptSearchProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Search...'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                {isSearching ? (
                  <CircularProgress size={20} />
                ) : (
                  <SearchOutlined />
                )}
              </InputAdornment>
            )
          }
        }}
      />
    </Box>
  );
}
