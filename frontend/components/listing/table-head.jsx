import React from "react";
import _ from "lodash";

import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/24/solid";

const TableHead = ({
	columns = [],
	selectedSorting = {},

	setSelectedSorting = () => { },
}) => {
	const getColumnSortable = (column) => {
		if (!column.sorting) return null;

		return _.isString(column.sorting) ? column.sorting : column.accessor;
	}

	const onHeaderClick = (column) => {
		if (!column.sorting) return null;

		let columnSortingField = getColumnSortable(column);

		let command = 'asc';
		if (selectedSorting.command == 'desc') command = null;
		if (selectedSorting.command == 'asc') command = 'desc';

		setSelectedSorting({
			command, field: columnSortingField,
		});
	}

	return <thead>
		<tr className={`bg-gray-100 border`}>
			{
				columns.map((column, index) => {
					let columnSortable = getColumnSortable(column);
					let isCurrentSorting = selectedSorting?.field == columnSortable;

					return <th
						width={column.width}
						key={column.order || index}
						onClick={() => onHeaderClick(column)}
						className={`${columnSortable ? 'cursor-pointer' : ''} px-4 py-2 border uppercase text-default font-semibold text-xs`}
					>
						<p className="flex justify-center">
							<span>
								{column.header}
							</span>

							{(isCurrentSorting && selectedSorting?.command == 'desc') ? (
								<BarsArrowDownIcon className="opacity-50 mx-1 w-4 h-4" />
							) : (null)}

							{(isCurrentSorting && selectedSorting?.command == 'asc') ? (
								<BarsArrowUpIcon className="opacity-50 mx-1 w-4 h-4" />
							) : (null)}
						</p>
					</th>
				})
			}
		</tr>
	</thead>
}

export default TableHead;
