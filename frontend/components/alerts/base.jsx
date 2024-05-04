import React from 'react';

const AlertBase = ({ children, className = '', ...props }) => {
    return <div {...props} className={`${className} p-4 mb-4 text-sm rounded-lg`} role="alert">
        {children}
    </div>
}

export default AlertBase;
