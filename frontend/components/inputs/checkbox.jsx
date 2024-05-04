import React from "react";

const Checkbox = ({ defaultChecked = false, onChange = (value) => { }, label = '' }) => {
    return <label className="inline-flex items-center">
        <input type="checkbox"
            className="form-checkbox h-5 w-5 text-green-600 rounded border border-gray-300"
            onChange={({ target }) => onChange(target?.checked)}
            defaultChecked={defaultChecked}
        />
        <span className="ml-2 text-default">{label}</span>
    </label>
}

export default Checkbox;
