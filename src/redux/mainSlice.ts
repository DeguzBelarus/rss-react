import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { WritableDraft } from 'immer/dist/internal';

import { IMainState } from './types';
import { ICardCatObject, Nullable, Undefinable } from 'types/types';
import { CAT_DATA_BASE_URL } from 'constants/constants';
import { fetchData } from 'utils/utils';

const initialState: IMainState = {
  searchKey: '',
  catsData: [],
  currentCatData: null,
  currentCatId: null,
  isFirstLoad: false,
  requestStatus: 'idle',
};

// thunks
// get cats data
export const getCatsDataAsync = createAsyncThunk(
  'cats/get-all',
  async (searchKey: string): Promise<Nullable<Array<ICardCatObject>>> => {
    const params = new URLSearchParams();
    params.set('q', searchKey);

    const getCatsDataURL = `${CAT_DATA_BASE_URL}?${params}`;
    const getCatsDataResponse: Undefinable<Response> = await fetchData(getCatsDataURL);
    if (getCatsDataResponse && getCatsDataResponse.ok) {
      const getCatsDataResponseData: Array<ICardCatObject> = await getCatsDataResponse.json();
      return getCatsDataResponseData;
    }
    return null;
  }
);

// get the specified cat data
export const getCatDataAsync = createAsyncThunk(
  'cats/get-one',
  async (id: string): Promise<Nullable<Array<ICardCatObject>>> => {
    const params = new URLSearchParams();
    params.set('id', id);

    const getCatDataURL = `${CAT_DATA_BASE_URL}?${params}`;
    const getCatDataResponse: Undefinable<Response> = await fetchData(getCatDataURL);
    if (getCatDataResponse && getCatDataResponse.ok) {
      const getCatDataResponseData: Array<ICardCatObject> = await getCatDataResponse.json();
      return getCatDataResponseData;
    }
    return null;
  }
);

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
  actions: { setCatsData, setSearchKey, setCurrentCatData, setIsFirstLoad, setCurrentCatId },
} = mainSlice;

export const getSearchKey = ({ main: { searchKey } }: RootState) => searchKey;
export const getCatsData = ({ main: { catsData } }: RootState) => catsData;
export const getCurrentCatData = ({ main: { currentCatData } }: RootState) => currentCatData;
export const getCurrentCatId = ({ main: { currentCatId } }: RootState) => currentCatId;
export const getIsFirstLoad = ({ main: { isFirstLoad } }: RootState) => isFirstLoad;
export const getRequestStatus = ({ main: { requestStatus } }: RootState) => requestStatus;

export const { reducer } = mainSlice;
