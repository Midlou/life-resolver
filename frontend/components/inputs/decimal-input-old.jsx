import React from 'react';
import { NumericFormat } from 'react-number-format';

const DecimalInput = ({ type = 'text', name = '', className = '', mask = '', onChangeValue = (value) => { }, ...props }) => {
    return <NumericFormat {...{ type, name, ...props }}
        decimalSeparator=","
        className={`${className} border border-gray-300 rounded text-slate-600`}
        onValueChange={(values) => onChangeValue(values.floatValue)}
        allowedDecimalSeparators={[',']}
    />
}

export default DecimalInput;

