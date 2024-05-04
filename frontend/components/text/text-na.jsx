import React from 'react';
import If from '../conditionals/if';

const TextNA = ({ value, children = '', ...props }) => {
	return <>
		<If render={value} body={() => children} />

		<If render={!value} body={() => {
			return <span className='text-gray-400 text-sm'>
				N/A
			</span>
		}} />
	</>
}

export default TextNA;

