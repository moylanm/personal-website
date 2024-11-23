'use client'

import {
  DashboardFormButton,
  MarkdownPreviewPaper,
  PublishFormTab,
  MAIN_COLOR
} from '@/styles';
import {
  createExcerpt,
  clearPublishForm,
  selectAllExcerpts,
  setAuthorField,
  setBodyField,
  setWorkField,
  resetState
} from '@/lib/dashboard/features/excerpts/excerptSlice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/lib/dashboard/store';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import { Autocomplete, Box, Tabs, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { APIStatus, type Excerpt } from '@/lib/constants/definitions';
import { MessageSnackbar } from '@/components';
import { fetchCsrfToken } from '@/lib/dashboard/features/csrf/csrfSlice';
import Markdown from 'react-markdown';

const selectFormState = createSelector(
  (state: RootState) => state.excerpts,
  (excerpts) => ({
    status: excerpts.status,
    statusMessage: excerpts.statusMessage,
    authorField: excerpts.authorField,
    workField: excerpts.workField,
    bodyField: excerpts.bodyField
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Page() {
  const dispatch = useAppDispatch();
  const excerpts = useAppSelector(selectAllExcerpts);
  const {
    status,
    statusMessage,
    authorField,
    workField,
    bodyField
  } = useAppSelector(selectFormState);
  const [tabValue, setTabValue] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchCsrfToken());
  }, [dispatch]);

  const handleSnackbarClose = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

  const handleAuthorFieldChange = useCallback((_: React.SyntheticEvent, value: string) => {
    dispatch(setAuthorField(value));
  }, [dispatch]);

  const handleWorkFieldChange = useCallback((_: React.SyntheticEvent, value: string) => {
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

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  useEffect(() => {
    if (status === APIStatus.Fulfilled) {
      clearForm();
    }
  }, [status, clearForm])

  const { authors, worksByAuthor } = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(excerpts.map(excerpt => excerpt.author))).sort();
    const workMap = excerpts.reduce<{ [author: string]: string[] }>((acc, excerpt) => {
      if (!acc[excerpt.author]) {
        acc[excerpt.author] = [];
      }
      if (!acc[excerpt.author].includes(excerpt.work)) {
        acc[excerpt.author].push(excerpt.work);
      }
      return acc;
    }, {});
    return { authors: uniqueAuthors, worksByAuthor: workMap };
  }, [excerpts]);

  const sortedWorksOptions = useMemo(() => 
    authors.flatMap(author => 
      worksByAuthor[author].map(work => ({ author, work }))
    ).sort((a, b) => a.author.localeCompare(b.author) || a.work.localeCompare(b.work)),
  [authors, worksByAuthor]);

  const filteredWorkOptions = useMemo(() => {
    if (!authorField) {
      return sortedWorksOptions;
    }
    return worksByAuthor[authorField]?.map(work => ({ author: authorField, work })) || [];
  }, [authorField, worksByAuthor, sortedWorksOptions]);

  const isSubmitDisabled = status === APIStatus.Pending;

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
          onInputChange={handleWorkFieldChange}
          options={filteredWorkOptions}
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
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            aria-label='markdown editor tabs'
            TabIndicatorProps={{
              sx: { backgroundColor: MAIN_COLOR }
            }}
            sx={{
              '& .Mui-selected': {
                color: `${MAIN_COLOR} !important`,
              },
            }}
          >
            <PublishFormTab label='Edit' />
            <PublishFormTab label='Preview' />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <TextField
            fullWidth
            id='body'
            label='Body'
            margin='normal'
            onChange={handleBodyFieldChange}
            value={bodyField}
            multiline
            rows={12}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <MarkdownPreviewPaper variant='outlined' >
            <Markdown>{bodyField || '*No content to preview*'}</Markdown>
          </MarkdownPreviewPaper>
        </TabPanel>

        <DashboardFormButton
          disabled={isSubmitDisabled}
          variant='contained'
          type='submit'>
            Publish
          </DashboardFormButton>
        <Box sx={{ width: '5px', display: 'inline-block' }} />
        <DashboardFormButton
          disabled={isSubmitDisabled}
          variant='contained'
          onClick={clearForm}>
            Clear
          </DashboardFormButton>
      </form>
    
      {(status === APIStatus.Fulfilled && statusMessage) &&
        <MessageSnackbar severity='success' response={statusMessage} handleClose={handleSnackbarClose} />}
      {(status === APIStatus.Rejected && statusMessage) &&
        <MessageSnackbar severity='error' response={statusMessage} handleClose={handleSnackbarClose} />}
    </>
  );
}