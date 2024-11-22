import {
  createAsyncThunk,
	createEntityAdapter,
	createSlice
} from '@reduxjs/toolkit';
import { type RootState } from '@/lib/dashboard/store';
import { APIStatus, type Excerpt } from '@/lib/constants/definitions';
import { API_ENDPOINTS } from '@/lib/constants/api';
import { createThunk, type ThunkConfig } from '@/lib/utils/thunkHelpers';

export const createExcerpt = createAsyncThunk<
  Excerpt,
  Omit<Excerpt, 'id'>,
  ThunkConfig
>(
  'excerpts/create',
  (excerpt, thunkTools) => createThunk<Excerpt, string>(
    thunkTools,
    {
      input: API_ENDPOINTS.EXCERPTS,
      init: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(excerpt)
      }
    }
  )
    .withValidation(() => {
      if (!excerpt.author || !excerpt.work || !excerpt.body) {
        return 'Empty field detected';
      }
    })
    .withTransform((id) => ({
      ...excerpt,
      id,
    }))
    .execute()
);

export const updateExcerpt = createAsyncThunk<
  Excerpt,
  Excerpt,
  ThunkConfig
>(
  'excerpts/update',
  (excerpt, thunkTools) => createThunk<Excerpt>(
    thunkTools,
    {
      input: API_ENDPOINTS.EXCERPTS,
      init: {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(excerpt)
      }
    }
  )
    .withTransform(() => excerpt)
    .execute()
);

export const deleteExcerpt = createAsyncThunk<
  string,
  string,
  ThunkConfig
>(
  'excerpts/delete',
  (id, thunkTools) => createThunk<string>(
    thunkTools,
    {
      input: `${API_ENDPOINTS.EXCERPTS}?id=${id}`,
      init: { method: 'DELETE' }
    }
  )
    .withTransform(() => id)
    .execute()
);

export const fetchAllExcerpts = createAsyncThunk<
  Excerpt[],
  void,
  ThunkConfig
>(
  'excerpts/fetchAll',
  (_, thunkTools) => createThunk<Excerpt[]>(
    thunkTools,
    {
      input: API_ENDPOINTS.EXCERPTS,
      init: { method: 'GET' }
    }
  )
    .execute()
);

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