import React from 'react';
import BtnBase from './base';

const BtnDefault = ({ children, className = '', isLoading = false, onClick = () => { }, ...props }) => {
    return <BtnBase {...props} isLoading={isLoading} onClick={onClick} className={`${className} bg-gray-500 hover:bg-gray-600 text-white default-focus-dark`}>
        {children}
    </BtnBase>
}

export default BtnDefault;

