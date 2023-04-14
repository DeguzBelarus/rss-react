import { FormUserAnswersEnum } from 'constants/constants';

// types
export type LoaderOriginType = 'main-page' | 'cat-modal';
export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type HeaderOriginType = 'main-page' | 'about-page' | 'purchases-page';
export type FormMessageType = 'success' | 'error';

// interfaces
export interface IFormMessage {
  messageText: string;
  messageType: FormMessageType;
}

export interface ICatObject {
  id: number;
  name: string;
  breed: string;
  imageSrc: string;
  city: string;
  price: number;
}

export interface ICardCatObject {
  id: number;
  age: number;
  breed: string;
  catterys: string;
  color?: number[];
  colorOption?: string;
  counts?: number;
  description?: string;
  discont: number;
  image: string;
  name: string;
  price: number;
  raiting?: number;
  sex: number;
}

export interface IBuyerInfoObject {
  name: string;
  purchaseDate: string;
  notificationConfirmation: FormUserAnswersEnum;
  isDeliveryNeeded: boolean;
  profileImage?: Nullable<string>;
}

export interface IOrderObject {
  id: number;
  catInfo: ICatObject;
  buyerInfo: IBuyerInfoObject;
}

export interface IFormInputs {
  name: string;
  date: string;
  notificationConfirmation: FormUserAnswersEnum;
  isDeliveryNeeded: boolean;
  profileImage: FileList;
  catSelector: string;
}
