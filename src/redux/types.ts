import { ICardCatObject, Nullable } from './../types/types';

export type RequestStatusType = 'idle' | 'loading' | 'failed';

export interface IMainState {
  searchKey: string;
  requestStatus: RequestStatusType;
  catsData: Array<ICardCatObject>;
  currentCatData: Nullable<ICardCatObject>;
}
