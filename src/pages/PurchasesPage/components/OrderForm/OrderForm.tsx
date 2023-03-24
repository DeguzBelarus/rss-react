import React, { Component, createRef, RefObject } from 'react';

import { catsData } from 'catsData';
import { FormMessageType, ICatObject, IOrderObject, Nullable } from 'types/types';
import { FormMessage } from './FormMessage/FormMessage';
import './OrderForm.scss';

interface Props {
  orderAdd: (order: IOrderObject) => void;
  orders: Array<IOrderObject>;
}

interface State {
  selectedCatImageSrc: Nullable<string>;
  isProfileImageLoaded: boolean;
  formMessage: string;
  formMessageType: FormMessageType;
}

export class OrderForm extends Component<Props, State> {
  private nameInput: RefObject<HTMLInputElement>;
  private dateInput: RefObject<HTMLInputElement>;
  private catSelector: RefObject<HTMLSelectElement>;
  private agreeNewsRadio: RefObject<HTMLInputElement>;
  private disagreeNewsRadio: RefObject<HTMLInputElement>;
  private deliveryCheckbox: RefObject<HTMLInputElement>;
  private profileImageFileInput: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.nameInput = createRef();
    this.dateInput = createRef();
    this.catSelector = createRef();
    this.agreeNewsRadio = createRef();
    this.disagreeNewsRadio = createRef();
    this.deliveryCheckbox = createRef();
    this.profileImageFileInput = createRef();

    this.state = {
      selectedCatImageSrc: null,
      isProfileImageLoaded: false,
      formMessage: '',
      formMessageType: 'success',
    };
  }

  selectedCatImageUpdate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (value && catsData) {
      this.setState({
        selectedCatImageSrc:
          catsData.find((catData) => catData.id === Number(value))?.imageSrc || null,
      });
    }
  };

  profileImageLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      this.setState({
        isProfileImageLoaded: true,
      });
    }
  };

  formMessagesClearing() {
    this.setState({
      formMessage: '',
      formMessageType: 'success',
    });
  }

  yearStringValidator(year: string): boolean {
    if (!year || year.length !== 4 || isNaN(Number(year)) || Number(year) < 2000) {
      return false;
    }
    return true;
  }

  monthStringValidator(month: string): boolean {
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
  }

  dateStringValidator(date: string): boolean {
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
  }

  formValidation(): boolean {
    if (
      this.nameInput.current &&
      this.dateInput.current &&
      this.catSelector.current &&
      this.agreeNewsRadio.current &&
      this.disagreeNewsRadio.current &&
      this.deliveryCheckbox.current &&
      this.profileImageFileInput.current
    ) {
      if (!this.nameInput.current.value) {
        this.setState({
          formMessageType: 'error',
          formMessage: "Enter the buyer's first and last name",
        });
        return false;
      }
      const nameInputValueWords = this.nameInput.current.value.split(' ');
      if (
        nameInputValueWords[0]?.length < 2 ||
        !nameInputValueWords[1] ||
        nameInputValueWords[1]?.length < 2
      ) {
        this.setState({
          formMessageType: 'error',
          formMessage: 'At least two words with more than 2 characters',
        });
        return false;
      }

      if (nameInputValueWords[2]) {
        this.setState({
          formMessageType: 'error',
          formMessage: 'Two words maximum',
        });
        return false;
      }

      if (!this.dateInput.current.value) {
        this.setState({
          formMessageType: 'error',
          formMessage: 'Enter the date of purchase',
        });
        return false;
      }
      const dateInputValueWords = this.dateInput.current.value.split('-');
      if (
        !this.yearStringValidator(dateInputValueWords[0]) ||
        !this.monthStringValidator(dateInputValueWords[1]) ||
        !this.dateStringValidator(dateInputValueWords[2])
      ) {
        this.setState({
          formMessageType: 'error',
          formMessage: 'Enter the correct date',
        });
        return false;
      }

      if (!this.catSelector.current.value) {
        this.setState({
          formMessageType: 'error',
          formMessage: 'Choose a cat to buy',
        });
        return false;
      }

      if (
        this.profileImageFileInput.current.files &&
        !this.profileImageFileInput.current.files[0]
      ) {
        this.setState({
          formMessageType: 'error',
          formMessage: 'Upload a profile image',
        });
        return false;
      }

      return true;
    } else {
      return false;
    }
  }

  orderSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.formMessagesClearing();

    if (this.formValidation()) {
      const { orderAdd, orders } = this.props;
      const orderData: IOrderObject = {
        id: orders.length + 1,
        catInfo: catsData.find(
          (catData) => catData.id === Number(this.catSelector.current!.value)
        ) as ICatObject,
        buyerInfo: {
          name: this.nameInput.current!.value,
          purchaseDate: this.dateInput.current!.value,
          isDeliveryNeeded: this.deliveryCheckbox.current!.checked ? 'yes' : 'no',
          notificationConfirmation: this.disagreeNewsRadio.current?.checked
            ? this.disagreeNewsRadio.current!.value
            : this.agreeNewsRadio.current!.value,
        },
      };
      orderAdd(orderData);
      this.setState({
        formMessageType: 'success',
        formMessage: 'Your order is accepted!',
        selectedCatImageSrc: null,
        isProfileImageLoaded: false,
      });
      this.profileImageFileInput.current!.files = null;
      event.currentTarget.reset();
    }
  };

  render() {
    const { orders } = this.props;
    const { selectedCatImageSrc, isProfileImageLoaded, formMessage, formMessageType } = this.state;
    return (
      <div className="order-form-wrapper" data-testid="app-order-form">
        {formMessage ? <FormMessage message={formMessage} messageType={formMessageType} /> : null}
        <form onSubmit={this.orderSubmit}>
          <label>
            Buyer&apos;s name and last name:
            <input
              type="text"
              placeholder="Enter name and last name..."
              autoComplete="false"
              ref={this.nameInput}
              data-testid="app-name-input"
            />
          </label>
          <label htmlFor="date-input">
            Order date:
            <input
              id="date-input"
              type="date"
              title="Specify the date of purchase"
              ref={this.dateInput}
              data-testid="app-date-input"
            />
          </label>
          <label>
            Selected cat:
            <select
              title="Select a cat to buy"
              onChange={this.selectedCatImageUpdate}
              ref={this.catSelector}
              data-testid="app-cat-selector"
            >
              <option value="">-- Choose a cat to buy --</option>
              {catsData
                .filter(
                  (catData) => !orders.find((orderData) => catData.id === orderData.catInfo.id)
                )
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
                ref={this.agreeNewsRadio}
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
                ref={this.disagreeNewsRadio}
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
              ref={this.deliveryCheckbox}
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
              onChange={this.profileImageLoadHandler}
              ref={this.profileImageFileInput}
              data-testid="app-profile-file-input"
            />
          </label>
          <button
            className="order-submit-button"
            type="submit"
            data-testid="app-order-accept-button"
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
  }
}
