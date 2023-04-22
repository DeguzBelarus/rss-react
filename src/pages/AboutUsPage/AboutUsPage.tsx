import React, { FC } from 'react';

import { Header } from '../../components/Header/Header';
import './AboutUsPage.scss';

export const AboutUsPage: FC = () => {
  return (
    <>
      <Header origin="about-page" />
      <div className="about-us-page-wrapper" data-testid="app-about-us-page">
        <h1>About Us</h1>
        <p>We are a cattery of various breeds of cats, where you can buy a cat that you like.</p>
      </div>
    </>
  );
};
