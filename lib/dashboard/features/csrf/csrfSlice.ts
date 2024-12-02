import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isValidCsrfResponse } from '@/lib/csrf';
import type { RootState } from '@/lib/dashboard/store';

interface ThunkConfig {
  rejectValue: string;
  state: RootState;
}

interface CsrfState {
  token: string | null;
}

const SLICE_NAME = 'csrf';
const ERROR_MESSAGE = 'Failed to fetch CSRF token';

export const fetchCsrfToken = createAsyncThunk<string, undefined, ThunkConfig>(
  `${SLICE_NAME}/fetchToken`,
  async (_, { rejectWithValue, getState }) => {
    const { csrf: { token } } = getState();
    if (token) return token;

    try {
      const response = await fetch('/api/csrf');
      if (!response.ok) throw new Error(ERROR_MESSAGE);

      const data = await response.json() as unknown;
      if (!isValidCsrfResponse(data)) throw new Error('Invalid CSRF token response');

      return data.token;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : ERROR_MESSAGE);
    }
  }
);

export const csrfSlice = createSlice({
  name: SLICE_NAME,
  initialState: { token: null } as CsrfState,
  reducers: {
    setToken: (state, { payload }: { payload: string }) => {
      state.token = payload;
    },
    clearToken: (state) => {
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.fulfilled, (state, { payload }) => {
        state.token = payload;
      })
      .addCase(fetchCsrfToken.rejected, (state) => {
        state.token = null;
      });
  },
});

export const { setToken, clearToken } = csrfSlice.actions;
export default csrfSlice.reducer;
