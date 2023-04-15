import { createAsyncThunk } from '@reduxjs/toolkit';
import { CAT_DATA_BASE_URL } from 'constants/constants';
import { ICardCatObject, Nullable, Undefinable } from 'types/types';
import { fetchData } from 'utils/utils';

// main thunks
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
