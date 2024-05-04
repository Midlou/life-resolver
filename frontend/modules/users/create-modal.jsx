import React, { forwardRef } from "react";

import Input from "../../components/inputs/input";
import BtnDefault from "../../components/buttons/default";
import BtnSuccess from "../../components/buttons/success";
import FormLabel from "../../components/labels/form-label";
import AsyncModal from "../../components/modal/async-modal";

import Controller from "./controllers/create-modal.controller";
import Modal from "../../components/new-modal/modal";
import ModalHeading, { TitleLabelModal } from "../../components/new-modal/modal-header";
import ModalBody from "../../components/new-modal/modal-body";
import ModalFooter from "../../components/new-modal/modal-footer";

const CreateModal = forwardRef(({ }, ref) => {
	const { closeModal, cancelModal, state } = AsyncModal(ref);
	const { modelData, onSave, setProperty } = Controller({ modal: { closeModal } });

	if (!state.opened) return null;

	return <Modal isStatic cancelModal={cancelModal} opened={state?.opened}>
		<ModalHeading>
			<TitleLabelModal>
				{`Criar usuário`}
			</TitleLabelModal>
		</ModalHeading>

		<ModalBody>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<FormLabel isRequired={!modelData.name}>Nome</FormLabel>
					<Input name='name' placeholder='Insira um nome'
						onChangeValue={value => setProperty('name', value)}
					/>
				</div>
				<div>
					<FormLabel isRequired={!modelData.email}>E-mail</FormLabel>
					<Input name='email' placeholder='Insira um e-mail'
						onChangeValue={value => setProperty('email', value)}
					/>
				</div>
			</div>

			<hr className='my-8' />

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<div>
					<FormLabel isRequired={!modelData.password}>Senha</FormLabel>
					<Input type='password' name='password' placeholder='Insira uma senha'
						onChangeValue={value => setProperty('password', value)}
					/>
				</div>
				<div>
					<FormLabel isRequired={!modelData.password_confirmation}>Confirme senha</FormLabel>
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

export default CreateModal;
