import { useEffect, useRef, useState } from "react";

import Service from "../service";
import { DateTime } from "luxon";

const service = new Service();

function IndexController(props) {
	const filterModalRef = useRef(null);

	const [loading, setLoading] = useState(true);
	const [listingData, setListingdata] = useState({});
	const [selectedFilters, setSelectedFilters] = useState({
		date_field: 'transacted_at',
		date_start: DateTime.now().startOf('month').toJSDate(),
		date_end: DateTime.now().endOf('month').toJSDate()
	});

	useEffect(() => getData(), [selectedFilters]);

	async function getData(params = {}) {
		setLoading(true);

		let paramsToSend = {
			filter: selectedFilters,
			...params
		};

		return service.query(paramsToSend)
			.then((res) => setListingdata(res))
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

	return {
		loading,
		listingData,
		filterModalRef,
		selectedFilters,
		getData,
		openFilterModal,
		setSelectedFilters,
	};
}

export default IndexController;
