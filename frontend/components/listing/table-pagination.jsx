import React from "react";

import BtnDefault from "../buttons/default";
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronDoubleRightIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const RenderPageLinks = ({
	links = [],
	currentPage,

	setSelectedParams = () => { }
}) => {

	return links.map((link, index) => {
		if (index == 0 || index == links.length - 1) return null;

		let pageNumberFN = currentPage == index ? undefined : () => setSelectedParams({ page: index });

		return <BtnDefault key={index} onClick={pageNumberFN}
			className={link.active ? "bg-gray-700" : ""}>
			<span>{link.label}</span>
		</BtnDefault>
	})
}

const TablePagination = ({
	pagination = {},

	selectedParams = {},
	setSelectedParams = () => { },
}) => {
	let currentPage = pagination.current_page;

	let firstPage = currentPage !== 1 ? () => setSelectedParams({ page: 1 }) : undefined;
	let prevPage = currentPage !== 1 ? () => setSelectedParams({ page: currentPage - 1 }) : undefined;
	let nextPage = pagination.next_page_url ? () => setSelectedParams({ page: currentPage + 1 }) : undefined;
	let lastPage = currentPage !== pagination.last_page ? () => setSelectedParams({ page: pagination.last_page }) : undefined;

	return <div className="btn-group flex flex-row">
		<BtnDefault onClick={firstPage} className={!firstPage ? 'cursor-not-allowed bg-gray-400' : ''}>
			<ChevronDoubleLeftIcon className="w-5 h-5" />
		</BtnDefault>
		<BtnDefault onClick={prevPage} className={!prevPage ? 'cursor-not-allowed bg-gray-400' : ''}>
			<ChevronLeftIcon className="w-5 h-5" />
		</BtnDefault>

		<RenderPageLinks
			currentPage={currentPage}
			links={pagination.links}

			selectedParams={selectedParams}
			setSelectedParams={setSelectedParams}
		/>

		<BtnDefault onClick={nextPage} className={!nextPage ? 'cursor-not-allowed bg-gray-400' : ''}>
			<ChevronRightIcon className="w-5 h-5" />
		</BtnDefault>
		<BtnDefault onClick={lastPage} className={!lastPage ? 'cursor-not-allowed bg-gray-400' : ''}>
			<ChevronDoubleRightIcon className="w-5 h-5" />
		</BtnDefault>
	</div>
}

export default TablePagination;
