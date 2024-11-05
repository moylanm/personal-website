'use client'

import React, { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { deleteExcerpt, updateExcerpt } from '@/app/lib/actions';
import { DashboardFormButton, EditorAccordionSummary } from '@/app/ui/style';
import { selectExcerptById, selectExcerptIds } from '@/lib/dashboard/features/excerpts/excerptsSlice';
import { useAppSelector } from '@/lib/dashboard/hooks';
import { Accordion, AccordionActions, AccordionDetails, LinearProgress, TextField, Typography } from '@mui/material';

const DeleteDialog = React.lazy(() => import('@/app/ui/dashboard/DeleteDialog'));

const CHUNK_SIZE = 15;

export default function Page() {
  const excerptIds = useAppSelector(selectExcerptIds);

  const [displayCount, setDisplayCount] = useState(CHUNK_SIZE);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDisplayCount(prevCount => Math.min(prevCount + CHUNK_SIZE, excerptIds.length));
      }
    }, {
      rootMargin: '250px'
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
    </>
  );
}

const Item: React.FC<{ excerptId: string }> = ({ excerptId }) => {
  const excerpt = useAppSelector((state) => selectExcerptById(state, excerptId));

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
    deleteExcerpt({ id: excerptId });
  }, [excerptId, handleCloseDialog]);

  const handleUpdate = useCallback(() => {
    updateExcerpt({
      id: excerptId,
      author: authorRef.current?.value ?? '',
      work: workRef.current?.value ?? '',
      body: bodyRef.current?.value ?? ''
    });
  }, [excerptId]);

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
          <DashboardFormButton onClick={handleOpenDialog}>Delete</DashboardFormButton>
          <DashboardFormButton onClick={handleUpdate}>Update</DashboardFormButton>
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
