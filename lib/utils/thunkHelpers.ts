import type { AppDispatch, RootState } from '@/lib/dashboard/store';
import { authenticatedFetch, type AuthenticatedFetchOptions } from '@/lib/utils/auth';
import type{ GetThunkAPI } from '@reduxjs/toolkit';

interface ThunkConfig {
  rejectValue: string;
  state: RootState;
  dispatch: AppDispatch;
}

type ThunkTools = GetThunkAPI<ThunkConfig>;

type FetchConfig = Omit<AuthenticatedFetchOptions, 'dispatch' | 'csrfToken'>;

class ThunkBuilder<TResult, TData = unknown> {
  private validateFn?: () => string | undefined;
  private transformFn?: (data: TData) => TResult;

  constructor(
    private tools: ThunkTools,
    private fetchConfig: FetchConfig,
  ) {}

  withValidation(fn: () => string | undefined) {
    this.validateFn = fn;
    return this;
  }

  withTransform(fn: (data: TData) => TResult) {
    this.transformFn = fn;
    return this;
  }

  async execute(): Promise<TResult | ReturnType<ThunkTools['rejectWithValue']>> {
    try {
      if (this.validateFn) {
        const validationError = this.validateFn();
        if (validationError) {
          return this.tools.rejectWithValue(validationError);
        }
      }

      const response = await authenticatedFetch({
        dispatch: this.tools.dispatch,
        csrfToken: this.tools.getState().csrf.token,
        ...this.fetchConfig,
      });

      if (!response.ok) {
        throw new Error(`Failed to ${this.fetchConfig.init?.method?.toLowerCase() ?? 'fetch'} excerpt`);
      }

      const data = await response.json() as TData;
      return this.transformFn ? this.transformFn(data) : data as unknown as TResult;
    } catch (error) {
      return this.tools.rejectWithValue(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  }
}

export function createThunk<TResult, TData = unknown>(
  tools: ThunkTools,
  fetchConfig: FetchConfig
) {
  return new ThunkBuilder<TResult, TData>(tools, fetchConfig);
}

export type { ThunkConfig };
