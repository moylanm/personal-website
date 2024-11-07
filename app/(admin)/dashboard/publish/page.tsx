'use client'

import { DashboardFormButton } from '@/app/ui/style';
import {
  createExcerpt,
  clearPublishForm,
  selectAllExcerpts,
  setAuthorField,
  setBodyField,
  setWorkField,
  resetState
} from '@/lib/dashboard/features/excerpts/excerptSlice';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { APIStatus, type Excerpt } from '@/lib/definitions';
import MessageSnackbar from '@/app/ui/dashboard/MessageSnackbar';

interface WorksOption {
  author: string;
  work: string;
}

export default function Page() {
  const dispatch = useAppDispatch();
  const excerpts = useAppSelector(selectAllExcerpts);
  const status = useAppSelector(state => state.excerpts.status);
  const error = useAppSelector(state => state.excerpts.error);
  const statusMessage = useAppSelector(state => state.excerpts.statusMessage);

  const authorField = useAppSelector(state => state.excerpts.authorField);
  const workField = useAppSelector(state => state.excerpts.workField);
  const bodyField = useAppSelector(state => state.excerpts.bodyField);

  const handleSnackbarClose = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

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
    dispatch(clearPublishForm());
  }, [dispatch]);

  const submitForm = useCallback(() => {
    dispatch(createExcerpt({
        author: authorField,
        work: workField,
        body: bodyField
      } as Excerpt));
  }, [dispatch, authorField, workField, bodyField]);

  useEffect(() => {
    if (status === APIStatus.Fulfilled) {
      clearForm();
    }
  }, [status, clearForm])

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
              id='work'
              label='Work'
              margin='normal'
            />}
        />
        <TextField
          fullWidth
          id='body'
          label='Body'
          margin='normal'
          onChange={handleBodyFieldChange}
          value={bodyField}
          multiline
          rows={10}
        />
        <DashboardFormButton
          disabled={status === APIStatus.Pending}
          variant='contained'
          type='submit'>Publish</DashboardFormButton>
        <Box sx={{ boxSizing: 'border-box', width: '5px', height: 'auto', display: 'inline-block' }} />
        <DashboardFormButton
        disabled={status === APIStatus.Pending}
        variant='contained'
        onClick={clearForm}>Clear</DashboardFormButton>
      </form>
    
      {(status === APIStatus.Fulfilled && statusMessage) &&
        <MessageSnackbar
          key={statusMessage}
          severity='success' response={statusMessage} handleClose={handleSnackbarClose} />}
      {(status === APIStatus.Rejected && error?.message) &&
        <MessageSnackbar severity='error' response={error.message} handleClose={handleSnackbarClose} />}
    </>
  );
}