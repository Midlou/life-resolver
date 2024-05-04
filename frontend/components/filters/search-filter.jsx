import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

import If from '../conditionals/if';
import Input from '../inputs/input';
import useFirstRender from '../../shared/use-first-render';

const SearchFilter = function ({ setState = () => { } }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [isClearChange, setIsClearChange] = useState(false);

	const { isFirstRender } = useFirstRender();

	function clearSearch() {
		setSearchTerm('');
		setIsClearChange(true);
	}

	useEffect(() => {
		if (isFirstRender) return;

		let timeToWait = 500
		if (isClearChange) {
			timeToWait = 0;
			setIsClearChange(false);
		}

		const delayDebounceFn = setTimeout(() => {
			setState((state) => ({ ...state, search: searchTerm }));
		}, timeToWait)

		return () => clearTimeout(delayDebounceFn)
	}, [searchTerm])

	return <div className='relative'>
		<Input placeholder='Buscar' value={searchTerm} onChangeValue={(value) => setSearchTerm(value)} />
		<If render={searchTerm} body={() => {
			return <XMarkIcon className='w-6 h-6 text-gray-500 cursor-pointer absolute top-[25%] right-3 bg-white' onClick={() => clearSearch()} />
		}} />
	</div>
}

export default SearchFilter;
