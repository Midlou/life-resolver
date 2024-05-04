import React from 'react';
import AlertBase from './base';

const AlertWarning = ({ children, className = '', ...props }) => {
    return <AlertBase className={`${className} text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800`} {...props}>
        {children}
    </AlertBase>
}

export default AlertWarning;
