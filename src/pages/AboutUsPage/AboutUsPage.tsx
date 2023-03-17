import React, { Component } from 'react';

import { Header } from 'components/Header/Header';
import './AboutUsPage.scss';

export class AboutUsPage extends Component {
  render() {
    return (
      <>
        <Header origin="about-page" />
        <div className="about-us-page-wrapper">AboutUsPage works!</div>
      </>
    );
  }
}
