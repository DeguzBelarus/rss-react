import React, { Component } from 'react';

import { Header } from 'components/Header/Header';
import './MainPage.scss';

export class MainPage extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="main-page-wrapper">MainPage works!</div>
      </>
    );
  }
}
