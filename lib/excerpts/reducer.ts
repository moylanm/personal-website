import {
  ActionType,
  SortDirection,
  type AppState,
  type Action
} from './types';

export const initialState: AppState = {
  excerpts: [],
  authors: [],
  works: {},
  sortDirection: SortDirection.Newest,
  selectedAuthors: [],
  selectedWorks: {},
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
    case ActionType.SetSelectedAuthors: {
      const { author, checked } = action.payload;
      const selectedAuthors = checked
        ? [...state.selectedAuthors, author]
        : state.selectedAuthors.filter(a => a !== author);
      return {
        ...state,
        selectedAuthors,
        selectedWorks: checked
          ? { ...state.selectedWorks }
          : { ...state.selectedWorks, [author]: [] },
        randomExcerpt: null
      };
    }
    case ActionType.SetSelectedWorks: {
      const { author, work, checked } = action.payload;
      const authorWorks = state.selectedWorks[author] ?? [];
      const newWorks = checked
        ? [...authorWorks, work]
        : authorWorks.filter(w => w !== work);
      return {
        ...state,
        selectedWorks: {
          ...state.selectedWorks,
          [author]: newWorks
        }
      };
    }
    case ActionType.SetRandomExcerpt:
      return {
        ...state,
        randomExcerpt: action.payload,
        selectedAuthors: [],
        selectedWorks: {},
        sortDirection: SortDirection.Newest,
      };
    case ActionType.Reset:
      return {
        ...state,
        resetKey: action.payload,
        sortDirection: SortDirection.Newest,
        selectedAuthors: [],
        selectedWorks: {},
        randomExcerpt: null
      };
    default:
      return state;
  }
}