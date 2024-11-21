import { configureStore } from '@reduxjs/toolkit';
import excerptsReducer from './features/excerpts/excerptSlice';
import csrfReducer from './features/csrf/csrfSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      excerpts: excerptsReducer,
      csrf: csrfReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];