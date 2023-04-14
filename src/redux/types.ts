import { ICardCatObject, IFormMessage, IOrderObject, Nullable } from './../types/types';

export type RequestStatusType = 'idle' | 'loading' | 'failed';

export interface IMainState {
  searchKey: string;
  catsData: Array<ICardCatObject>;
  orders: Array<IOrderObject>;
  currentCatData: Nullable<ICardCatObject>;
  currentCatId: Nullable<number>;
  isFirstLoad: boolean;
  requestStatus: RequestStatusType;
  formMessage: IFormMessage;
}
