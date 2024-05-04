import { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import _ from 'lodash';

const defaultVal = { name: 'Selecione' };

const CustomListbox = ({
	data = [],
	className = '',
	disabled = false,
	fieldValue = 'value',
	onSelect = (item) => { },
	defaultValue = defaultVal,
	openUp = false
}, ref) => {
	const [selected, setSelected] = useState(defaultValue || defaultVal);

	useImperativeHandle(ref, () => ({ clearSelected: (onClear) => setSelected({ ...defaultVal, onClear }) }));

	useEffect(() => {
		if (selected?.onClear) {
			selected.onClear();
			return;
		}

		if (selected[fieldValue] || selected[fieldValue] === null || typeof selected[fieldValue] === 'boolean') {
			onSelect(selected[fieldValue]);
		}
	}, [selected]);

	useEffect(() => {
		if (!defaultValue[fieldValue]) return;
		setSelected(defaultValue || defaultVal);
	}, [defaultValue]);

	return <Listbox disabled={disabled} value={selected} onChange={setSelected}>
		<div className="relative">
			<Listbox.Button className={`${disabled ? 'bg-gray-100 text-gray-400' : ''} relative border border-gray-300 rounded py-2 px-3 text-slate-600 overflow-hidden w-full flex justify-between focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent sm:text-sm`}>
				<div className="block truncate my-auto">{selected.name}</div>&nbsp;
				<ChevronUpDownIcon className='w-6 h-6 gray-400' />
			</Listbox.Button>
			<Transition
				as={Fragment}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				className={`absolute mb-1 w-full rounded-md bg-white shadow-lg overflow-auto z-50 ${openUp ? 'bottom-full h-80' : null}`}
			>
				<Listbox.Options className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
					{
						data.map((item, itemIdx) => (
							<Listbox.Option
								key={itemIdx}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
									}`
								}
								value={item}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${selected ? 'font-medium' : 'font-normal'
												}`}
										>
											{item.name}
										</span>
										{selected ? (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						)
						)
					}
				</Listbox.Options>
			</Transition>
		</div>
	</Listbox>
}

export default forwardRef(CustomListbox);
