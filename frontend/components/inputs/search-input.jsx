import _ from 'lodash';
import React, { forwardRef, useState, useEffect, useRef } from 'react';

import Modal from '../new-modal/modal';
import ModalBody from '../new-modal/modal-body';
import ModalFooter from '../new-modal/modal-footer';
import AsyncModal from "../../components/modal/async-modal";
import ModalHeading, { TitleLabelModal } from '../new-modal/modal-header';

import Input from './input';
import If from '../conditionals/if';
import BtnSuccess from '../buttons/success';
import BtnDefault from '../buttons/default';
import { CheckIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ModalContent = forwardRef(({
	Service = null,
	title = '',
	multiple = false,
	descriptionFN,
	accessor
}, ref) => {
	const [loading, setLoading] = useState(false);
	const [resource, setResource] = useState(null);
	const [searchTerm, setSearchTerm] = useState('')

	const { cancelModal, closeModal, state } = AsyncModal(ref);

	let service = Service && (new Service);


	useEffect(() => {
		if (!searchTerm) return;

		const delayDebounceFn = setTimeout(() => {
			search(searchTerm);
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [searchTerm])

	useEffect(() => {
		if (!state.opened) return;

		setResource(null)
		setLoading(true)
		service?.query && service.query()
			.then((setResource))
			.finally(() => setLoading(false));
	}, [state.opened]);

	useEffect(() => {
		if (!resource?.data) return;
	}, [resource?.data]);

	if (!state.opened) return null;

	function loadMore() {
		setLoading(true)
		service?.query && service.query({ page: resource?.current_page + 1 })
			.then(res => {
				res.data = [...resource?.data, ...res?.data];
				setResource(res);
			}).finally(() => setLoading(false));
	}

	function search(text) {
		setLoading(true)
		service?.query && service.query({filter: { search: text }})
			.then(setResource)
			.finally(() => setLoading(false));
	}

	function handleSelection(item) {
		if (!multiple) closeModal(item);

		let selectedItemIndex = _.findIndex(resource?.data, { id: item?.id });

		let resourceItem = resource?.data[selectedItemIndex];
		resourceItem.selected = !resourceItem?.selected;

		setResource(state => ({ ...state, data: [...resource.data] }));
		// setResource(resource);
	}

	function onSelectMultiple() {
		let selected = _.filter(resource?.data, { selected: true });
		return closeModal(selected);
	}

	return <Modal isStatic cancelModal={cancelModal} opened={state?.opened} sizeClassname={'xl:max-w-[40%]'} loading={loading}>
		<ModalHeading>
			<TitleLabelModal>{title}</TitleLabelModal>
		</ModalHeading>

		<ModalBody>
			<div className="flex flex-row">
				<Input placeholder='Buscar' onChangeValue={(value) => setSearchTerm(value)} focus='true' />
			</div>
			<div className="flex flex-col my-2">
				{
					resource?.data?.map((item, itemIDX) => <div key={itemIDX + '-res-' + item?.id}
						className={`${item.selected ? 'bg-green-100' : null} flex border-b border-slate-300 py-2 px-2 hover:bg-slate-100 hover:cursor-pointer`}
						onClick={() => handleSelection(item)}>
						{
							multiple
								? <div className='w-6 h-6'>
									{
										item.selected
											? <CheckIcon className='text-green-600' />
											: null
									}
								</div>
								: null
						}
						<span>{item[accessor]}</span>
					</div>)
				}
				{
					resource?.data?.length && resource.next_page_url
						? <BtnSuccess onClick={loadMore}>
							Carregar mais
						</BtnSuccess>
						: null
				}
				{!resource?.data?.length ? <span className='pt-2 text-gray-500 text-center'>Nada encontrado</span> : null}
			</div>

		</ModalBody>

		<ModalFooter className="flex flex-row items-center justify-between">
			<div className="btn-group flex flex-row justify-end">
				<If render={multiple} body={() => {
					return <BtnSuccess onClick={() => onSelectMultiple()} type="button">
						Selecionar
					</BtnSuccess>
				}} />
				<BtnDefault onClick={cancelModal} type="button">
					Fechar
				</BtnDefault>
			</div>
		</ModalFooter>
	</Modal>


});

export default ({
	onSelect = (item) => { },
	title = '',
	descriptionFN = (item) => '',
	Service = null,
	defaultValue = null,
	multiple = false,
	clearAfterSelect = false,
	accessor = 'name',
	...props
}) => {
	const modal = useRef(null);
	const [selected, setSelected] = useState();

	const firstRender = useRef(true);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		onSelect(selected);
	}, [selected]);

	useEffect(() => {
		if (!defaultValue) return;

		setSelected(defaultValue);
	}, [defaultValue]);

	function handleSelect() {
		modal.current?.present()
			.then(setSelected)
			.then(() => {
				if (clearAfterSelect) handleClean();
			});
	}

	function handleClean() {
		setSelected('');

		//   handleSelect();
	}

	return <>
		<ModalContent ref={modal} title={title} accessor={accessor} Service={Service} descriptionFN={descriptionFN} multiple={multiple} />
		<div className='flex flex-row btn-group'>
			<If render={multiple} body={() => {
				return <>
					<Input readOnly defaultValue={
						selected ? (selected[0]?.[accessor]) : ''
					} />
					{
						selected
							? <BtnDefault onClick={handleSelect}>{`+${selected.length}`}</BtnDefault>
							: null
					}
				</>
			}} />

			<If render={!multiple} body={() => {
				return <Input readOnly defaultValue={selected?.[accessor] || ''} />
			}} />

			{!selected ?
				<BtnDefault onClick={handleSelect} className='p-1'>
					<MagnifyingGlassIcon className='w-6 h-6' />
				</BtnDefault> :
				<BtnDefault onClick={handleClean} className='p-1'>
					<XMarkIcon className='w-6 h-6' />
				</BtnDefault>
			}

		</div>
	</>
}
