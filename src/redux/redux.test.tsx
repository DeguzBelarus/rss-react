import { vi } from 'vitest';
import {
  reducer,
  initialState,
  setSearchKey,
  setCatsData,
  setCurrentCatData,
  setIsFirstLoad,
  setCurrentCatId,
} from './mainSlice';
import { cardsDataMock } from '../mocks/mocks';
import { getCatsDataAsync, getCatDataAsync } from './thunks';
import { store } from './store';

describe('redux store tests', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toBe(initialState);
  });

  test('should handle the state values', () => {
    expect(reducer(initialState, setSearchKey('Deguz')).searchKey).toEqual('Deguz');
    expect(reducer(initialState, setCatsData(cardsDataMock)).catsData).toEqual(cardsDataMock);
    expect(reducer(initialState, setCurrentCatData(cardsDataMock[0])).currentCatData).toEqual(
      cardsDataMock[0]
    );
    expect(reducer(initialState, setIsFirstLoad(false)).isFirstLoad).toEqual(false);
    expect(reducer(initialState, setCurrentCatId(1)).currentCatId).toEqual(1);
  });
});

describe('redux thunks tests', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  test('thunks can be called', async () => {
    store.dispatch(getCatDataAsync('1'));
    store.dispatch(getCatsDataAsync(''));
  });
});
