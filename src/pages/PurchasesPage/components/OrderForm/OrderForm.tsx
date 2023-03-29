import React, { FC, useRef, useState, useEffect } from 'react';

import { catsData } from 'catsData';
import {
  FormMessageType,
  ICatObject,
  IOrderFormSaveObject,
  IOrderObject,
  Nullable,
} from 'types/types';
import { FormMessage } from './FormMessage/FormMessage';
import './OrderForm.scss';

interface Props {
  orderAdd: (order: IOrderObject) => void;
  orders: Array<IOrderObject>;
}

export const OrderForm: FC<Props> = ({ orderAdd, orders }) => {
  const nameInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  const catSelector = useRef<HTMLSelectElement>(null);
  const agreeNewsRadio = useRef<HTMLInputElement>(null);
  const disagreeNewsRadio = useRef<HTMLInputElement>(null);
  const deliveryCheckbox = useRef<HTMLInputElement>(null);
  const profileImageFileInput = useRef<HTMLInputElement>(null);

  const [selectedCatImageSrc, setSelectedCatImageSrc] = useState<Nullable<string>>(null);
  const [isProfileImageLoaded, setIsProfileImageLoaded] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formMessageType, setFormMessageType] = useState<FormMessageType>('success');

  const profileImageLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      setIsProfileImageLoaded(true);
    }
  };

  const formMessagesClearing = () => {
    setFormMessage('');
    setFormMessageType('success');
  };

  const yearStringValidator = (year: string): boolean => {
    if (!year || year.length !== 4 || isNaN(Number(year)) || Number(year) < 2000) {
      return false;
    }
    return true;
  };

  const monthStringValidator = (month: string): boolean => {
    if (
      !month ||
      month.length !== 2 ||
      isNaN(Number(month)) ||
      Number(month) < 1 ||
      Number(month) > 12
    ) {
      return false;
    }
    return true;
  };

  const dateStringValidator = (date: string): boolean => {
    if (
      !date ||
      date.length !== 2 ||
      isNaN(Number(date)) ||
      Number(date) < 1 ||
      Number(date) > 31
    ) {
      return false;
    }
    return true;
  };

  const formValidation = (): boolean => {
    if (
      nameInput.current &&
      dateInput.current &&
      catSelector.current &&
      agreeNewsRadio.current &&
      disagreeNewsRadio.current &&
      deliveryCheckbox.current &&
      profileImageFileInput.current
    ) {
      if (!nameInput.current.value) {
        setFormMessageType('error');
        setFormMessage("Enter the buyer's first and last name");
        return false;
      }
      const nameInputValueWords = nameInput.current.value.split(' ');
      if (
        nameInputValueWords[0]?.length < 2 ||
        !nameInputValueWords[1] ||
        nameInputValueWords[1]?.length < 2
      ) {
        setFormMessageType('error');
        setFormMessage('At least two words with more than 2 characters');
        return false;
      }

      if (nameInputValueWords[2]) {
        setFormMessageType('error');
        setFormMessage('Two words maximum');
        return false;
      }

      if (!dateInput.current.value) {
        setFormMessageType('error');
        setFormMessage('Enter the date of purchase');
        return false;
      }
      const dateInputValueWords = dateInput.current.value.split('-');
      if (
        !yearStringValidator(dateInputValueWords[0]) ||
        !monthStringValidator(dateInputValueWords[1]) ||
        !dateStringValidator(dateInputValueWords[2])
      ) {
        setFormMessageType('error');
        setFormMessage('Enter the correct date');
        return false;
      }

      if (!catSelector.current.value) {
        setFormMessageType('error');
        setFormMessage('Choose a cat to buy');
        return false;
      }

      if (profileImageFileInput.current.files && !profileImageFileInput.current.files[0]) {
        setFormMessageType('error');
        setFormMessage('Upload a profile image');
        return false;
      }

      return true;
    } else {
      return false;
    }
  };

  const orderSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formMessagesClearing();

    if (formValidation()) {
      const orderData: IOrderObject = {
        id: orders.length + 1,
        catInfo: catsData.find(
          (catData) => catData.id === Number(catSelector.current!.value)
        ) as ICatObject,
        buyerInfo: {
          name: nameInput.current!.value,
          purchaseDate: dateInput.current!.value,
          isDeliveryNeeded: deliveryCheckbox.current!.checked ? 'yes' : 'no',
          notificationConfirmation: disagreeNewsRadio.current?.checked
            ? disagreeNewsRadio.current!.value
            : agreeNewsRadio.current!.value,
        },
      };
      if (profileImageFileInput.current?.files && profileImageFileInput.current.files[0]) {
        orderData.buyerInfo.profileImage = URL.createObjectURL(
          profileImageFileInput.current.files[0]
        );
      }

      orderAdd(orderData);
      setFormMessageType('success');
      setFormMessage('Your order is accepted!');
      setSelectedCatImageSrc(null);
      setIsProfileImageLoaded(false);
      profileImageFileInput.current!.files = null;
      localStorage.removeItem('rss-save-form');
      event.currentTarget.reset();
    }
  };

  const formDataLoad = () => {
    if (localStorage.getItem('rss-save-form')) {
      const formSave = JSON.parse(
        localStorage.getItem('rss-save-form') || ''
      ) as IOrderFormSaveObject;
      nameInput.current!.value = formSave.nameInputValue;
      dateInput.current!.value = formSave.dateInputValue;
      catSelector.current!.value = formSave.catSelectorValue;
      setSelectedCatImageSrc(
        catsData.find((catData) => catData.id === Number(catSelector.current!.value))?.imageSrc ||
          null
      );
      agreeNewsRadio.current!.checked = formSave.agreeNewRadioCheckedStatus;
      disagreeNewsRadio.current!.checked = formSave.disagreeNewRadioCheckedStatus;
      deliveryCheckbox.current!.checked = formSave.deliveryCheckboxCheckedStatus;
    }
  };

  const formDataSave = () => {
    const formDataSave: IOrderFormSaveObject = {
      nameInputValue: nameInput.current!.value,
      dateInputValue: dateInput.current!.value,
      catSelectorValue: catSelector.current!.value,
      agreeNewRadioCheckedStatus: agreeNewsRadio.current!.checked,
      disagreeNewRadioCheckedStatus: disagreeNewsRadio.current!.checked,
      deliveryCheckboxCheckedStatus: deliveryCheckbox.current!.checked,
    };
    if (profileImageFileInput.current?.files && profileImageFileInput.current.files[0]) {
      formDataSave.profileImage = URL.createObjectURL(profileImageFileInput.current.files[0]);
    }
    localStorage.setItem('rss-save-form', JSON.stringify(formDataSave));
  };

  const selectedCatImageUpdate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (value && catsData) {
      setSelectedCatImageSrc(
        catsData.find((catData) => catData.id === Number(value))?.imageSrc || null
      );
    }
    formDataSave();
  };

  useEffect(() => {
    formDataLoad();
  }, []);
  return (
    <div className="order-form-wrapper" data-testid="app-order-form">
      {formMessage ? <FormMessage message={formMessage} messageType={formMessageType} /> : null}
      <form onSubmit={orderSubmit}>
        <label>
          Buyer&apos;s name and last name:
          <input
            type="text"
            placeholder="Enter name and last name..."
            autoComplete="false"
            onChange={() => formDataSave()}
            ref={nameInput}
            data-testid="app-name-input"
          />
        </label>
        <label htmlFor="date-input">
          Order date:
          <input
            id="date-input"
            type="date"
            title="Specify the date of purchase"
            onChange={() => formDataSave()}
            ref={dateInput}
            data-testid="app-date-input"
          />
        </label>
        <label>
          Selected cat:
          <select
            title="Select a cat to buy"
            onChange={selectedCatImageUpdate}
            ref={catSelector}
            data-testid="app-cat-selector"
          >
            <option value="">-- Choose a cat to buy --</option>
            {catsData
              .filter((catData) => !orders.find((orderData) => catData.id === orderData.catInfo.id))
              .map((catData) => {
                return (
                  <option value={catData.id} key={catData.id}>
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
              type="radio"
              title="agree to receive news"
              name="notificationConfirmation"
              value={'yes'}
              onClick={() => formDataSave()}
              ref={agreeNewsRadio}
              data-testid="app-notification-agree-radio"
            />
          </label>
          <label>
            No
            <input
              type="radio"
              title="disagree to receive news"
              name="notificationConfirmation"
              defaultChecked={true}
              value={'no'}
              onClick={() => formDataSave()}
              ref={disagreeNewsRadio}
              data-testid="app-notification-disagree-radio"
            />
          </label>
        </div>
        <label className="delivery-label">
          Need delivery:
          <input
            type="checkbox"
            title="I need delivery"
            name="isDeliveryNeeded"
            onClick={() => formDataSave()}
            ref={deliveryCheckbox}
            data-testid="app-delivery-checkbox"
          />
        </label>
        <label
          className={
            isProfileImageLoaded
              ? 'profile-image-label file-input-with-file'
              : 'profile-image-label'
          }
          htmlFor="profile-image-file-input"
        >
          {isProfileImageLoaded ? 'profile image added ' : 'upload a profile image '}👦
          <input
            id="profile-image-file-input"
            type="file"
            name="profile-image"
            accept="image/png, image/jpeg"
            onChange={profileImageLoadHandler}
            multiple={false}
            ref={profileImageFileInput}
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
