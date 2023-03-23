import React, { Component } from 'react';

import { IOrderObject } from 'types/types';
import './OrderItem.scss';

interface Props extends IOrderObject {
  orderRemove: (id: number) => void;
}

export class OrderItem extends Component<Props> {
  render() {
    const { buyerInfo, catInfo } = this.props;
    return (
      <div className="order-item-wrapper" data-testid="app-order-item">
        <span>{catInfo.name}</span>
      </div>
    );
  }
}
