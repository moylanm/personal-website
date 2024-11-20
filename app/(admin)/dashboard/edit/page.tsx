'use client'

import React, { useRef, useState, useCallback, Suspense, useMemo } from 'react';
import { DashboardFormButton, EditorAccordionSummary } from '@/styles';
import { useAppDispatch, useAppSelector } from '@/lib/dashboard/hooks';
import { APIStatus, type Excerpt } from '@/lib/constants/definitions';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/lib/dashboard/store';
import { MessageSnackbar } from '@/components';
import { SearchOutlined } from '@mui/icons-material';
import { Virtuoso } from 'react-virtuoso';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  Box,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
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

  return (
    <Box sx={{ mb: 5 }}>
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

      <Virtuoso
        style={{ height: 'calc(100vh - 200px)' }}
        data={filteredExcerpts}
        itemContent={(index, excerpt) => (
          <MemoizedItem
            key={excerpt.id}
            excerpt={excerpt}
            isLast={index === filteredExcerpts.length - 1}
          />
        )}
      />

      {(status === APIStatus.Fulfilled && statusMessage) &&
        <MessageSnackbar severity='success' response={statusMessage} handleClose={handleSnackbarClose} />}
      {(status === APIStatus.Rejected && statusMessage) &&
        <MessageSnackbar severity='error' response={statusMessage} handleClose={handleSnackbarClose} />}
    </Box>
  );
}

interface ItemProps {
  excerpt: Excerpt;
  isLast: boolean;
}

const baseTextFieldProps = {
  fullWidth: true,
  margin: 'normal' as const,
};

const Item: React.FC<ItemProps> = ({ excerpt, isLast }) => {
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
    dispatch(deleteExcerpt(excerpt.id));
  }, [dispatch, excerpt, handleCloseDialog]);

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

  const handleExpand = useCallback((event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  }, []);

  const fields = useMemo(() => [
    { id: 'author', label: 'Author', defaultValue: excerpt.author, ref: authorRef },
    { id: 'work', label: 'Work', defaultValue: excerpt.work, ref: workRef },
    { id: 'body', label: 'Body', defaultValue: excerpt.body, ref: bodyRef, multiline: true, rows: 10 }
  ], [excerpt]);

  return (
    <Box sx={{ mb: isLast ? 8 : 0 }}>
      <Accordion 
        expanded={expanded}
        onChange={handleExpand}
        disabled={isUpdating}
      >
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
              disabled={isUpdating}
            />
          ))}
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
}

const MemoizedItem = React.memo(Item);