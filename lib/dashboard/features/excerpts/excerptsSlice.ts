import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/dashboard/store';
import type { Excerpt } from '@/app/lib/definitions';

interface Entities {
	[id: string]: Excerpt
}

const excerptsAdapter = createEntityAdapter({
	sortComparer: (a: Excerpt, b: Excerpt) => Number(a.id) - Number(b.id)
});

const initialState = excerptsAdapter.getInitialState({
	authorField: '',
	workField: '',
	bodyField: ''
});

export const excerptsSlice = createSlice({
	name: 'excerpts',
	initialState,
	reducers: {
		initializeState(state, { payload }) {
			state.ids = payload.map((excerpt: Excerpt) => excerpt.id);
			state.entities = payload.reduce((acc: Entities, excerpt: Excerpt) => Object.assign(acc, {[excerpt.id]: excerpt}), {})
		},
		setAuthorField(state, { payload }) {
			state.authorField = payload;
		},
		setWorkField(state, { payload }) {
			state.workField = payload;
		},
		setBodyField(state, { payload }) {
			state.bodyField = payload;
		},
		resetPublishForm(state) {
			state.authorField = '';
			state.workField = '';
			state.bodyField = '';
		}
	}
});

export const {
	initializeState,
	setAuthorField,
	setWorkField,
	setBodyField,
	resetPublishForm
} = excerptsSlice.actions;

export const {
	selectAll: selectAllExcerpts,
	selectById: selectExcerptById,
	selectIds: selectExcerptIds
} = excerptsAdapter.getSelectors((state: RootState) => state.excerpts);

export default excerptsSlice.reducer;
