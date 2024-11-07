import {
  createAsyncThunk,
	createEntityAdapter,
	createSlice,
	type SerializedError}
from '@reduxjs/toolkit';
import type { RootState } from '@/lib/dashboard/store';
import { APIStatus, type Excerpt } from '@/lib/definitions';

const excerptAdapter = createEntityAdapter({
	sortComparer: (a: Excerpt, b: Excerpt) => Number(b.id) - Number(a.id)
});

interface ExcerptState {
	status: APIStatus;
	statusMessage: string;
	error: SerializedError | null;
	authorField: string;
	workField: string;
	bodyField: string;
}

const initialState = excerptAdapter.getInitialState<ExcerptState>({
	status: APIStatus.Idle,
	statusMessage: '',
	error: null,
	authorField: '',
	workField: '',
	bodyField: '',
});

export const fetchAllExcerpts = createAsyncThunk(
	'excerpts/fetchAll',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('/api/excerpts');

			if (!response.ok) {
				throw new Error('Failed to fetch excerpts');
			}

			return response.json() as Promise<Excerpt[]>;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch excerpts');
		}
	}
);

export const createExcerpt = createAsyncThunk(
	'excerpts/create',
	async (excerpt: Omit<Excerpt, 'id'>, { rejectWithValue }) => {
		try {
			const response = await fetch('/api/excerpts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(excerpt)
			});

			if (response.status === 401) {
				return rejectWithValue('Unauthorized');
			}

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

export const updateExcerpt = createAsyncThunk(
	'excerpts/update',
	async (excerpt: Excerpt, { rejectWithValue }) => {
		try {
			const response = await fetch('/api/excerpts', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(excerpt)
			});

			if (response.status === 401) {
				return rejectWithValue('Unauthorized');
			}

			if (!response.ok) {
				throw new Error('Failed to update excerpt');
			}

			return excerpt;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to update excerpt');
		}
	}
);

export const deleteExcerpt = createAsyncThunk(
	'excerpts/delete',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await fetch(`/api/excerpts?id=${id}`, {
				method: 'DELETE'
			});

			if (response.status === 401) {
				return rejectWithValue('Unauthorized');
			}

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
			state.error = null;
		}
	},
	extraReducers(builder) {
		builder
			// Fetch all
			.addCase(fetchAllExcerpts.pending, (state) => {
				state.status = APIStatus.Pending;
			})
			.addCase(fetchAllExcerpts.rejected, (state, { error }) => {
				state.status = APIStatus.Rejected;
				state.error = error;
			})
			.addCase(fetchAllExcerpts.fulfilled, (state, { payload }) => {
				state.status = APIStatus.Fulfilled;
				excerptAdapter.setAll(state, payload);
			})
			
			// Create
			.addCase(createExcerpt.pending, (state) => {
				state.status = APIStatus.Pending;
			})
			.addCase(createExcerpt.rejected, (state, { error }) => {
				state.status = APIStatus.Rejected
				state.error = error;
			})
			.addCase(createExcerpt.fulfilled, (state, { payload }) => {
				state.status = APIStatus.Fulfilled
				state.statusMessage = 'Excerpt successfully created';
				excerptAdapter.addOne(state, payload);
			})

			// Update
			.addCase(updateExcerpt.pending, (state) => {
				state.status = APIStatus.Pending;
			})
			.addCase(updateExcerpt.rejected, (state, { error }) => {
				state.status = APIStatus.Rejected;
				state.error = error;
			})
			.addCase(updateExcerpt.fulfilled, (state, { payload }) => {
				state.status = APIStatus.Fulfilled;
				state.statusMessage = 'Excerpt successfully updated';
				excerptAdapter.setOne(state, payload);
			})

			// Delete
			.addCase(deleteExcerpt.pending, (state) => {
				state.status = APIStatus.Pending;
			})
			.addCase(deleteExcerpt.rejected, (state, { error }) => {
				state.status = APIStatus.Rejected;
				state.error = error;
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