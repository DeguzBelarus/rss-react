import React, { FC } from 'react';
import { useAppSelector } from 'redux/hooks';

import { getFormMessage } from 'redux/mainSlice';
import './FormMessage.scss';

export const FormMessage: FC = () => {
  const formMessage = useAppSelector(getFormMessage);
  return (
    <div className="form-message-wrapper">
      <span
        className={
          formMessage.messageType === 'success' ? 'message-span' : 'message-span error-message'
        }
      >
        {formMessage.messageText}
      </span>
    </div>
  );
};
