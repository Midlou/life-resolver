import React from 'react';
import BtnBase from './base';

const BtnDanger = ({ children, className = '', isLoading = false, onClick = () => { }, ...props }) => {
    return <BtnBase {...props} isLoading={isLoading} onClick={onClick} className={`${className} bg-red-500 hover:bg-red-600 text-white default-focus-dark`}>
        {children}
    </BtnBase>
}

export default BtnDanger;

