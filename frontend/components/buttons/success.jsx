import React from 'react';
import BtnBase from './base';

const BtnSuccess = ({ children, className = '', isLoading = false, onClick = () => { }, ...props }) => {
    return <BtnBase {...props} isLoading={isLoading} onClick={onClick} className={`${className} bg-emerald-500 hover:bg-emerald-600 text-white default-focus-dark`}>
        {children}
    </BtnBase>
}

export default BtnSuccess;

