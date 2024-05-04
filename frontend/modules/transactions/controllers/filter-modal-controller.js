import { useState } from "react";
import _ from "lodash";

function FilterController({ modal, selectedFilters }) {
	const [filters, setFilters] = useState(selectedFilters);

	const setProperty = (key, value) => {
		setFilters(state => ({ ...state, [key]: value }));
	}

	async function onSave() {
		sanitize();

		modal.closeModal(filters);
		setFilters({});
	}

	function sanitize() {
		setFilters(state => filters);
	}

	return { selectedFilters, onSave, setProperty };
}

export default FilterController;
