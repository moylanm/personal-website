'use client'

import React, { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { DashboardFormButton, EditorAccordionSummary } from '@/app/ui/style';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import { Accordion, AccordionActions, AccordionDetails, LinearProgress, TextField, Typography } from '@mui/material';
import { APIStatus, type Excerpt } from '@/lib/definitions';
import {
  deleteExcerpt,
  updateExcerpt,
  selectExcerptById,
  selectExcerptIds,
  resetState,
} from '@/lib/dashboard/features/excerpts/excerptSlice';
import MessageSnackbar from '@/app/ui/dashboard/MessageSnackbar';

const DeleteDialog = React.lazy(() => import('@/app/ui/dashboard/DeleteDialog'));

const CHUNK_SIZE = 15;

export default function Page() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.excerpts.status);
  const error = useAppSelector(state => state.excerpts.error);
  const statusMessage = useAppSelector(state => state.excerpts.statusMessage);

  const excerptIds = useAppSelector(selectExcerptIds);
  const [displayCount, setDisplayCount] = useState(CHUNK_SIZE);
  const loadMoreRef = useRef(null);

  const handleSnackbarClose = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDisplayCount(prevCount => Math.min(prevCount + CHUNK_SIZE, excerptIds.length));
      }
    }, {
      rootMargin: '500px'
    });

		let observerRefValue = null;

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
			observerRefValue = loadMoreRef.current;
		}

		return () => {
			if (observerRefValue) {
				observer.unobserve(observerRefValue);
			}
		}
  }, [excerptIds]);

  return (
    <>
      {excerptIds.slice(0, displayCount).map((excerptId) => <Item key={excerptId} excerptId={excerptId} />)}
			{displayCount < excerptIds.length && <LinearProgress ref={loadMoreRef} />}

      {(status === APIStatus.Fulfilled && statusMessage) &&
        <MessageSnackbar severity='success' response={statusMessage} handleClose={handleSnackbarClose} />}
      {(status === APIStatus.Rejected && error?.message) &&
        <MessageSnackbar severity='error' response={error.message} handleClose={handleSnackbarClose} />}
    </>
  );
}

const Item: React.FC<{ excerptId: string }> = ({ excerptId }) => {
  const dispatch = useAppDispatch();
  const excerpt = useAppSelector(state => selectExcerptById(state, excerptId));
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
    dispatch(deleteExcerpt(excerptId));
  }, [dispatch, excerptId, handleCloseDialog]);

  const handleUpdate = useCallback(() => {
    dispatch(updateExcerpt({
      id: excerptId,
      author: authorRef.current?.value ?? '',
      work: workRef.current?.value ?? '',
      body: bodyRef.current?.value ?? ''
    } as Excerpt));
  }, [dispatch, excerptId]);

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