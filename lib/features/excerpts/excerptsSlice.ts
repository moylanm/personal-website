import type { SerializedError } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle',
	statusMessage: '',
	error: null as (SerializedError | null),
	authorField: '',
	workField: '',
	bodyField: ''
};

export const excerptsSlice = createSlice({
	name: 'excerpts',
	initialState,
	reducers: {
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
		},
		resetStatus(state) {
			state.status = 'idle';
			state.statusMessage = '';
			state.error = null;
		}
	},
});

export const {
	setAuthorField,
	setWorkField,
	setBodyField,
	resetPublishForm,
	resetStatus
} = excerptsSlice.actions;

export default excerptsSlice.reducer;
