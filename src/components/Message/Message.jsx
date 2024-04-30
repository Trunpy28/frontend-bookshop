import React from 'react';
import { Button, message, Space } from 'antd';

export const success = (mess = 'Success') => {
    message.success(mess);
}

export const error = (mess = 'Error') => {
    message.error(mess);
}

export const warning = (mess = 'Warning') => {
    message.warning(mess);
}