import { toast } from "react-toastify";

function SoftdeleteModalController({ item, method, moduleService, modal }) {
	async function onConfirm() {
		if (!method || !item || !moduleService) {
			modal.closeModal(false);
		}

		try {
			let response = await moduleService[method](item?.id).then((res) => {
				let message = method == 'restore' ? "Item restaurado com sucesso." : "Item deletado com sucesso."

				toast.success(message);
				modal.closeModal(res);
			}).catch((err) => {
				toast.error(err?.message || "Algo não funcionou bem.");
			});
		} catch (error) {
			//
		}
	}

	return { item, method, onConfirm };
}

export default SoftdeleteModalController;
