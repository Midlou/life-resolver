import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { parseValidationErrors, validate } from '../../../shared/helpers/validation';

import Service from "../service";

const ServiceClass = new Service();

function registerController(props) {
	const [loading, setLoading] = useState(false);
	const [credentials, setCredentials] = useState({
		document: ""
	});

	const setProperty = (key, value) => {
		setCredentials(state => ({ ...state, [key]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();

		setLoading(true);
		try {
			validate(credentials, ServiceClass.getValidation());

			let sanitized = ServiceClass.sanitize(credentials);

			let response = await ServiceClass.register(sanitized)
				.then((res) => {
					Inertia.get('/');
				}).catch((err) => {
					let errors = parseValidationErrors(err);
					toast.error((errors && errors[0]) || "Algo não funcionou bem.");
				});
		} catch (validationErrors) {
			console.error(validationErrors);
			toast.error(_.head(validationErrors));
		} finally {
			setLoading(false);
		}
	}

	return {
		loading,
		credentials,
		setProperty,
		handleSubmit
	};
}

export default registerController;
