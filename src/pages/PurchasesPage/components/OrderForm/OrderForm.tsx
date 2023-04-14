import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';

import { getFormMessage, setFormMessage } from 'redux/mainSlice';
import { catsData } from 'catsData';
import { ICatObject, IOrderObject, Nullable, IFormInputs } from 'types/types';
import { FormUserAnswersEnum, emptyString } from '../../../../constants/constants';
import { yearStringValidator, monthStringValidator, dateStringValidator } from './utils/utils';
import { FormMessage } from './components/FormMessage/FormMessage';
import './OrderForm.scss';

interface Props {
  orderAdd: (order: IOrderObject) => void;
  orders: Array<IOrderObject>;
}

export const OrderForm: FC<Props> = ({ orderAdd, orders }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, reset } = useForm<IFormInputs>();

  const formMessage = useAppSelector(getFormMessage);
  const catSelectorValue = watch().catSelector;
  const [selectedCatImageSrc, setSelectedCatImageSrc] = useState<Nullable<string>>(null);
  const [profileImageLoaded, setProfileImageLoaded] = useState<Nullable<File>>(null);

  const profileImageLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      setProfileImageLoaded(files[0]);
    }
  };

  const formMessagesClearing = () => {
    dispatch(setFormMessage({ messageText: emptyString, messageType: 'success' }));
  };

  const selectedCatImageUpdate = (id: string) => {
    if (id && catsData) {
      setSelectedCatImageSrc(
        catsData.find((catData) => catData.id === Number(id))?.imageSrc || null
      );
    }
  };

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

  const validateProfileImage = (): boolean => {
    if (!profileImageLoaded) {
      dispatch(setFormMessage({ messageText: 'Upload a profile image', messageType: 'error' }));
      return false;
    }
    return true;
  };

  const orderSubmit: SubmitHandler<IFormInputs> = (data) => {
    formMessagesClearing();
    const { name, date, catSelector, isDeliveryNeeded, notificationConfirmation } = data;
    if (
      validateName(name) &&
      validateDate(date) &&
      validateCatSelector(catSelector) &&
      validateProfileImage()
    ) {
      const orderData: IOrderObject = {
        id: orders.length + 1,
        catInfo: catsData.find((catData) => catData.id === Number(catSelector)) as ICatObject,
        buyerInfo: {
          name,
          purchaseDate: date,
          isDeliveryNeeded,
          notificationConfirmation,
        },
      };
      if (profileImageLoaded) {
        orderData.buyerInfo.profileImage = URL.createObjectURL(profileImageLoaded);
      }
      orderAdd(orderData);
      dispatch(setFormMessage({ messageText: 'Your order is accepted!', messageType: 'success' }));
      setSelectedCatImageSrc(null);
      setProfileImageLoaded(null);
      localStorage.removeItem('rss-save-form');
      reset();
    }
  };

  useEffect(() => {
    selectedCatImageUpdate(watch().catSelector);
  }, [watch, catSelectorValue]);
  return (
    <div className="order-form-wrapper" data-testid="app-order-form">
      {formMessage.messageText ? <FormMessage /> : null}
      <form onSubmit={handleSubmit(orderSubmit)}>
        <label>
          Buyer&apos;s name and last name:
          <input
            {...register('name')}
            type="text"
            placeholder="Enter name and last name..."
            autoComplete="false"
            data-testid="app-name-input"
          />
        </label>
        <label htmlFor="date-input">
          Order date:
          <input
            {...register('date')}
            id="date-input"
            type="date"
            title="Specify the date of purchase"
            data-testid="app-date-input"
          />
        </label>
        <label>
          Selected cat:
          <select
            {...register('catSelector')}
            title="Select a cat to buy"
            data-testid="app-cat-selector"
          >
            <option value="">-- Choose a cat to buy --</option>
            {catsData
              .filter((catData) => !orders.find((orderData) => catData.id === orderData.catInfo.id))
              .map((catData) => {
                return (
                  <option value={catData.id} key={catData.id} data-testid="app-cat-option">
                    {catData.name}
                  </option>
                );
              })}
          </select>
        </label>
        <p className="news-confirmation-paragraph">Confirm to receive news:</p>
        <div className="news-confirmation-container">
          <label>
            Yes
            <input
              {...register('notificationConfirmation')}
              type="radio"
              title="agree to receive news"
              value={FormUserAnswersEnum.positive}
              data-testid="app-notification-agree-radio"
            />
          </label>
          <label>
            No
            <input
              {...register('notificationConfirmation')}
              type="radio"
              title="disagree to receive news"
              defaultChecked={true}
              value={FormUserAnswersEnum.negative}
              data-testid="app-notification-disagree-radio"
            />
          </label>
        </div>
        <label className="delivery-label">
          Need delivery:
          <input
            {...register('isDeliveryNeeded')}
            type="checkbox"
            title="I need delivery"
            data-testid="app-delivery-checkbox"
          />
        </label>
        <label
          className={
            profileImageLoaded ? 'profile-image-label file-input-with-file' : 'profile-image-label'
          }
          htmlFor="profile-image-file-input"
        >
          {profileImageLoaded ? 'profile image added ' : 'upload a profile image '}👦
          <input
            {...register('profileImage')}
            id="profile-image-file-input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={profileImageLoadHandler}
            multiple={false}
            data-testid="app-profile-file-input"
          />
        </label>
        <button className="order-submit-button" type="submit" data-testid="app-order-accept-button">
          Accept Order
        </button>
      </form>
      <img
        className="cat-preview-image"
        src={
          selectedCatImageSrc ||
          'https://pro-dachnikov.com/uploads/posts/2021-10/1633339977_19-pro-dachnikov-com-p-dom-aliki-smekhovoi-na-rublevke-foto-27.jpg'
        }
        alt="a cat preview"
      />
    </div>
  );
};
