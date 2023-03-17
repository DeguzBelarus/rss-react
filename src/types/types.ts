// types
export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;

// interfaces
export interface ICatObject {
  id: number;
  name: string;
  breed: string;
  imageSrc: string;
  homeCity: string;
}
