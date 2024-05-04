import { useState } from "react";
import { toast } from "react-toastify";
import { parseValidationErrors, validate } from "../../../shared/helpers/validation";
import Service from "../service";

const ServiceClass = new Service();

function CreateModalController({ modal, ...props }) {
	const [modelData, setModelData] = useState({});

	const setProperty = (key, value) => {
		setModelData(state => ({ ...state, [key]: value }));
	}

	async function onSave() {
		try {
			let sanitized = ServiceClass.sanitize(modelData);
			validate(sanitized, ServiceClass.getValidation());

			let response = await ServiceClass.store(sanitized)
				.then((res) => {
					toast.success("Item criado com sucesso.");
					modal.closeModal(res);
				}).catch((err) => {
					let errors = parseValidationErrors(err);
					toast.error((errors && errors[0]) || "Algo não funcionou bem.");
				});
		} catch (err) {
			console.error(err);
			toast.error(_.head(err));
		}
	}

	return { modelData, onSave, setProperty };
}

export default CreateModalController;
