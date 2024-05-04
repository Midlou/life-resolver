import React from 'react';

const Input = ({ type = 'text', name = '', className = '', mask = '', onChangeValue = (value) => { }, ...props }) => {
    return <input {...{ type, name, ...props }}
        onChange={({ target }) => onChangeValue(target.value)}
        className={`${className} border border-gray-300 rounded py-2 px-3 text-slate-600 w-full`}
    />
}

export default Input;

