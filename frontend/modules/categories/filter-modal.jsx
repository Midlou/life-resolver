import React, { forwardRef } from "react";

import Modal from "../../components/new-modal/modal";
import AsyncModal from "../../components/modal/async-modal";
import ModalBody from "../../components/new-modal/modal-body";
import ModalFooter from "../../components/new-modal/modal-footer";
import ModalHeading, { TitleLabelModal } from "../../components/new-modal/modal-header";

import BtnSuccess from "../../components/buttons/success";
import BtnDefault from "../../components/buttons/default";
import FormLabel from "../../components/labels/form-label";
import FilterController from "./controllers/filter-modal-controller";

const FilterModal = ({ }, ref) => {
	const { closeModal, cancelModal, state, modalProps, modalResolvers } = AsyncModal(ref);
	const { selectedFilters, onSave, setProperty } = FilterController({ ...modalResolvers, ...modalProps, modal: { closeModal } });

	if (!state.opened) return null;

	return <Modal isStatic cancelModal={cancelModal} opened={state?.opened}>
		<ModalHeading>
			<TitleLabelModal>Filtros</TitleLabelModal>
		</ModalHeading>

		<ModalBody>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

			</div>
		</ModalBody>

		<ModalFooter className="flex flex-row items-center justify-between">
			<BtnSuccess onClick={onSave} type="button">
				Salvar
			</BtnSuccess>
			<BtnDefault onClick={cancelModal} type="button">
				Fechar
			</BtnDefault>
		</ModalFooter>
	</Modal>
}

export default forwardRef(FilterModal);
