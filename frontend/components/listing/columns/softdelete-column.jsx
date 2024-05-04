import React, { useRef } from "react";

import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

import SoftdeleteModal from "./modals/softdelete-modal";

const SoftdeleteColumn = ({ item, service, shouldShowRestore = true, shouldShowDelete = true, onConfirm = () => { } }) => {
	const restoreModalRef = useRef(null);
	const destroyModalRef = useRef(null);

	const moduleService = new service();

	function openRestoreModal() {
		restoreModalRef.current?.present({
			resolvers: {
				item: () => item,
				method: () => "restore",
				moduleService: () => moduleService
			}
		}).then((res) => onConfirm());
	}

	function openDestroyModal() {
		destroyModalRef.current?.present({
			resolvers: {
				item: () => item,
				method: () => "destroy",
				moduleService: () => moduleService
			}
		}).then((res) => onConfirm());
	}

	return <>
		<SoftdeleteModal ref={restoreModalRef}
			title={`Restaurar item ${item?.id}`}
			message={`Você está prestes a restaurar o item #${item?.id}, deseja continuar?`}
			confirmBtnLabel={"Restaurar"}
		/>
		<SoftdeleteModal ref={destroyModalRef}
			title={`Deletar item ${item?.id}`}
			message={`Você está prestes a deletar o item #${item?.id}, deseja continuar?`}
			confirmBtnLabel={"Deletar"}
		/>

		<div className="grid justify-items-center">
			{(item.deleted_at && shouldShowRestore) ? (
				<ArrowUturnLeftIcon
					className='w-6 h-6 text-blue-600 m-2 cursor-pointer'
					onClick={() => openRestoreModal()}
				/>
			) : (null)}

			{(!item.deleted_at && shouldShowDelete) ? (
				<TrashIcon
					className='w-6 h-6 text-red-600 m-2 cursor-pointer'
					onClick={() => openDestroyModal()}
				/>
			) : (null)}
		</div>
	</>

}

export default SoftdeleteColumn;
