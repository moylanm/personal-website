'use client'

import { publishExcerpt } from '@/app/lib/data';
import { DashboardFormButton } from '@/app/ui/style';
import {
  resetPublishForm,
  selectAllExcerpts,
  setAuthorField,
  setBodyField,
  setWorkField
} from '@/lib/dashboard/features/excerpts/excerptsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { revalidateTag } from 'next/cache';
import { useCallback, useMemo } from 'react';

interface WorksOption {
  author: string;
  work: string;
}

export default function Page() {
  const dispatch = useAppDispatch();
  const excerpts = useAppSelector(selectAllExcerpts);
  const authorField = useAppSelector(state => state.excerpts.authorField);
  const workField = useAppSelector(state => state.excerpts.workField);
  const bodyField = useAppSelector(state => state.excerpts.bodyField);

  const handleAuthorFieldChange = useCallback((_: React.SyntheticEvent, value: string) => {
    dispatch(setAuthorField(value));
  }, [dispatch]);

  const handlWorkFieldChange = useCallback((_: React.SyntheticEvent, value: string) => {
    dispatch(setWorkField(value));
  }, [dispatch]);

  const handleBodyFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBodyField(event.target.value));
  }, [dispatch]);

  const clearForm = useCallback(() => {
    dispatch(resetPublishForm());
  }, [dispatch]);

  const submitForm = useCallback(async () => {
    await publishExcerpt({
      author: authorField,
      work: workField,
      body: bodyField
    });

    revalidateTag('latest');
    revalidateTag('excerpts');
  }, [authorField, workField, bodyField]);

  const authors = useMemo<string[]>(() => {
    return [...new Set(excerpts.map(excerpt => excerpt.author))];
  }, [excerpts]);

  const works = useMemo<{ [author: string]: string[] }>(() => {
    return excerpts.reduce<{ [author: string]: string[] }>((acc, excerpt) => {
      if (!acc[excerpt.author]) {
        acc[excerpt.author] = [];
      }

      if (!acc[excerpt.author].includes(excerpt.work)) {
        acc[excerpt.author].push(excerpt.work);
      }

      return acc;
    }, {});
  }, [excerpts]);

  const sortedWorksOptions = useMemo(() => {
    const worksOptions = authors.reduce<WorksOption[]>((acc, author) => {
      for (const work of works[author]) {
        acc.push({ author: author, work: work });
      }

      return acc;
    }, []);

    return worksOptions.sort((a, b) => -b.author.localeCompare(a.author));
  }, [authors, works]);

  return (
    <>
      <form action={submitForm}>
        <Autocomplete
          freeSolo
          inputValue={authorField}
          onInputChange={handleAuthorFieldChange}
          options={authors}
          renderOption={(props, option) => (
            <Typography {...props} key={option}>
              {option}
            </Typography>
          )}
          renderInput={(authors) =>
            <TextField
              {...authors}
              fullWidth
              required
              id='author'
              label='Author'
              margin='normal'
            />}
        />
        <Autocomplete
          freeSolo
          inputValue={workField}
          onInputChange={handlWorkFieldChange}
          options={sortedWorksOptions}
          groupBy={(option) => option.author}
          getOptionLabel={(option) => typeof option === 'string' ? option : option.work}
          renderOption={(props, option) => (
            <Typography {...props} key={option.work}>
              {option.work}
            </Typography>
          )}
          renderInput={(params) =>
            <TextField
              {...params}
              fullWidth
              required
              id='work'
              label='Work'
              margin='normal'
            />}
        />
        <TextField
          fullWidth
          required
          id='body'
          label='Body'
          margin='normal'
          onChange={handleBodyFieldChange}
          value={bodyField}
          multiline
          rows={10}
        />
        <DashboardFormButton variant='contained' type='submit'>Publish</DashboardFormButton>
        <Box sx={{ boxSizing: 'border-box', width: '5px', height: 'auto', display: 'inline-block' }} />
        <DashboardFormButton variant='contained' onClick={clearForm}>Clear</DashboardFormButton>
      </form>
    </>
  );
}
