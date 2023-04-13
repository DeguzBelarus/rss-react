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
  requestStatus: 'idle',
  currentCatData: null,
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
  async (id: string): Promise<Nullable<ICardCatObject>> => {
    const params = new URLSearchParams();
    params.set('id', id);

    const getCatDataURL = `${CAT_DATA_BASE_URL}?${params}`;
    const getCatDataResponse: Undefinable<Response> = await fetchData(getCatDataURL);
    if (getCatDataResponse && getCatDataResponse.ok) {
      const getCatDataResponseData: ICardCatObject = await getCatDataResponse.json();
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
      { payload }: PayloadAction<ICardCatObject>
    ) {
      state.currentCatData = payload;
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
          if (payload) {
            state.currentCatData = payload;
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
  actions: { setCatsData, setSearchKey, setCurrentCatData },
} = mainSlice;

export const getSearchKey = ({ main: { searchKey } }: RootState) => searchKey;
export const getCatsData = ({ main: { catsData } }: RootState) => catsData;
export const getCurrentCatData = ({ main: { currentCatData } }: RootState) => currentCatData;
export const getRequestStatus = ({ main: { requestStatus } }: RootState) => requestStatus;

export const { reducer } = mainSlice;
