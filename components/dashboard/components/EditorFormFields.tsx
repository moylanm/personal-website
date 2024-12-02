import { TextField } from '@mui/material';
import React from 'react';
import type { ExcerptFieldConfig } from '@/lib/dashboard/features/excerpts/types';

interface ExcerptFormFieldsProps {
  fields: ExcerptFieldConfig[];
  isUpdating: boolean;
}

const baseTextFieldProps = {
  fullWidth: true,
  margin: 'normal' as const,
};

export function ExcerptFormFields({ fields, isUpdating }: ExcerptFormFieldsProps) {
  return (
    <>
      {fields.map(field => (
        <TextField
          key={field.id}
          {...baseTextFieldProps}
          id={field.id}
          label={field.label}
          defaultValue={field.defaultValue}
          inputRef={field.ref}
          multiline={field.multiline}
          rows={field.rows}
          disabled={isUpdating}
        />
      ))}
    </>
  );
}
