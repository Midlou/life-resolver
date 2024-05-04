import React, { forwardRef } from "react";

import AsyncModal from "../../components/modal/async-modal";
import Controller from "./controllers/create-modal-controller";

import Modal from "../../components/new-modal/modal";
import ModalBody from "../../components/new-modal/modal-body";
import ModalFooter from "../../components/new-modal/modal-footer";
import ModalHeading, { TitleLabelModal } from "../../components/new-modal/modal-header";

import Input from "../../components/inputs/input";
import TextArea from "../../components/inputs/textarea";
import BtnSuccess from "../../components/buttons/success";
import BtnDefault from "../../components/buttons/default";
import FormLabel from "../../components/labels/form-label";

const CreateModal = ({ }, ref) => {
	const { closeModal, cancelModal, state } = AsyncModal(ref);
	const { modelData, onSave, setProperty } = Controller({ modal: { closeModal } });

	if (!state.opened) return null;

	return <Modal isStatic cancelModal={cancelModal} opened={state?.opened}>
		<ModalHeading>
			<TitleLabelModal>
				{`Nova categoria`}
			</TitleLabelModal>
		</ModalHeading>

		<ModalBody>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<FormLabel isRequired={!modelData.name}>Título</FormLabel>
					<Input name='name' placeholder='Insira um título'
						onChangeValue={value => setProperty('name', value)}
					/>
				</div>
			</div>
			<div className="mt-4">
				<FormLabel>Descrição</FormLabel>
				<TextArea
					onChangeValue={value => setProperty('description', value)}
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
}

export default forwardRef(CreateModal);
