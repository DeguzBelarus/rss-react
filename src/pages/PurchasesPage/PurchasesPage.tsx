import React, { Component } from 'react';

import { Header } from 'components/Header/Header';
import './PurchasesPage.scss';

export class PurchasesPage extends Component {
  render() {
    return (
      <>
        <Header origin="purchases-page" />
        <div className="purchases-page-wrapper" data-testid="purchases-page">
          <h1>Your purchases</h1>
        </div>
      </>
    );
  }
}
