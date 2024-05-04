import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { parseValidationErrors, validate } from "../../../shared/helpers/validation";

import Service from "../service";

const ServiceClass = new Service();

function IndexController(props) {
	const [loading, setLoading] = useState(true);
	const [settings, setSettings] = useState({});

	const setProperty = (key, value) => {
		setSettings(state => ({ ...state, [key]: value }));
	}

	useEffect(() => getData(), []);

	async function getData(params = {}) {
		setLoading(true);

		return ServiceClass.query({ all: true })
			.then((settings) => {
				let prepared = {};

				_.map(settings, (setting) => {
					prepared[setting.key] = setting?.value;
				})

				setSettings(prepared)
			})
			.finally(() => setLoading(false));
	}

	async function onSave() {
		setLoading(true);
		try {
			validate(settings, ServiceClass.getValidation());
			let sanitized = ServiceClass.sanitize(settings);

			let response = await ServiceClass.update(sanitized)
				.then((res) => {
					toast.success("Configurações salvas com sucesso.");
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
		loading,
		settings,
		onSave,
		setProperty,
	};
}

export default IndexController;
