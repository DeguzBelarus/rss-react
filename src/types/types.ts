// types
export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type HeaderOriginType = 'main-page' | 'about-page' | 'purchases-page';

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
}

export interface IOrderObject {
  id: number;
  catInfo: ICatObject;
  buyerInfo: IBuyerInfoObject;
}
