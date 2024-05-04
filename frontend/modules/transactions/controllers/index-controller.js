import { useEffect, useRef, useState } from "react";

import Service from "../service";

const service = new Service();

function IndexController(props) {
	const filterModalRef = useRef(null);
	const createModalRef = useRef(null);
	const editModalRef = useRef(null);

	const [params, setParams] = useState({});

	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState({});
	const [selectedFilters, setSelectedFilters] = useState({});

	useEffect(() => getData(), [selectedFilters, params]);

	async function getData() {
		setLoading(true);

		let paramsToSend = {
			filter: selectedFilters,
			sorting: { "command": "desc", "field": "transacted_at" },
			...params
		};

		return service.query(paramsToSend)
			.then((res) => setPagination(res))
			.finally(() => setLoading(false));
	}

	function openFilterModal() {
		filterModalRef.current?.present({
			resolvers: {
				selectedFilters: () => selectedFilters
			}
		}).then((res) => {
			setSelectedFilters((oldState => ({ ...oldState, ...res })))
		});
	}

	function openCreateModal() {
		createModalRef.current?.present().then((res) => getData());
	}

	function openEditModal(item) {
		editModalRef.current?.present({
			resolvers: { item: () => item }
		}).then((res) => getData());
	}

	return {
		params,
		setParams,

		loading,
		pagination,
		editModalRef,
		filterModalRef,
		createModalRef,
		selectedFilters,
		getData,
		openEditModal,
		openCreateModal,
		openFilterModal,
		setSelectedFilters,
	};
}

export default IndexController;
