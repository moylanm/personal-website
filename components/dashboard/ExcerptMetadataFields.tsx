import { Autocomplete, TextField, Typography } from '@mui/material';
import React from 'react';
import type { WorkOption } from '@/lib/dashboard/features/excerpts/excerptTypes';

interface ExcerptMetadataFieldsProps {
  authorField: string;
  workField: string;
  authors: string[];
  filteredWorkOptions: WorkOption[];
  onAuthorChange: (_: React.SyntheticEvent, value: string) => void;
  onWorkChange: (_: React.SyntheticEvent, value: string) => void;
}

export function ExcerptMetadataFields({
  authorField,
  workField,
  authors,
  filteredWorkOptions,
  onAuthorChange,
  onWorkChange
}: ExcerptMetadataFieldsProps) {
  return (
    <>
      <Autocomplete
        freeSolo
        inputValue={authorField}
        onInputChange={onAuthorChange}
        options={authors}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            <Typography>{option}</Typography>
          </li>
        )}
        renderInput={({
          id,
          disabled,
          fullWidth,
          size,
          InputLabelProps,
          InputProps,
          inputProps
        }) => (
          <TextField
            id={id}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size ?? 'medium'}
            slotProps={{
              inputLabel: InputLabelProps,
              input: InputProps,
              htmlInput: inputProps
            }}
            label='Author'
            margin='normal'
          />
        )}
      />
      <Autocomplete
        freeSolo
        inputValue={workField}
        onInputChange={onWorkChange}
        options={filteredWorkOptions}
        groupBy={(option) => option.author}
        getOptionLabel={(option) => typeof option === 'string' ? option : option.work}
        renderOption={(props, option) => (
          <li {...props} key={option.work}>
            <Typography>{option.work}</Typography>
          </li>
        )}
        renderInput={({
          id,
          disabled,
          fullWidth,
          size,
          InputLabelProps,
          InputProps,
          inputProps
        }) => (
          <TextField
            id={id}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size ?? 'medium'}
            slotProps={{
              inputLabel: InputLabelProps,
              input: InputProps,
              htmlInput: inputProps
            }}
            label='Work'
            margin='normal'
          />
        )}
      />
    </>
  );
}
