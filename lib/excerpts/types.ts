import type { Excerpt } from '@/lib/definitions';

export enum SortDirection {
	Newest = 'NEWEST',
	Oldest = 'OLDEST',
}

export type AppState = {
  excerpts: Excerpt[];
  authors: string[];
  works: { [author: string]: string[] };
  sortDirection: SortDirection;
  selectedAuthor: string;
  selectedWork: string,
  randomExcerpt: Excerpt | null;
  resetKey: number;
};

export enum ActionType {
  SetSortOrder = 'SET_SORT_ORDER',
  SetSelectedAuthor = 'SET_SELECTED_AUTHOR',
  SetSelectedWork = 'SET_SELECTED_WORK',
  SetRandomExcerpt = 'SET_RANDOM_EXCERPT',
  Reset = 'RESET',
};

export type Action = 
  | { type: ActionType.SetSortOrder; payload: string }
  | { type: ActionType.SetSelectedAuthor; payload: string }
  | { type: ActionType.SetSelectedWork; payload: string }
  | { type: ActionType.SetRandomExcerpt; payload: Excerpt | null }
  | { type: ActionType.Reset; payload: number };