import { ICardCatObject, IOrderObject, Nullable } from './../types/types';

export type RequestStatusType = 'idle' | 'loading' | 'failed';

export interface IMainState {
  searchKey: string;
  catsData: Array<ICardCatObject>;
  currentCatData: Nullable<ICardCatObject>;
  currentCatId: Nullable<number>;
  isFirstLoad: boolean;
  requestStatus: RequestStatusType;
  orders: Array<IOrderObject>;
}
