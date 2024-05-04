import React from 'react';

const FileInput = ({ name = '', className = '', onSelectFile = () => { }, ...props }) => {
    const onChange = (target) => {
        let file = target.files[0];
        if (!file) return;

        onSelectFile(target.files[0])
        target.value = null;
    }

    return <input type="file" {...{ name, ...props }}
        onChange={({ target }) => onChange(target)}
        className={`${className} border border-gray-300 rounded py-2 px-3 text-slate-600 w-full`}
    />
}

export default FileInput;

