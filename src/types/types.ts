import { FormUserAnswersEnum } from 'constants/constants';

// types
export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type HeaderOriginType = 'main-page' | 'about-page' | 'purchases-page';
export type FormMessageType = 'success' | 'error';

// interfaces
export interface ICatObject {
  id: number;
  name: string;
  breed: string;
  imageSrc: string;
  city: string;
  price: number;
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
