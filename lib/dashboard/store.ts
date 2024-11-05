import { configureStore } from '@reduxjs/toolkit';
import excerptsReducer from './features/excerpts/excerptsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      excerpts: excerptsReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
