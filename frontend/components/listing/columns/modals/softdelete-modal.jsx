import React, { forwardRef } from "react";

import AsyncModal from "../../../modal/async-modal";

import Modal from "../../../new-modal/modal";
import ModalBody from "../../../new-modal/modal-body";
import ModalFooter from "../../../new-modal/modal-footer";
import ModalHeading, { TitleLabelModal } from "../../../new-modal/modal-header";

import BtnDanger from "../../../buttons/danger";
import BtnDefault from "../../../buttons/default";
import BtnPrimary from "../../../buttons/primary";

import SoftdeleteModalController from "./controllers/softdelete-modal-controller";

const SoftdeleteModal = ({ title = '', message = '', confirmBtnLabel = "Confirmar" }, ref) => {
	const { cancelModal, closeModal, state, modalProps, modalResolvers } = AsyncModal(ref);
	const { method, onConfirm } = SoftdeleteModalController({ ...modalResolvers, ...modalProps, modal: { closeModal } });

	return <Modal isStatic cancelModal={cancelModal} sizeClassname={'lg:max-w-[25%]'} opened={state?.opened}>
		<ModalHeading>
			<TitleLabelModal>{title}</TitleLabelModal>
		</ModalHeading>

		<ModalBody>{message}</ModalBody>

		<ModalFooter className="flex flex-row items-center justify-end gap-4">
			{(method == 'restore') ? (
				<BtnPrimary onClick={onConfirm} type="button">
					{confirmBtnLabel}
				</BtnPrimary>
			) : (null)}

			{(method == 'destroy') ? (
				<BtnDanger onClick={onConfirm} type="button">
					{confirmBtnLabel}
				</BtnDanger>
			) : (null)}

			<BtnDefault onClick={cancelModal} type="button">
				Cancelar
			</BtnDefault>
		</ModalFooter>
	</Modal>
};

export default forwardRef(SoftdeleteModal);
