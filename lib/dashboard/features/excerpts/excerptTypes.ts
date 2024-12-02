import type { RootState } from '@/lib/dashboard/store';
import { createSelector } from '@reduxjs/toolkit';

export type WorksByAuthor = Record<string, string[]>;

export interface WorkOption {
  readonly author: string;
  readonly work: string;
}

export const selectFormState = createSelector(
  (state: RootState) => state.excerpts,
  (excerpts) => ({
    status: excerpts.status,
    statusMessage: excerpts.statusMessage,
    authorField: excerpts.authorField,
    workField: excerpts.workField,
    bodyField: excerpts.bodyField
  })
);
