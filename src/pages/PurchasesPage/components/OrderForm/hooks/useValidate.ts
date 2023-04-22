import { useAppDispatch } from '../../../../../redux/hooks';
import { setFormMessage } from '../../../../../redux/mainSlice';
import { dateStringValidator, monthStringValidator, yearStringValidator } from '../utils/utils';
import { Nullable } from '../../../../../types/types';

export const useValidate = () => {
  const dispatch = useAppDispatch();

  const validateCatSelector = (value: string): boolean => {
    if (!value) {
      dispatch(setFormMessage({ messageText: 'Choose a cat to buy', messageType: 'error' }));
      return false;
    }
    return true;
  };

  const validateDate = (value: string): boolean => {
    if (!value) {
      dispatch(setFormMessage({ messageText: 'Enter the date of purchase', messageType: 'error' }));
      return false;
    }

    if (value.length !== 10) {
      dispatch(setFormMessage({ messageText: 'Enter the correct date', messageType: 'error' }));
      return false;
    }

    const dateStringArray = value.split('-');
    if (
      !yearStringValidator(dateStringArray[0]) ||
      !monthStringValidator(dateStringArray[1]) ||
      !dateStringValidator(dateStringArray[2])
    ) {
      dispatch(setFormMessage({ messageText: 'Enter the correct date', messageType: 'error' }));
      return false;
    }
    return true;
  };

  const validateName = (value: string): boolean => {
    if (!value) {
      dispatch(
        setFormMessage({
          messageText: `Enter the buyer's first and last name`,
          messageType: 'error',
        })
      );
      return false;
    }

    const pattern = /^[A-Za-zА-Яа-яЁё0-9]{2,}\s[A-Za-zА-Яа-яЁё0-9]{2,}$/;
    if (!value.match(pattern)) {
      dispatch(
        setFormMessage({
          messageText: 'Two words with more than 2 characters',
          messageType: 'error',
        })
      );
      return false;
    }
    return true;
  };

  const validateProfileImage = (profileImageLoaded: Nullable<File>): boolean => {
    if (!profileImageLoaded) {
      dispatch(setFormMessage({ messageText: 'Upload a profile image', messageType: 'error' }));
      return false;
    }
    return true;
  };

  return { validateCatSelector, validateDate, validateName, validateProfileImage };
};
