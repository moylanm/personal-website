'use client'

import React, { useRef, useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { DashboardFormButton, EditorAccordionSummary } from '@/app/ui/style';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import { Accordion, AccordionActions, AccordionDetails, Box, InputAdornment, LinearProgress, TextField, Typography } from '@mui/material';
import { APIStatus, type Excerpt } from '@/lib/definitions';
import {
  deleteExcerpt,
  updateExcerpt,
  resetState,
  selectAllExcerpts,
} from '@/lib/dashboard/features/excerpts/excerptSlice';
import MessageSnackbar from '@/app/ui/dashboard/MessageSnackbar';
import { SearchOutlined } from '@mui/icons-material';
import useInfiniteScroll, { CHUNK_SIZE } from '@/lib/useInfiniteScroll';

const DeleteDialog = React.lazy(() => import('@/app/ui/dashboard/DeleteDialog'));

export default function Page() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.excerpts.status);
  const error = useAppSelector(state => state.excerpts.error);
  const statusMessage = useAppSelector(state => state.excerpts.statusMessage);

  const excerpts = useAppSelector(selectAllExcerpts);
  const [displayCount, setDisplayCount] = useState(CHUNK_SIZE);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredExcerpts = useMemo(() => {
    if (!searchTerm) return excerpts;

    const searchLower = searchTerm.toLowerCase();
    return excerpts.filter(excerpt =>
      excerpt.id.toLowerCase().includes(searchLower) ||
      excerpt.author.toLowerCase().includes(searchLower) ||
      excerpt.work.toLowerCase().includes(searchLower)
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

      {filteredExcerpts.slice(0, displayCount).map((excerpt) => <Item key={excerpt.id} excerpt={excerpt} />)}
			{displayCount < filteredExcerpts.length && <LinearProgress ref={loadMoreRef} />}

      {(status === APIStatus.Fulfilled && statusMessage) &&
        <MessageSnackbar severity='success' response={statusMessage} handleClose={handleSnackbarClose} />}
      {(status === APIStatus.Rejected && error?.message) &&
        <MessageSnackbar severity='error' response={error.message} handleClose={handleSnackbarClose} />}
    </>
  );
}

const Item: React.FC<{ excerpt: Excerpt }> = ({ excerpt }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.excerpts.status);

  const [openDialog, setOpenDialog] = useState(false);

  const authorRef = useRef<HTMLInputElement>();
  const workRef = useRef<HTMLInputElement>();
  const bodyRef = useRef<HTMLInputElement>();

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

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

  return (
    <>
      <Accordion>
        <EditorAccordionSummary>
          <Typography>
            {`${excerpt.id}: ${excerpt.author} - ${excerpt.work}`}
          </Typography>
        </EditorAccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            id={`author-${excerpt.id}`}
            label='Author'
            margin='normal'
            defaultValue={excerpt.author}
            inputRef={authorRef}
          />
          <TextField
            fullWidth
            id={`work-${excerpt.id}`}
            label='Work'
            margin='normal'
            defaultValue={excerpt.work}
            inputRef={workRef}
          />
          <TextField
            fullWidth
            multiline
            rows={10}
            id={`body-${excerpt.id}`}
            label='Body'
            margin='normal'
            defaultValue={excerpt.body}
            inputRef={bodyRef}
          />
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