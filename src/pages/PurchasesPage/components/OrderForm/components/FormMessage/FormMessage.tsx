import React, { FC } from 'react';
import { FormMessageType } from 'types/types';

import './FormMessage.scss';

interface Props {
  message: string;
  messageType: FormMessageType;
}

export const FormMessage: FC<Props> = ({ message, messageType }) => {
  return (
    <div className="form-message-wrapper">
      <span className={messageType === 'success' ? 'message-span' : 'message-span error-message'}>
        {message}
      </span>
    </div>
  );
};
