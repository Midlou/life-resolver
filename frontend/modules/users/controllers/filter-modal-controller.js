import { useState } from "react";
import _ from "lodash";

function FilterController({ modal, selectedFilters }) {
	const [filters, setFilters] = useState(selectedFilters);

	const setProperty = (key, value) => {
		setFilters(state => ({ ...state, [key]: value }));
	}

	async function onSave() {
		modal.closeModal(filters);
		setFilters({});
	}

	return { selectedFilters, onSave, setProperty };
}

export default FilterController;
