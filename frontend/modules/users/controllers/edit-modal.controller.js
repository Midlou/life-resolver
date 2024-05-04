import { useState } from "react";
import { toast } from "react-toastify";
import modal from "../../../components/new-modal/modal";
import { parseValidationErrors, validate } from "../../../shared/helpers/validation";
import Service from "../service";

const ServiceClass = new Service();

function EditModalController({ modal, item, ...props }) {
	const [loading, setLoading] = useState(true);
	const [modelData, setModelData] = useState({});

	async function find() {
		setModelData({});
		setLoading(true);
		return ServiceClass.find(item?.id)
			.then((res) => {
				setModelData({
					...res,
					phone: res?.contact?.phone ?? '',

					cep: res?.location?.cep ?? '',
					city: res?.location?.city ?? '',
					street: res?.location?.street ?? '',
					district: res?.location?.district ?? '',
					reference: res?.location?.reference ?? '',
					complement: res?.location?.complement ?? '',
					street_number: res?.location?.street_number ?? '',
					federative_unit: res?.location?.federative_unit ?? '',
				});
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
		} catch (err) {
			console.error(err);
			toast.error(_.head(err));
		}
	}

	return { loading, modelData, find, onSave, setProperty };
}

export default EditModalController;
