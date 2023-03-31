import React, { FC, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { catsData } from 'catsData';
import { FormMessageType, ICatObject, IOrderObject, Nullable, IFormInputs } from 'types/types';
import { FormUserAnswersEnum, emptyString } from '../../../../constants/constants';
import { yearStringValidator, monthStringValidator, dateStringValidator } from './utils/utils';
import { FormMessage } from './components/FormMessage/FormMessage';
import './OrderForm.scss';

interface Props {
  orderAdd: (order: IOrderObject) => void;
  orders: Array<IOrderObject>;
}

export const OrderForm: FC<Props> = ({ orderAdd, orders }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IFormInputs>();

  const catSelectorValue = watch().catSelector;
  const [selectedCatImageSrc, setSelectedCatImageSrc] = useState<Nullable<string>>(null);
  const [profileImageLoaded, setProfileImageLoaded] = useState<Nullable<File>>(null);
  const [formMessage, setFormMessage] = useState(emptyString);
  const [formMessageType, setFormMessageType] = useState<FormMessageType>('success');

  const profileImageLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      setProfileImageLoaded(files[0]);
    }
  };

  const formMessagesClearing = () => {
    setFormMessage('');
    setFormMessageType('success');
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
      setFormMessageType('error');
      setFormMessage('Choose a cat to buy');
      return false;
    }
    return true;
  };

  const validateDate = (value: string): boolean => {
    if (!value) {
      setFormMessageType('error');
      setFormMessage('Enter the date of purchase');
      return false;
    }

    if (value.length !== 10) {
      setFormMessageType('error');
      setFormMessage('Enter the correct date');
      return false;
    }

    const dateStringArray = value.split('-');
    if (
      !yearStringValidator(dateStringArray[0]) ||
      !monthStringValidator(dateStringArray[1]) ||
      !dateStringValidator(dateStringArray[2])
    ) {
      setFormMessageType('error');
      setFormMessage('Enter the correct date');
      return false;
    }
    return true;
  };

  const validateName = (value: string): boolean => {
    if (!value) {
      setFormMessageType('error');
      setFormMessage(`Enter the buyer's first and last name`);
      return false;
    }

    const pattern = /^[A-Za-zА-Яа-яЁё0-9]{2,}\s[A-Za-zА-Яа-яЁё0-9]{2,}$/;
    if (!value.match(pattern)) {
      setFormMessageType('error');
      setFormMessage('Two words with more than 2 characters');
      return false;
    }
    return true;
  };

  const validateProfileImage = (): boolean => {
    if (!profileImageLoaded) {
      setFormMessageType('error');
      setFormMessage('Upload a profile image');
      return false;
    }
    return true;
  };

  const orderSubmit: SubmitHandler<IFormInputs> = (data) => {
    formMessagesClearing();
    const { name, date, catSelector, isDeliveryNeeded, notificationConfirmation } = data;
    if (!Object.keys(errors).length) {
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
      setFormMessageType('success');
      setFormMessage('Your order is accepted!');
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
      {formMessage ? <FormMessage message={formMessage} messageType={formMessageType} /> : null}
      <form onSubmit={handleSubmit(orderSubmit)}>
        <label>
          Buyer&apos;s name and last name:
          <input
            {...register('name', {
              validate: {
                validate: (value) => validateName(value),
              },
            })}
            type="text"
            placeholder="Enter name and last name..."
            autoComplete="false"
            data-testid="app-name-input"
          />
        </label>
        <label htmlFor="date-input">
          Order date:
          <input
            {...register('date', {
              validate: {
                validate: (value) => validateDate(value),
              },
            })}
            id="date-input"
            type="date"
            title="Specify the date of purchase"
            data-testid="app-date-input"
          />
        </label>
        <label>
          Selected cat:
          <select
            {...register('catSelector', {
              validate: {
                validate: (value) => validateCatSelector(value),
              },
            })}
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
            {...register('profileImage', {
              validate: {
                validate: () => validateProfileImage(),
              },
            })}
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
