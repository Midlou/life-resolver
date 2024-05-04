import React from 'react';
import ReactInputMask from 'react-input-mask';

const MaskInput = ({ type = 'text', name = '', className = '', mask = '', alwaysShowMask = false, value = '', onChangeValue = (value) => { }, ...props }) => {
    return <ReactInputMask {...{ type, name, ...props }}
        mask={mask} alwaysShowMask={alwaysShowMask} value={value}
        onChange={({ target }) => onChangeValue(target?.value)}
        className={`${className} border border-gray-300 rounded py-2 px-3 text-slate-600 w-full`}
    />

}

export default MaskInput;

