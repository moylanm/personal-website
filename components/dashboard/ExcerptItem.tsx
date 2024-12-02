'use client'

import { DashboardFormButton, EditorAccordionSummary } from '@/styles';
import { APIStatus, type Excerpt } from '@/lib/constants/definitions';
import React, { useCallback, useMemo, useRef, useState, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import { selectStatusState } from '@/lib/dashboard/features/excerpts/types';
import { Accordion, AccordionActions, AccordionDetails, Box, Typography } from '@mui/material';
import { Highlight } from '@/components';
import { deleteExcerpt, updateExcerpt } from '@/lib/dashboard/features/excerpts/excerptSlice';
import { ExcerptFormFields } from './components/EditorFormFields';

const DeleteDialog = React.lazy(() => import('@/components/dashboard/DeleteDialog'));

interface ExcerptItemProps {
  excerpt: Excerpt;
  searchTerm: string;
  isLast: boolean;
}

export const ExcerptItem: React.FC<ExcerptItemProps> = React.memo(({ excerpt, searchTerm, isLast }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectStatusState);
  const [isUpdating, setIsUpdating] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const authorRef = useRef<HTMLInputElement>(null);
  const workRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const handleOpenDialog = useCallback(() => setOpenDialog(true), []);
  const handleCloseDialog = useCallback(() => setOpenDialog(false), []);

  const handleDelete = useCallback(() => {
    handleCloseDialog();
    void dispatch(deleteExcerpt(excerpt.id));
  }, [dispatch, excerpt.id, handleCloseDialog]);

  const handleUpdate = useCallback(async () => {
    setIsUpdating(true);
    try {
      await dispatch(updateExcerpt({
        id: excerpt.id,
        author: authorRef.current?.value ?? '',
        work: workRef.current?.value ?? '',
        body: bodyRef.current?.value ?? ''
      } as Excerpt));
    } finally {
      setIsUpdating(false);
    }
  }, [dispatch, excerpt.id]);

  const handleExpand = useCallback((_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  }, []);

  const fields = useMemo(() => [
    {
      id: `author-${excerpt.id}`,
      label: 'Author',
      defaultValue: excerpt.author,
      ref: authorRef,
      multiline: false,
      rows: 1
    },
    {
      id: `work-${excerpt.id}`,
      label: 'Work',
      defaultValue: excerpt.work,
      ref: workRef,
      multiline: false,
      rows: 1
    },
    {
      id: `body-${excerpt.id}`,
      label: 'Body',
      defaultValue: excerpt.body,
      ref: bodyRef,
      multiline: true,
      rows: 10
    }
  ], [excerpt]);

  return (
    <Box sx={{ mb: isLast ? 8 : 0 }}>
      <Accordion expanded={expanded} onChange={handleExpand} disabled={isUpdating}>
        <EditorAccordionSummary>
          <Typography>
            <Highlight
              text={`${excerpt.id}: ${excerpt.author} - ${excerpt.work}`}
              highlight={searchTerm}
            />
          </Typography>
        </EditorAccordionSummary>
        <AccordionDetails>
          <ExcerptFormFields fields={fields} isUpdating={isUpdating} />
        </AccordionDetails>
        <AccordionActions>
          <DashboardFormButton
            disabled={status === APIStatus.Pending || isUpdating}
            onClick={handleOpenDialog}
          >
            Delete
          </DashboardFormButton>
          <DashboardFormButton
            disabled={status === APIStatus.Pending || isUpdating}
            onClick={handleUpdate}
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </DashboardFormButton>
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
    </Box>
  );
});

ExcerptItem.displayName = 'ExcerptItem';
