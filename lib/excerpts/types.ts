import type { Excerpt } from '@/lib/constants/definitions';

export enum SortDirection {
	Newest = 'NEWEST',
	Oldest = 'OLDEST',
}

interface SelectedAuthor {
  author: string;
  checked: boolean;
}

interface SelectedWork {
  author: string;
  work: string;
  checked: boolean;
}

export interface AppState {
  excerpts: Excerpt[];
  authors: string[];
  works: Record<string, string[]>;
  sortDirection: SortDirection;
  selectedAuthors: string[];
  selectedWorks: Record<string, string[]>;
  randomExcerpt: Excerpt | null;
  resetKey: number;
}

export enum ActionType {
  SetSortOrder = 'SET_SORT_ORDER',
  SetSelectedAuthors = 'SET_SELECTED_AUTHORS',
  SetSelectedWorks = 'SET_SELECTED_WORKS',
  SetRandomExcerpt = 'SET_RANDOM_EXCERPT',
  Reset = 'RESET',
}

export type Action = 
  | { type: ActionType.SetSortOrder; payload: string }
  | { type: ActionType.SetSelectedAuthors; payload: SelectedAuthor }
  | { type: ActionType.SetSelectedWorks; payload: SelectedWork }
  | { type: ActionType.SetRandomExcerpt; payload: Excerpt | null }
  | { type: ActionType.Reset; payload: number };