import { FC } from 'react';

import { IOrderObject } from '../../../../types/types';
import { FormUserAnswersEnum } from '../../../../constants/constants';
import './OrderItem.scss';

interface Props extends IOrderObject {
  orderRemove: (id: number) => void;
}

export const OrderItem: FC<Props> = ({ buyerInfo, catInfo, id, orderRemove }) => {
  return (
    <div className="order-item-wrapper" data-testid="app-order-item">
      <span>{`#${id}`}</span>
      <span>{catInfo.name}</span>
      <img src={catInfo.imageSrc} alt="a cat preview" />
      <div className="order-info-container">
        <span>{`date: ${buyerInfo.purchaseDate}`}</span>
        <span>{`owner: ${buyerInfo.name}`}</span>
      </div>
      {buyerInfo.profileImage ? (
        <>
          <span>avatar:</span>
          <img src={buyerInfo.profileImage} alt="a cat preview" />
        </>
      ) : null}
      <span className="cat-price-span">{`${catInfo.price}$`}</span>
      {buyerInfo.isDeliveryNeeded ? <span>🚚</span> : <span>🏃</span>}
      {buyerInfo.notificationConfirmation === FormUserAnswersEnum.positive ? <span>✉️</span> : null}
      <button
        type="button"
        className="order-cancel-button"
        onClick={() => orderRemove(id)}
        data-testid="app-order-remove-button"
      >
        CANCEL
      </button>
    </div>
  );
};
