import { useState } from "react";
import { toast } from "react-toastify";
import { parseValidationErrors, validate } from "../../../shared/helpers/validation";
import Service from "../service";

const ServiceClass = new Service();

function EditModalController({ item, modal, ...props }) {
	const [loading, setLoading] = useState(true);
	const [modelData, setModelData] = useState({});
	const [files, setFiles] = useState([]);

	async function find() {
		setModelData({});
		setLoading(true);
		return ServiceClass.find(item?.id)
			.then((res) => {
				setFiles(res.files);
				setModelData(res);
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
					modal.closeModal(res);
				}).catch((err) => {
					console.error(err);
					let errors = parseValidationErrors(err);
					toast.error((errors && errors[0]) || "Algo não funcionou bem.");
				});
		} catch (validationErrors) {
			toast.error(_.head(validationErrors));
		}
	}

	return {
		files,
		loading,
		modelData,
		find,
		onSave,
		setProperty,
	};
}

export default EditModalController;
