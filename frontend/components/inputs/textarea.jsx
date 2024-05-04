import React from 'react';

const TextArea = ({ name = '', defaultValue = '', rows = 3, className = '', onChangeValue = (value) => { }, ...props }) => {

    return <div className={className}>
        <textarea {...{ name, ...props }}
            rows={rows}
            defaultValue={defaultValue}
            onChange={({ target }) => onChangeValue(target.value)}
            className='border border-solid border-gray-300 rounded py-2 px-3 text-slate-600 w-full block text-base font-normal bg-white bg-clip-padding transition ease-in-out' />
    </div>
}

export default TextArea;
