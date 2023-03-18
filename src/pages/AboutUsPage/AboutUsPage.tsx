import React, { Component } from 'react';

import { Header } from 'components/Header/Header';
import './AboutUsPage.scss';

export class AboutUsPage extends Component {
  render() {
    return (
      <>
        <Header origin="about-page" />
        <div className="about-us-page-wrapper" data-testid="app-about-us-page">
          <h1>About Us</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio error cumque corrupti
            alias aliquam impedit, veritatis accusamus sequi. Itaque, dolorum quis vel labore
            deserunt nemo ad ducimus sunt saepe maiores!
          </p>
        </div>
      </>
    );
  }
}
