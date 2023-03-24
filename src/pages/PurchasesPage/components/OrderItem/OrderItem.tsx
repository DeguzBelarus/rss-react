import React, { Component } from 'react';

import { IOrderObject } from 'types/types';
import './OrderItem.scss';

interface Props extends IOrderObject {
  orderRemove: (id: number) => void;
}

export class OrderItem extends Component<Props> {
  render() {
    const { buyerInfo, catInfo, id, orderRemove } = this.props;
    return (
      <div className="order-item-wrapper" data-testid="app-order-item">
        <span>{`#${id}`}</span>
        <span>{catInfo.name}</span>
        <img src={catInfo.imageSrc} alt="a cat preview" />
        <div className="order-info-container">
          <span>{`date: ${buyerInfo.purchaseDate}`}</span>
          <span>{`owner: ${buyerInfo.name}`}</span>
        </div>
        <span className="cat-price-span">{`${catInfo.price}$`}</span>
        {buyerInfo.isDeliveryNeeded === 'yes' ? <span>🚚</span> : <span>🏃</span>}
        {buyerInfo.notificationConfirmation === 'yes' ? <span>✉️</span> : null}
        <button type="button" className="order-cancel-button" onClick={() => orderRemove(id)}>
          CANCEL
        </button>
      </div>
    );
  }
}
