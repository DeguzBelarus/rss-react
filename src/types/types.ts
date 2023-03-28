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
  notificationConfirmation: string;
  isDeliveryNeeded: string;
  profileImage?: string;
}

export interface IOrderObject {
  id: number;
  catInfo: ICatObject;
  buyerInfo: IBuyerInfoObject;
}

export interface IOrderFormSaveObject {
  nameInputValue: string;
  dateInputValue: string;
  catSelectorValue: string;
  agreeNewRadioCheckedStatus: boolean;
  disagreeNewRadioCheckedStatus: boolean;
  deliveryCheckboxCheckedStatus: boolean;
  profileImage?: string;
}
