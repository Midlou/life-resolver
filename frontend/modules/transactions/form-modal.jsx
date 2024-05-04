import React, { forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";

import CategoryService from "../categories/service";
// import Controller from "./controllers/edit-modal.controller";

import Modal from "../../components/new-modal/modal";
import AsyncModal from "../../components/modal/async-modal";
import ModalBody from "../../components/new-modal/modal-body";
import ModalFooter from "../../components/new-modal/modal-footer";
import ModalHeading, { TitleLabelModal } from "../../components/new-modal/modal-header";

import TextArea from "../../components/inputs/textarea";
import BtnDefault from "../../components/buttons/default";
import BtnSuccess from "../../components/buttons/success";
import FormLabel from "../../components/labels/form-label";
import SearchInput from "../../components/inputs/search-input";
import DecimalInput from "../../components/inputs/decimal-input";

const EditModal = forwardRef(({ controller }, ref) => {
	const { cancelModal, closeModal, state, modalProps, modalResolvers } = AsyncModal(ref);

	// const Controller = modalResolvers.controller;

	const { loading, modelData, find, onSave, setProperty } = controller({ ...modalResolvers, ...modalProps, modal: { closeModal } });

	useEffect(() => {
		if (state.opened && find) find();
	}, [state.opened]);

	if (!state.opened) return null;

	return <Modal isStatic cancelModal={cancelModal} opened={state?.opened} loading={loading}>
		<ModalHeading>
			<TitleLabelModal>
				{
					(modelData.id)
						? (`Editar transação #${modelData.id}`)
						: (`Criar produto`)
				}
			</TitleLabelModal>
		</ModalHeading>

		<ModalBody>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<FormLabel>Valor</FormLabel>
					<DecimalInput
						prefix={'R$'}
						value={modelData.amount || 0.00}
						onChangeText={(value) => setProperty('amount', value)}
						className={`text-end w-full ${modelData.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}
					/>
				</div>
				<div>
					<FormLabel isRequired={!modelData.transacted_at}>Data</FormLabel>
					<DatePicker
						selected={modelData.transacted_at}
						onChange={(date) => setProperty('transacted_at', date)}
						selectsStart
						dateFormat="dd/MM/yyyy"
						className="text-end border border-gray-300 rounded py-2 px-3 text-slate-600 w-full"
					/>
				</div>
				<div>
					<FormLabel>Categoria</FormLabel>
					<SearchInput
						Service={CategoryService}
						title='Selecione uma categoria'
						onSelect={value => setProperty('category', value)}
						defaultValue={modelData.category || ''}
					/>
				</div>
			</div>
			<div className="mt-4">
				<FormLabel>Descrição</FormLabel>
				<TextArea
					onChangeValue={value => setProperty('description', value)}
					defaultValue={modelData?.description || ''}
				/>
			</div>
		</ModalBody>

		<ModalFooter className="flex flex-row items-center justify-end gap-4">
			<BtnSuccess onClick={onSave} type="button">
				Salvar
			</BtnSuccess>
			<BtnDefault onClick={cancelModal} type="button">
				Fechar
			</BtnDefault>
		</ModalFooter>
	</Modal>
});

export default EditModal;
