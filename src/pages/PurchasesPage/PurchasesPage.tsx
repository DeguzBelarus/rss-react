import React, { Component } from 'react';

import { Header } from 'components/Header/Header';
import { OrderItem } from './components/OrderItem/OrderItem';
import { IOrderObject } from 'types/types';
import './PurchasesPage.scss';
import { OrderForm } from './components/OrderForm/OrderForm';

interface State {
  orders: Array<IOrderObject>;
}

export class PurchasesPage extends Component<object, State> {
  state: State = {
    orders: [],
  };

  orderAdd = (order: IOrderObject) => {
    const { orders } = this.state;
    this.setState({
      orders: [...orders, order],
    });
  };

  orderRemove = (id: number) => {
    const { orders } = this.state;
    this.setState({
      orders: orders.filter((order) => order.id !== id),
    });
  };

  render() {
    const { orders } = this.state;
    return (
      <>
        <Header origin="purchases-page" />
        <div className="purchases-page-wrapper" data-testid="purchases-page">
          <h1>Your purchases</h1>
          <OrderForm orderAdd={this.orderAdd} orders={orders} />
          <div className={orders.length ? 'purchases-container' : 'purchases-container empty'}>
            <h3>{`Cats owned: ${orders.length || '-'} `}😽</h3>
            {orders.length ? (
              orders.map((order) => {
                return (
                  <OrderItem
                    buyerInfo={order.buyerInfo}
                    catInfo={order.catInfo}
                    id={order.id}
                    orderRemove={this.orderRemove}
                    key={order.id}
                  />
                );
              })
            ) : (
              <p>There are no orders here...</p>
            )}
          </div>
        </div>
      </>
    );
  }
}
