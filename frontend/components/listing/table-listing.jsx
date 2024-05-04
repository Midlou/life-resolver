import _ from "lodash";
import React, { useEffect, useState } from "react";

import TableBody from "./table-body";
import TableHead from "./table-head";
import TableLoading from "./table-loading";
import TablePagination from './table-pagination';
import useFirstRender from "../../shared/use-first-render";

const TableListing = ({
	columns = [],
	loading = false,
	pagination = {},
	emptyText = 'Vazio',

	params = {},
	setParams = null,

	onRowClick = (item) => { },
}) => {
	const [selectedParams, setSelectedParams] = useState({});
	const [selectedSorting, setSelectedSorting] = useState({});

	const { isFirstRender } = useFirstRender();

	useEffect(() => {
		if (isFirstRender) return;

		setParams({
			sorting: selectedSorting,
			...selectedParams
		})
	}, [selectedSorting, selectedParams]);

	return <div className={`${loading ? 'disabled' : ''} overflow-auto default-scrollbar`}>
		<table className="w-full">
			{pagination?.data ? (<>
				<TableHead
					loading={loading}

					columns={columns}
					selectedSorting={selectedSorting}
					setSelectedSorting={setSelectedSorting}
				/>
				<TableBody
					loading={loading}

					columns={columns}
					emptyText={emptyText}
					onRowClick={onRowClick}
					paginationData={pagination?.data}
				/>
			</>) : (null)}

			{(loading && !pagination?.data) ? (
				<TableLoading />
			) : (null)}
		</table>

		<hr className='my-4' />

		{(!_.isEmpty(pagination)) ? (
			<TablePagination
				pagination={pagination}
				selectedParams={selectedParams}
				setSelectedParams={setSelectedParams}
			/>
		) : (null)}
	</div>
}

export default TableListing;
