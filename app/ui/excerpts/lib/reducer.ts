import type { AppState, Action } from './types';
import { ActionType, SortDirection } from './types';

export const initialState: AppState = {
  excerpts: [],
  authors: [],
  works: {},
  sortDirection: SortDirection.Newest,
  selectedAuthor: '',
  selectedWork: '',
  randomExcerpt: null,
  resetKey: 0,
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionType.SetSortOrder:
      return {
        ...state,
        sortDirection: action.payload as SortDirection,
        randomExcerpt: null
      };
    case ActionType.SetSelectedAuthor:
      return {
        ...state,
        selectedAuthor: action.payload,
        selectedWork: '',
        randomExcerpt: null
      };
    case ActionType.SetSelectedWork:
      return {
        ...state,
        selectedWork: action.payload
      };
    case ActionType.SetRandomExcerpt:
      return {
        ...state,
        randomExcerpt: action.payload,
        sortDirection: SortDirection.Newest,
        selectedAuthor: '',
        selectedWork: ''
      };
    case ActionType.Reset:
      return {
        ...state,
        resetKey: action.payload,
        sortDirection: SortDirection.Newest,
        selectedAuthor: '',
        selectedWork: '',
        randomExcerpt: null
      };
    default:
      return state;
  }
}
