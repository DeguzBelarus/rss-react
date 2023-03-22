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
  homeCity: string;
  price: number;
}
