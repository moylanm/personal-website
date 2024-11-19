'use client'

import React, { useRef, useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { DashboardFormButton, EditorAccordionSummary } from '@/styles';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import { Accordion, AccordionActions, AccordionDetails, Box, InputAdornment, LinearProgress, TextField, Typography } from '@mui/material';
import { APIStatus, type Excerpt } from '@/lib/constants/definitions';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/lib/dashboard/store';
import { MessageSnackbar } from '@/components';
import { SearchOutlined } from '@mui/icons-material';
import useInfiniteScroll, { CHUNK_SIZE } from '@/lib/useInfiniteScroll';
import {
  deleteExcerpt,
  updateExcerpt,
  resetState,
  selectAllExcerpts,
} from '@/lib/dashboard/features/excerpts/excerptSlice';

const DeleteDialog = React.lazy(() => import('@/components/dashboard/DeleteDialog'));

const selectStatusState = createSelector(
  (state: RootState) => state.excerpts,
  (excerpts) => ({
    status: excerpts.status,
    statusMessage: excerpts.statusMessage
  })
);

export default function Page() {
  const dispatch = useAppDispatch();
  const { status, statusMessage } = useAppSelector(selectStatusState); 
  const excerpts = useAppSelector(selectAllExcerpts);
  const [displayCount, setDisplayCount] = useState(CHUNK_SIZE);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExcerpts = useMemo(() => {
    if (!searchTerm) return excerpts;

    const searchLower = searchTerm.toLowerCase();
    return excerpts.filter(excerpt => {
      const { id, author, work } = excerpt;
      const searchableText = `${id} ${author} ${work}`.toLowerCase();
      return searchableText.includes(searchLower);
    }
    );
  }, [excerpts, searchTerm]);

  const handleSnackbarClose = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

  const loadMoreRef = useInfiniteScroll(setDisplayCount, filteredExcerpts);

  useEffect(() => {
    setDisplayCount(CHUNK_SIZE);
  }, [searchTerm]);

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search...'
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchOutlined />
                </InputAdornment>
              )
            }
          }}
        />
      </Box>

      {filteredExcerpts.slice(0, displayCount).map((excerpt) => <MemoizedItem key={excerpt.id} excerpt={excerpt} />)}
			{displayCount < filteredExcerpts.length && <LinearProgress ref={loadMoreRef} />}

      {(status === APIStatus.Fulfilled && statusMessage) &&
        <MessageSnackbar severity='success' response={statusMessage} handleClose={handleSnackbarClose} />}
      {(status === APIStatus.Rejected && statusMessage) &&
        <MessageSnackbar severity='error' response={statusMessage} handleClose={handleSnackbarClose} />}
    </>
  );
}

const baseTextFieldProps = {
  fullWidth: true,
  margin: 'normal' as const,
};

const Item: React.FC<{ excerpt: Excerpt }> = ({ excerpt }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectStatusState);
  const [openDialog, setOpenDialog] = useState(false);

  const authorRef = useRef<HTMLInputElement>(null);
  const workRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const handleOpenDialog = useCallback(() => setOpenDialog(true), []);
  const handleCloseDialog = useCallback(() => setOpenDialog(false), []);

  const handleDelete = useCallback(() => {
    handleCloseDialog();
    dispatch(deleteExcerpt(excerpt.id));
  }, [dispatch, excerpt, handleCloseDialog]);

  const handleUpdate = useCallback(() => {
    dispatch(updateExcerpt({
      id: excerpt.id,
      author: authorRef.current?.value ?? '',
      work: workRef.current?.value ?? '',
      body: bodyRef.current?.value ?? ''
    } as Excerpt));
  }, [dispatch, excerpt]);

  const fields = useMemo(() => [
    { id: 'author', label: 'Author', defaultValue: excerpt.author, ref: authorRef },
    { id: 'work', label: 'Work', defaultValue: excerpt.work, ref: workRef },
    { id: 'body', label: 'Body', defaultValue: excerpt.body, ref: bodyRef, multiline: true, rows: 10 }
  ], [excerpt]);

  return (
    <>
      <Accordion>
        <EditorAccordionSummary>
          <Typography>
            {`${excerpt.id}: ${excerpt.author} - ${excerpt.work}`}
          </Typography>
        </EditorAccordionSummary>
        <AccordionDetails>
          {fields.map(field => (
            <TextField
              key={field.id}
              {...baseTextFieldProps}
              id={`${field.id}-${excerpt.id}`}
              label={field.label}
              defaultValue={field.defaultValue}
              inputRef={field.ref}
              multiline={field.multiline}
              rows={field.rows}
            />
          ))}
        </AccordionDetails>
        <AccordionActions>
          <DashboardFormButton
            disabled={status === APIStatus.Pending}
            onClick={handleOpenDialog}>Delete</DashboardFormButton>
          <DashboardFormButton
            disabled={status === APIStatus.Pending}
            onClick={handleUpdate}>Update</DashboardFormButton>
        </AccordionActions>
      </Accordion>
      <Suspense>
        <DeleteDialog
          excerpt={excerpt}
          open={openDialog}
          handleClose={handleCloseDialog}
          handleConfirm={handleDelete}
        />
      </Suspense>
    </>
  );
}

const MemoizedItem = React.memo(Item);