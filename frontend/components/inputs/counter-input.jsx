import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

import DecimalInput from './decimal-input';

const CounterBtn = ({ children, onBtnClick = () => { } }) => {
	return <button className='font-bold px-2 rounded ring-offset-2 bg-gray-500 hover:bg-gray-600 text-white default-focus-dark' onClick={onBtnClick}>
		{children}
	</button>
}

const CounterInput = ({ defaultValue = 0, onChangeValue = (value) => { }, ...props }) => {
	const [count, setCount] = useState(defaultValue)

	function inputChange(value, isSum = false) {
		let newValue = isSum
			? count + value
			: value;

		const { isAllowed } = props;
		if (isAllowed && !isAllowed({ value: newValue })) {
			return;
		}

		setCount(newValue);
		onChangeValue(newValue);
	}

	return <div className='btn-group flex flex-row'>
		{/* <button className='font-bold py-2 px-2 rounded ring-offset-2 bg-gray-500 hover:bg-gray-600 text-white default-focus-dark' onClick={() => inputChange(-1, true)}>
			<MinusIcon className="h-4 w-4" />
		</button> */}
		<CounterBtn onBtnClick={() => inputChange(-1, true)}>
			<MinusIcon className="h-4 w-4" />
		</CounterBtn>
		{/* <BtnDefault onClick={() => inputChange(-1, true)}>
			<MinusIcon className="h-4 w-4" />
		</BtnDefault> */}
		<DecimalInput {...props} value={count} className="text-center text-lg min-w-[48px] max-w-[25%] py-1"
			onChangeValue={(value) => inputChange(value)} />
		{/* <BtnPrimary onClick={() => inputChange(1, true)}>
			<PlusIcon className="h-4 w-4" />
		</BtnPrimary> */}
		<CounterBtn onBtnClick={() => inputChange(1, true)}>
			<PlusIcon className="h-4 w-4" />
		</CounterBtn>

		{/* <button className='font-bold px-2 rounded ring-offset-2 bg-gray-500 hover:bg-gray-600 text-white default-focus-dark' onClick={() => inputChange(1, true)}>
			<PlusIcon className="h-4 w-4" />
		</button> */}
	</div>
}

export default CounterInput;

