import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  getFormMessage,
  setFormMessage,
  getFormState,
  setFormState,
} from '../../../../redux/mainSlice';
import { catsData } from '../../../../catsData';
import { ICatObject, IOrderObject, Nullable, IFormInputs } from '../../../../types/types';
import {
  FORM_DEFAULT_STATE,
  FormUserAnswersEnum,
  emptyString,
} from '../../../../constants/constants';
import { FormMessage } from './components/FormMessage/FormMessage';
import { useValidate } from './hooks/useValidate';
import './OrderForm.scss';

interface Props {
  orderAdd: (order: IOrderObject) => void;
  orders: Array<IOrderObject>;
}

export const OrderForm: FC<Props> = ({ orderAdd, orders }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, reset } = useForm<IFormInputs>();
  const { validateCatSelector, validateName, validateDate, validateProfileImage } = useValidate();
  const inputValues = watch();

  const formMessage = useAppSelector(getFormMessage);
  const formState = useAppSelector(getFormState);

  const [selectedCatImageSrc, setSelectedCatImageSrc] = useState<Nullable<string>>(null);
  const [profileImageLoaded, setProfileImageLoaded] = useState<Nullable<File>>(null);

  const formStateUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormState({ ...formState, [event.target.name]: event.target.value }));
  };

  const formSelectorStateUpdate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFormState({ ...formState, [event.target.name]: event.target.value }));
  };

  const profileImageLoadHandler = (profileImage: Nullable<FileList>) => {
    if (profileImage) {
      setProfileImageLoaded(profileImage[0]);
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

  const orderSubmit: SubmitHandler<IFormInputs> = (data) => {
    formMessagesClearing();
    const { name, date, catSelector, isDeliveryNeeded, notificationConfirmation } = data;
    if (
      validateName(name) &&
      validateDate(date) &&
      validateCatSelector(catSelector) &&
      validateProfileImage(profileImageLoaded)
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
      reset();
      dispatch(setFormState(FORM_DEFAULT_STATE));
    }
  };

  useEffect(() => {
    selectedCatImageUpdate(inputValues.catSelector);
    profileImageLoadHandler(inputValues.profileImage);
  }, [inputValues]);
  return (
    <div className="order-form-wrapper" data-testid="app-order-form">
      {formMessage.messageText ? <FormMessage /> : null}
      <form onSubmit={handleSubmit(orderSubmit)}>
        <label>
          Buyer&apos;s name and last name:
          <input
            {...register('name', {
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => formStateUpdate(event),
            })}
            type="text"
            placeholder="Enter name and last name..."
            autoComplete="false"
            defaultValue={formState.name}
            data-testid="app-name-input"
            data-cy="app-name-input"
          />
        </label>
        <label htmlFor="date-input">
          Order date:
          <input
            {...register('date', {
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => formStateUpdate(event),
            })}
            id="date-input"
            type="date"
            title="Specify the date of purchase"
            defaultValue={formState.date}
            data-testid="app-date-input"
            data-cy="app-date-input"
          />
        </label>
        <label>
          Selected cat:
          <select
            {...register('catSelector', {
              onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
                formSelectorStateUpdate(event),
            })}
            title="Select a cat to buy"
            defaultValue={formState.catSelector}
            data-testid="app-cat-selector"
            data-cy="app-cat-selector"
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
              {...register('notificationConfirmation', {
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => formStateUpdate(event),
              })}
              type="radio"
              title="agree to receive news"
              defaultChecked={formState.notificationConfirmation === FormUserAnswersEnum.positive}
              value={FormUserAnswersEnum.positive}
              data-testid="app-notification-agree-radio"
              data-cy="app-notification-agree-radio"
            />
          </label>
          <label>
            No
            <input
              {...register('notificationConfirmation', {
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => formStateUpdate(event),
              })}
              type="radio"
              title="disagree to receive news"
              defaultChecked={formState.notificationConfirmation === FormUserAnswersEnum.negative}
              value={FormUserAnswersEnum.negative}
              data-testid="app-notification-disagree-radio"
              data-cy="app-notification-disagree-radio"
            />
          </label>
        </div>
        <label className="delivery-label">
          Need delivery:
          <input
            {...register('isDeliveryNeeded', {
              onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(
                  setFormState({
                    ...formState,
                    [event.target.name]: event.target.checked ? true : false,
                  })
                ),
            })}
            defaultChecked={formState.isDeliveryNeeded}
            type="checkbox"
            title="I need delivery"
            data-testid="app-delivery-checkbox"
            data-cy="app-delivery-checkbox"
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
            multiple={false}
            data-testid="app-profile-file-input"
            data-cy="app-profile-file-input"
          />
        </label>
        <button
          className="order-submit-button"
          type="submit"
          data-testid="app-order-accept-button"
          data-cy="app-order-accept-button"
        >
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
