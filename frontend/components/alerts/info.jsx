import React from 'react';
import AlertBase from './base';

const AlertInfo = ({ children, className = '', ...props }) => {
    return <AlertBase className={`${className} text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800`} {...props}>
        {children}
    </AlertBase>
}

export default AlertInfo;
