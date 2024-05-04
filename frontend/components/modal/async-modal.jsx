import { useEffect, useImperativeHandle, useState } from "react";
import { copy_value } from "../../shared/helpers/general";

export default function AsyncModal(ref) {
	const [state, setState] = useState({});
	const [promise, setPromise] = useState({});

	useEffect(() => {
		let { opened, closing, canceling } = state;
		let { resolve, reject } = promise;
		if (opened || closing || canceling || !resolve || !reject) return;
		setState({ opened: true });
	}, [promise.resolve, promise.reject]);

	useEffect(() => {
		if (!state.closing) return;
		promise.resolve(copy_value(state.property));
		setPromise({});
		setState({});
	}, [state.closing]);

	useEffect(() => {
		if (!state.canceling) return;
		promise.reject(false);
		setPromise({});
		setState({});
	}, [state.canceling]);

	function initModal(props) {
		return new Promise((resolve, reject) => {
			performResolvers(props?.resolvers)
				.then((resolvers) => setPromise({
					resolve,
					reject,
					props,
					resolvers
				}));
		});
	}

	async function performResolvers(resolvers) {
		if (!resolvers) return Promise.resolve({});
		return new Promise(async (resolve, reject) => {
			let keys = Object.keys(resolvers);

			let resolved = {};
			for (let key of keys) {
				resolved[key] = await resolvers[key]();
			}

			return resolve(resolved);
		});
	}

	function closeModal(value) {
		setState({
			property: value,
			opened: false,
			closing: true
		});
	}

	function cancelModal() {
		setState({
			opened: false,
			closing: false,
			canceling: true
		});
	}

	useImperativeHandle(ref, () => ({
		present: (props) => initModal(props)
	}));

	return {
		cancelModal,
		closeModal,
		state,
		modalResolvers: promise?.resolvers,
		modalProps: promise?.props,
	};
}
