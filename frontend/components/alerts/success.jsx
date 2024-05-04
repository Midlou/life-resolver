import React from 'react';
import AlertBase from './base';

const AlertSuccess = ({ children, className = '', ...props }) => {
    return <AlertBase className={`${className} text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800`} {...props}>
        {children}
    </AlertBase>
}

export default AlertSuccess;
