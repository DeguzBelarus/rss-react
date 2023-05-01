import { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { Header } from '../../components/Header/Header';
import { OrderItem } from './components/OrderItem/OrderItem';
import { IOrderObject } from '../../types/types';
import { OrderForm } from './components/OrderForm/OrderForm';
import { getOrders, setOrders } from '../../redux/mainSlice';
import './PurchasesPage.scss';

export const PurchasesPage: FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(getOrders);
  const [isOrdersLoaded, setIsOrdersLoaded] = useState(false);

  const orderAdd = (order: IOrderObject) => {
    dispatch(setOrders([...orders, order]));
  };

  const orderRemove = (id: number) => {
    dispatch(setOrders(orders.filter((order) => order.id !== id)));
  };

  useEffect(() => {
    if (isOrdersLoaded) {
      localStorage.setItem('rss-save-orders', JSON.stringify(orders));
    }
  }, [orders, isOrdersLoaded]);

  useEffect(() => {
    if (localStorage.getItem('rss-save-orders')) {
      dispatch(setOrders(JSON.parse(localStorage.getItem('rss-save-orders') || '')));
    }
    setIsOrdersLoaded(true);
  }, [dispatch]);
  return (
    <>
      <Header origin="purchases-page" />
      <div className="purchases-page-wrapper" data-testid="purchases-page">
        <h1>Your purchases</h1>
        <OrderForm orderAdd={orderAdd} orders={orders} />
        <div className={orders.length ? 'purchases-container' : 'purchases-container empty'}>
          <h3>{`Cats owned: ${orders.length || '-'} `}😽</h3>
          {orders.length ? (
            orders.map((order) => {
              return (
                <OrderItem
                  buyerInfo={order.buyerInfo}
                  catInfo={order.catInfo}
                  id={order.id}
                  orderRemove={orderRemove}
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
};
