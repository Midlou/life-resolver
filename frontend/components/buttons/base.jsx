import React from 'react';
import LoadingSpinner from '../loading/loading-spinner';

const BtnBase = ({ children, className = '', isLoading = false, onClick = () => { }, ...props }) => {
    return <button {...props} onClick={onClick} className={`${className} font-bold py-2 px-4 rounded ring-offset-2`}>
        { isLoading ? <LoadingSpinner /> : children }
    </button>
}

export default BtnBase;
