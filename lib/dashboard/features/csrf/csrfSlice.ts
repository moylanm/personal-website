import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/dashboard/store';

type ThunkConfig = {
  rejectValue: string;
  state: RootState;
};

interface CsrfState {
  token: string | null;
}

const initialState: CsrfState = {
  token: null,
};

export const fetchCsrfToken = createAsyncThunk<
  string,
  undefined,
  ThunkConfig
>('csrf/fetchToken', 
  async (_, { rejectWithValue, getState }) => {
    const currentState = getState();
    if (currentState.csrf.token) {
      return currentState.csrf.token;
    }

    try {
      const response = await fetch('/api/csrf');
      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }
      const data = await response.json();
      return data.token;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch CSRF token'
      );
    }
  }
);

export const csrfSlice = createSlice({
  name: 'csrf',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(fetchCsrfToken.rejected, (state) => {
        state.token = null;
      });
  },
});

export const { setToken, clearToken } = csrfSlice.actions;
export default csrfSlice.reducer;
