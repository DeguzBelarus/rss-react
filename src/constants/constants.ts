// enums
export enum FormUserAnswersEnum {
  positive = 'yes',
  negative = 'no',
}

// general
export const emptyString = '';
export const CAT_DATA_BASE_URL = 'https://mock-server-cats.vercel.app/catalog';
export const SERVER_STATIC_URL = 'https://mock-server-cats.vercel.app/';
export const FORM_DEFAULT_STATE = {
  name: emptyString,
  date: emptyString,
  catSelector: emptyString,
  notificationConfirmation: FormUserAnswersEnum.negative,
  isDeliveryNeeded: false,
};
