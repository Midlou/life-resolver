import React from 'react';
import BtnBase from './base';

const BtnPrimary = ({ children, className = '', isLoading = false, onClick = () => { }, ...props }) => {
    return <BtnBase {...props} isLoading={isLoading} onClick={onClick} className={`${className} bg-indigo-500 hover:bg-indigo-600 text-white default-focus-dark`}>
        {children}
    </BtnBase>
}

export default BtnPrimary;

