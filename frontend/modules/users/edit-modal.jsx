import React, { forwardRef, useEffect } from "react";

import Input from "../../components/inputs/input";
import BtnDefault from "../../components/buttons/default";
import BtnSuccess from "../../components/buttons/success";
import FormLabel from "../../components/labels/form-label";
import AsyncModal from "../../components/modal/async-modal";

import Controller from "./controllers/edit-modal.controller";
import Modal from "../../components/new-modal/modal";
import ModalHeading, { TitleLabelModal } from "../../components/new-modal/modal-header";
import ModalBody from "../../components/new-modal/modal-body";
import ModalFooter from "../../components/new-modal/modal-footer";

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
				{`Editar usuário #${modelData.id}`}
			</TitleLabelModal>
		</ModalHeading>

		<ModalBody>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<FormLabel isRequired={!modelData.name}>Nome</FormLabel>
					<Input name='name' placeholder='Insira um nome'
						onChangeValue={value => setProperty('name', value)}
						defaultValue={modelData.name || ''}
					/>
				</div>
				<div>
					<FormLabel isRequired={!modelData.email}>E-mail</FormLabel>
					<Input name='email' placeholder='Insira um e-mail'
						onChangeValue={value => setProperty('email', value)}
						defaultValue={modelData.email || ''}
					/>
				</div>
			</div>

			<hr className='my-8' />

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<div>
					<FormLabel>Senha</FormLabel>
					<Input type='password' name='password' placeholder='Insira uma senha'
						onChangeValue={value => setProperty('password', value)}
					/>
				</div>
				<div>
					<FormLabel>Confirme senha</FormLabel>
					<Input type='password' name='password_confirmation' placeholder='Confirme a senha'
						onChangeValue={value => setProperty('password_confirmation', value)}
					/>
				</div>
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
