import { useState } from "react";
import { toast } from "react-toastify";

import Service from "../service";
import { to_date } from "../../../shared/constants/helpers";
import { parseValidationErrors, validate } from "../../../shared/helpers/validation";

const ServiceClass = new Service();

function EditModalController({ item, modal, ...props }) {
	const [loading, setLoading] = useState(true);
	const [modelData, setModelData] = useState({});

	async function find() {
		if (!item?.id) return;

		setModelData({});
		setLoading(true);
		return ServiceClass.find(item?.id)
			.then((res) => {
				res.transacted_at = to_date(res.transacted_at);

				setModelData(res)
			})
			.finally(() => setLoading(false));
	}

	const setProperty = (key, value) => {
		setModelData(state => ({ ...state, [key]: value }));
	}

	async function onSave() {
		try {
			let sanitized = ServiceClass.sanitize(modelData);
			validate(sanitized, ServiceClass.getValidation());

			let response = await ServiceClass.update(item?.id, sanitized)
				.then((res) => {
					toast.success("Item salvo com sucesso.");
					modal.closeModal();
				}).catch((err) => {
					let errors = parseValidationErrors(err);
					toast.error((errors && errors[0]) || "Algo não funcionou bem.");
				});
		} catch (validationErrors) {
			toast.error(_.head(validationErrors));
		}
	}

	return { loading, find, onSave, modelData, setProperty };
}

export default EditModalController;
