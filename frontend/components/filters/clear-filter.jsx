import React, { useState } from 'react';
import _ from 'lodash';
import { XMarkIcon } from '@heroicons/react/24/solid';

import BtnDanger from '../buttons/danger';
import If from '../conditionals/if';

const ClearFilter = function ({ state, setState = () => { }, customExceptKeys = [] }) {
	const [exceptKeys, setExceptKeys] = useState([...customExceptKeys, 'search', 'only_trashed']);

	function performClear() {
		setState(oldState => {
			return _.pick(oldState, exceptKeys);
		})
	}

	function shouldShow() {
		let withoutExcepts = _.omitBy(state, (item, index) => {
			if (item === null || _.isEmpty(item)) return true;

			return _.includes(exceptKeys, index);
		});

		return !_.isEmpty(withoutExcepts);
	}

	return <If render={shouldShow()} body={() => {

		return <BtnDanger onClick={() => performClear()}>

			<XMarkIcon className='w-6 h-6' />

		</BtnDanger>

	}} />
}

export default ClearFilter;
