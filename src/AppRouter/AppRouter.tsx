import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainPage } from 'pages/MainPage/MainPage';
import { AboutUsPage } from 'pages/AboutUsPage/AboutUsPage';
import { Page404 } from 'pages/Page404/Page404';

export class AppRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    );
  }
}
