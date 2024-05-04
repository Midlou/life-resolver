import _ from "lodash";
import { useState } from "react";
import { toast } from "react-toastify";
import { parseValidationErrors, validate } from "../../../shared/helpers/validation";

import Service from "../service";

const ServiceClass = new Service();

function CreateModalController({ modal, ...props }) {
	const [loading, setLoading] = useState(false);
	const [modelData, setModelData] = useState({});

	const setProperty = (key, value) => {
		setModelData(state => ({ ...state, [key]: value }));
	}

	async function onSave() {
		setLoading(true);
		try {
			validate(modelData, ServiceClass.getValidation());
			let sanitized = ServiceClass.sanitize(modelData);

			let response = await ServiceClass.store(sanitized)
				.then((res) => {
					toast.success("Item criado com sucesso.");
					modal.closeModal(res);
				}).catch((err) => {
					console.error(err);
					let errors = parseValidationErrors(err);
					toast.error((errors && errors[0]) || "Algo não funcionou bem.");
				}).finally((res) => setLoading(false));
		} catch (err) {
			console.error(err);

			toast.error(_.head(err));
			setLoading(false)
		}
	}


	return {
		modelData,
		onSave,
		setProperty,
	};
}

export default CreateModalController;
