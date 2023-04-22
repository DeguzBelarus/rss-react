import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { WritableDraft } from 'immer/dist/internal';

import { IMainState } from './types';
import {
  ICardCatObject,
  IFormMessage,
  IFormNoFileFields,
  IOrderObject,
  Nullable,
} from '../types/types';
import { getCatDataAsync, getCatsDataAsync } from './thunks';
import { emptyString, FORM_DEFAULT_STATE } from '../constants/constants';

const initialState: IMainState = {
  searchKey: '',
  catsData: [],
  orders: [],
  currentCatData: null,
  currentCatId: null,
  isFirstLoad: false,
  formMessage: { messageText: emptyString, messageType: 'success' },
  formState: FORM_DEFAULT_STATE,
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
    setCurrentCatData(
      state: WritableDraft<IMainState>,
      { payload }: PayloadAction<Nullable<ICardCatObject>>
    ) {
      state.currentCatData = payload;
    },
    setIsFirstLoad(state: WritableDraft<IMainState>, { payload }: PayloadAction<boolean>) {
      state.isFirstLoad = payload;
    },
    setCurrentCatId(
      state: WritableDraft<IMainState>,
      { payload }: PayloadAction<Nullable<number>>
    ) {
      state.currentCatId = payload;
    },
    setOrders(state: WritableDraft<IMainState>, { payload }: PayloadAction<Array<IOrderObject>>) {
      state.orders = payload;
    },
    setFormMessage(state: WritableDraft<IMainState>, { payload }: PayloadAction<IFormMessage>) {
      state.formMessage = payload;
    },
    setFormState(state: WritableDraft<IMainState>, { payload }: PayloadAction<IFormNoFileFields>) {
      state.formState = payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // get cats data
      .addCase(getCatsDataAsync.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(getCatsDataAsync.fulfilled, (state, { payload }) => {
        state.requestStatus = 'idle';

        if (payload) {
          if (payload) {
            state.catsData = payload;
          }
        }
      })
      .addCase(getCatsDataAsync.rejected, (state, { error }) => {
        state.requestStatus = 'failed';
        console.error('\x1b[40m\x1b[31m\x1b[1m', error.message);
      })

      // get the specified cat data
      .addCase(getCatDataAsync.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(getCatDataAsync.fulfilled, (state, { payload }) => {
        state.requestStatus = 'idle';

        if (payload) {
          if (payload && payload[0]) {
            state.currentCatData = payload[0];
          }
        }
      })
      .addCase(getCatDataAsync.rejected, (state, { error }) => {
        state.requestStatus = 'failed';
        console.error('\x1b[40m\x1b[31m\x1b[1m', error.message);
      });
  },
});

export const {
  actions: {
    setCatsData,
    setSearchKey,
    setCurrentCatData,
    setIsFirstLoad,
    setCurrentCatId,
    setOrders,
    setFormMessage,
    setFormState,
  },
} = mainSlice;

export const getSearchKey = ({ main: { searchKey } }: RootState) => searchKey;
export const getCatsData = ({ main: { catsData } }: RootState) => catsData;
export const getOrders = ({ main: { orders } }: RootState) => orders;
export const getCurrentCatData = ({ main: { currentCatData } }: RootState) => currentCatData;
export const getCurrentCatId = ({ main: { currentCatId } }: RootState) => currentCatId;
export const getIsFirstLoad = ({ main: { isFirstLoad } }: RootState) => isFirstLoad;
export const getFormMessage = ({ main: { formMessage } }: RootState) => formMessage;
export const getFormState = ({ main: { formState } }: RootState) => formState;
export const getRequestStatus = ({ main: { requestStatus } }: RootState) => requestStatus;

export const { reducer } = mainSlice;
