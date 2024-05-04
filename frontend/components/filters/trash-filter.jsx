import React from 'react';

import If from '../conditionals/if';
import Checkbox from '../inputs/checkbox';

export const TrashTitle = function ({ state }) {
	return <If render={state.only_trashed} body={() => {
		return <h3 className='text-red-500 mb-4 text-2xl'>
			<b>Itens na lixeira</b>
		</h3>
	}} />
}

export default function TrashFilter({ setState = () => { } }) {
	return <Checkbox label="Lixeira"
		defaultChecked={false}
		onChange={(value) => setState(oldState => ({
			...oldState,
			only_trashed: value
		}))}
	/>
}

