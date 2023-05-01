import { configureStore, ThunkAction, Action, PreloadedState } from '@reduxjs/toolkit';
import { reducer as mainReducer } from './mainSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      main: mainReducer,
    },
    preloadedState,
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
