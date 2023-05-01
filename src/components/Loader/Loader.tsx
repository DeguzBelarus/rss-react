import { FC } from 'react';

import { LoaderOriginType } from '../../types/types';
import './Loader.scss';

interface Props {
  origin: LoaderOriginType;
}

export const Loader: FC<Props> = ({ origin }) => {
  return (
    <div className={origin === 'main-page' ? 'loader-wrapper' : 'loader-wrapper mini'}>
      <span className="loading-span">LOADING</span>
    </div>
  );
};
