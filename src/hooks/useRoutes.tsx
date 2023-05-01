import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainPage } from '../pages/MainPage/MainPage';
import { PurchasesPage } from '../pages/PurchasesPage/PurchasesPage';
import { AboutUsPage } from '../pages/AboutUsPage/AboutUsPage';
import { Page404 } from '../pages/Page404/Page404';

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/purchases" element={<PurchasesPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
