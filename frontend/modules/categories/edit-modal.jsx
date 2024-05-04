import React, { forwardRef, useEffect } from "react";

import Controller from "./controllers/edit-modal-controller";

import Modal from "../../components/new-modal/modal";
import ModalBody from "../../components/new-modal/modal-body";
import ModalFooter from "../../components/new-modal/modal-footer";
import ModalHeading, { TitleLabelModal } from "../../components/new-modal/modal-header";

import Input from "../../components/inputs/input";
import TextArea from "../../components/inputs/textarea";
import BtnDefault from "../../components/buttons/default";
import BtnSuccess from "../../components/buttons/success";
import FormLabel from "../../components/labels/form-label";
import AsyncModal from "../../components/modal/async-modal";


const EditModal = forwardRef(({ }, ref) => {
	const { cancelModal, closeModal, state, modalProps, modalResolvers } = AsyncModal(ref);
	const { loading, modelData, find, onSave, setProperty } = Controller({ ...modalResolvers, ...modalProps, modal: { closeModal } });

	useEffect(() => {
		if (state.opened) find();
	}, [state.opened]);

	if (!state.opened) return null;

	return <Modal isStatic cancelModal={cancelModal} opened={state?.opened} loading={loading}>
		<ModalHeading>
			<TitleLabelModal>
				{`Editar categoria #${modelData.id}`}
			</TitleLabelModal>
		</ModalHeading>

		<ModalBody>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<FormLabel isRequired={!modelData.name}>Título</FormLabel>
					<Input name='name' placeholder='Insira um título'
						onChangeValue={value => setProperty('name', value)}
						defaultValue={modelData?.name || ''}
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
