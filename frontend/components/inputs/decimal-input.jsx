import React, { useEffect, useState } from 'react';

import { DecimalMask } from '../../shared/decimal-mask';
import useFirstRender from '../../shared/use-first-render';

const DecimalInput = ({ type = 'text', name = '', allowNegative = true, prefix = '', sufix = '', className = '', onChangeText = (text) => { }, ...props }) => {

	const [values, setValues] = useState({ raw: '', formatted: props?.value || '' });

	let { isFirstRender } = useFirstRender();

	useEffect(() => {
		if (!isFirstRender) return;
		let attributes = getAttributes(values.formatted);

		setValues({ ...attributes });
	}, []);

	function getAttributes(value) {
		if (typeof value !== 'string') {
			let decimal = value.toFixed(2).replace('.', ',');

			value = String(decimal);
		}

		let hasNegativeSymbol = new RegExp('-').test(value);
		let hasDoubleNegative = new RegExp('(-)(.)*(-)').test(value);

		let shouldAddNegative = allowNegative && hasNegativeSymbol && !hasDoubleNegative;

		value = value.replace(/\D/g, "");

		let detectedAmount = (new DecimalMask()).detectAmount(value);

		let parsedNumber = 0;
		if (detectedAmount) parsedNumber = Number.parseFloat(detectedAmount.replace(/[\.]/g, '').replace(/[,]/g, '.'));

		let formatted = (shouldAddNegative ? `-${detectedAmount}` : detectedAmount) || null;

		if (formatted && prefix) formatted =`${prefix} ` + formatted;
		if (formatted && sufix) formatted = formatted ` ${sufix}`;

		return {
			raw: shouldAddNegative ? `-${value}` : value,
			parsed: shouldAddNegative ? -parsedNumber : parsedNumber,
			formatted
		};
	}

	function handleChange(value) {
		let attributes = getAttributes(value);

		setValues({ ...attributes });
		onChangeText(attributes.parsed);
	}

	delete props.default;

	return <input {...{ type, name, ...props }}
		value={values?.formatted || ''}
		onChange={({ target }) => handleChange(target.value)}
		className={`${className} border border-gray-300 rounded py-2 px-3 text-slate-600`}
	/>
}

export default DecimalInput;

// import React from 'react';
// import { NumberFormatBase } from 'react-number-format';

// const CurrencyInput = ({ onChangeValue = (value) => { }, className = '', ...props }) => {
// 	const currencyFormatter = (value) => {
// 		if (!Number(value)) return "";

// 		const amount = new Intl.NumberFormat("pt-BR", {
// 			style: "currency",
// 			currency: "BRL"
// 		}).format(value / 100);

// 		return `${amount}`;
// 	}

// 	return <NumberFormatBase {...props}
// 		onValueChange={(values) => onChangeValue(values.floatValue)}
// 		className={`${className} border border-gray-300 rounded text-slate-600`}
// 		format={currencyFormatter}
// 	/>;
// }

// export default CurrencyInput;

