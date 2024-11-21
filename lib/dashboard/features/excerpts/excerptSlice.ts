import {
  createAsyncThunk,
	createEntityAdapter,
	createSlice
} from '@reduxjs/toolkit';
import { AppDispatch, type RootState } from '@/lib/dashboard/store';
import { APIStatus, type Excerpt } from '@/lib/constants/definitions';
import { clearToken, setToken } from '@/lib/dashboard/features/csrf/csrfSlice';

type ThunkConfig = {
	rejectValue: string;
	state: RootState;
	dispatch: AppDispatch;
};

const excerptAdapter = createEntityAdapter({
	sortComparer: (a: Excerpt, b: Excerpt) => Number(b.id) - Number(a.id)
});

interface ExcerptState {
	status: APIStatus;
	statusMessage: string;
	authorField: string;
	workField: string;
	bodyField: string;
}

const initialState = excerptAdapter.getInitialState<ExcerptState>({
	status: APIStatus.Idle,
	statusMessage: '',
	authorField: '',
	workField: '',
	bodyField: '',
});

async function authenticatedFetch(
  dispatch: AppDispatch,
  csrfToken: string | null,
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  if (!csrfToken) {
    try {
      const tokenResponse = await fetch('/api/csrf');
      if (!tokenResponse.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const { token } = await tokenResponse.json();
      dispatch(setToken(token));

      const headers = {
        ...init?.headers,
        'X-CSRF-Token': token,
      };

      return fetch(input, { ...init, headers });
    } catch (error) {
      console.error('CSRF token fetch failed:', error);
      throw error;
    }
  }

  const headers = {
    ...init?.headers,
    'X-CSRF-Token': csrfToken,
  };

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  if (response.status === 403) {
    dispatch(clearToken());
    throw new Error('CSRF validation failed');
  }

  return response;
}


export const fetchAllExcerpts = createAsyncThunk<
	Excerpt[],
	void,
	ThunkConfig
>(
	'excerpts/fetchAll',
	async (_, { rejectWithValue, getState, dispatch }) => {
		try {
			const response = await authenticatedFetch(
				dispatch,
				getState().csrf.token,
				'/api/excerpts',
				{ method: 'GET' }
			);

			if (!response.ok) {
				throw new Error('Failed to fetch excerpts');
			}

			return response.json() as Promise<Excerpt[]>;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch excerpts');
		}
	}
);

export const createExcerpt = createAsyncThunk<
	Excerpt,
	Omit<Excerpt, 'id'>,
	ThunkConfig
>(
	'excerpts/create',
	async (excerpt: Omit<Excerpt, 'id'>, { rejectWithValue, getState, dispatch }) => {
		try {
			if (!excerpt.author || !excerpt.work || !excerpt.body) {
				return rejectWithValue('Empty field detected');
			}

			const response = await authenticatedFetch(
				dispatch,
				getState().csrf.token,
				'api/excerpts',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(excerpt)
				}
			);

			if (!response.ok) {
				throw new Error('Failed to create excerpt');
			}

			const id = await response.json();

			return {
				...excerpt,
				id: id
			} as Excerpt;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to create excerpt');
		}
	}
);

export const updateExcerpt = createAsyncThunk<
	Excerpt,
	Excerpt,
	ThunkConfig
>(
	'excerpts/update',
	async (excerpt: Excerpt, { rejectWithValue, getState, dispatch }) => {
		try {
			const response = await authenticatedFetch(
				dispatch,
				getState().csrf.token,
				'/api/excerpts',
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(excerpt)
				}
			);

			if (!response.ok) {
				throw new Error('Failed to update excerpt');
			}

			return excerpt;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to update excerpt');
		}
	}
);

export const deleteExcerpt = createAsyncThunk<
	string,
	string,
	ThunkConfig
>(
	'excerpts/delete',
	async (id: string, { rejectWithValue, getState, dispatch }) => {
		try {
			const response = await authenticatedFetch(
				dispatch,
				getState().csrf.token,
				`/api/excerpts?id=${id}`,
				{
					method: 'DELETE'
				}
			);

			if (!response.ok) {
				throw new Error('Failed to delete excerpt');
			}
			
			return id; // Return id for removing from state
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete excerpt');
		}
	}
);

export const excerptSlice = createSlice({
	name: 'excerpts',
	initialState,
	reducers: {
		setAuthorField: (state, { payload }) => {
			state.authorField = payload;
		},
		setWorkField: (state, { payload }) => {
			state.workField = payload;
		},
		setBodyField: (state, { payload }) => {
			state.bodyField = payload;
		},
		clearPublishForm: (state) => {
			state.authorField = '';
			state.workField = '';
			state.bodyField = '';
		},
		resetState: (state) => {
			state.status = APIStatus.Idle;
			state.statusMessage = '';
		}
	},
	extraReducers(builder) {
		builder
			// Fetch all
			.addCase(fetchAllExcerpts.pending, (state) => {
				state.status = APIStatus.Pending;
				state.statusMessage = '';
			})
			.addCase(fetchAllExcerpts.rejected, (state, { payload }) => {
				state.status = APIStatus.Rejected;
				state.statusMessage = payload ?? 'Failed to fetch excerpts';
			})
			.addCase(fetchAllExcerpts.fulfilled, (state, { payload }) => {
				state.status = APIStatus.Fulfilled;
				excerptAdapter.setAll(state, payload);
			})
			
			// Create
			.addCase(createExcerpt.pending, (state) => {
				state.status = APIStatus.Pending;
				state.statusMessage = '';
			})
			.addCase(createExcerpt.rejected, (state, { payload }) => {
				state.status = APIStatus.Rejected;
				state.statusMessage = payload ?? 'Failed to create excerpt';
			})
			.addCase(createExcerpt.fulfilled, (state, { payload }) => {
				state.status = APIStatus.Fulfilled;
				state.statusMessage = 'Excerpt successfully created';
				excerptAdapter.addOne(state, payload);
			})

			// Update
			.addCase(updateExcerpt.pending, (state) => {
				state.status = APIStatus.Pending;
				state.statusMessage = '';
			})
			.addCase(updateExcerpt.rejected, (state, { payload }) => {
				state.status = APIStatus.Rejected;
				state.statusMessage = payload ?? 'Failed to update excerpt';
			})
			.addCase(updateExcerpt.fulfilled, (state, { payload }) => {
				state.status = APIStatus.Fulfilled;
				state.statusMessage = 'Excerpt successfully updated';
				excerptAdapter.setOne(state, payload);
			})

			// Delete
			.addCase(deleteExcerpt.pending, (state) => {
				state.status = APIStatus.Pending;
				state.statusMessage = '';
			})
			.addCase(deleteExcerpt.rejected, (state, { payload }) => {
				state.status = APIStatus.Rejected;
				state.statusMessage = payload ?? 'Failed to delete excerpt';
			})
			.addCase(deleteExcerpt.fulfilled, (state, { payload }) => {
				state.status = APIStatus.Fulfilled;
				state.statusMessage = 'Excerpt successfully deleted';
				excerptAdapter.removeOne(state, payload);
			})
	},
});

export const {
	setAuthorField,
	setWorkField,
	setBodyField,
	clearPublishForm,
	resetState,
} = excerptSlice.actions;

export const {
	selectAll: selectAllExcerpts,
	selectById: selectExcerptById,
	selectIds: selectExcerptIds
} = excerptAdapter.getSelectors<RootState>((state) => state.excerpts);

export default excerptSlice.reducer;