import React from 'react';
import AlertBase from './base';

const AlertDanger = ({ children, className = '', ...props }) => {
    return <AlertBase className={`${className} text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800`} {...props}>
        {children}
    </AlertBase>
}

export default AlertDanger;
