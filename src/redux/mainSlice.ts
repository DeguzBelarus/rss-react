import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { WritableDraft } from 'immer/dist/internal';

import { IMainState } from './types';
import { ICardCatObject } from 'types/types';

const initialState: IMainState = {
  searchKey: '',
  catsData: [],
  requestStatus: 'idle',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSearchKey(state: WritableDraft<IMainState>, { payload }: PayloadAction<string>) {
      state.searchKey = payload;
    },
    setCatsData(
      state: WritableDraft<IMainState>,
      { payload }: PayloadAction<Array<ICardCatObject>>
    ) {
      state.catsData = payload;
    },
  },
});

export const {
  actions: { setCatsData, setSearchKey },
} = mainSlice;

export const getSearchKey = ({ main: { searchKey } }: RootState) => searchKey;
export const getCatsData = ({ main: { catsData } }: RootState) => catsData;
export const getRequestStatus = ({ main: { requestStatus } }: RootState) => requestStatus;

export const { reducer } = mainSlice;
