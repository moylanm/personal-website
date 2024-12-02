'use client'

import { DashboardFormButton } from '@/styles';
import {
  createExcerpt,
  clearPublishForm,
  selectAllExcerpts,
  setAuthorField,
  setWorkField,
  setBodyField,
  resetState
} from '@/lib/dashboard/features/excerpts/excerptSlice';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { APIStatus, type Excerpt } from '@/lib/constants/definitions';
import { MessageSnackbar } from '@/components';
import { fetchCsrfToken } from '@/lib/dashboard/features/csrf/csrfSlice';
import { selectFormState, type WorksByAuthor } from '@/lib/dashboard/features/excerpts/types';
import { ExcerptMetadataFields } from '@/components/dashboard/ExcerptMetadataFields';
import { MarkdownEditor } from '@/components/dashboard/MarkdownEditor';

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
    void dispatch(fetchCsrfToken());
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
    void dispatch(createExcerpt({
      author: authorField,
      work: workField,
      body: bodyField
    } as Excerpt));
  }, [dispatch, authorField, workField, bodyField]);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  useEffect(() => {
    if (status === APIStatus.Fulfilled && statusMessage === 'Excerpt successfully created') {
      clearForm();
    }
  }, [status, statusMessage, clearForm]);

  const { authors, worksByAuthor } = useMemo(() => {
    const uniqueAuthors = Array.from(
      new Set(excerpts.map(excerpt => excerpt.author))
    ).sort();

    const workMap = excerpts.reduce<WorksByAuthor>((acc, excerpt) => {
      const works = acc[excerpt.author] ?? [];
      if (!works.includes(excerpt.work)) {
        acc[excerpt.author] = [...works, excerpt.work];
      }
      return acc;
    }, {});

    return {
      authors: uniqueAuthors,
      worksByAuthor: workMap
    } as const;
  }, [excerpts]);

  const sortedWorksOptions = useMemo(() => 
    authors.flatMap((author) => {
      const works = worksByAuthor[author] ?? [];
      return works.map((work) => ({ 
        author, 
        work 
      }));
    }).sort((a, b) => 
      a.author.localeCompare(b.author) || a.work.localeCompare(b.work)
    ),
  [authors, worksByAuthor]);

  const filteredWorkOptions = useMemo(() => {
    if (!authorField) {
      return sortedWorksOptions;
    }
    return worksByAuthor[authorField]?.map(work => ({ 
      author: authorField, 
      work 
    })) ?? [];
  }, [authorField, worksByAuthor, sortedWorksOptions]);

  const isSubmitDisabled = status === APIStatus.Pending;

  return (
    <>
      <form action={submitForm}>
        <ExcerptMetadataFields
          authorField={authorField}
          workField={workField}
          authors={authors}
          filteredWorkOptions={filteredWorkOptions}
          onAuthorChange={handleAuthorFieldChange}
          onWorkChange={handleWorkFieldChange}
        />

        <MarkdownEditor
          bodyField={bodyField}
          tabValue={tabValue}
          onBodyChange={handleBodyFieldChange}
          onTabChange={handleTabChange}
        />

        <Box sx={{ mt: 2 }}>
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
        </Box>
      </form>

      {(status === APIStatus.Fulfilled && statusMessage) && (
        <MessageSnackbar 
          severity='success' 
          response={statusMessage} 
          handleClose={handleSnackbarClose} 
        />
      )}
      {(status === APIStatus.Rejected && statusMessage) && (
        <MessageSnackbar 
          severity='error' 
          response={statusMessage} 
          handleClose={handleSnackbarClose} 
        />
      )}
    </>
  );
}
