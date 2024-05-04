import React from "react";
import _ from "lodash";

function RowCells({
	columns,

	item,
	itemIndex,

	onClick = () => { },
	canShowItem = () => true,
}) {
	if (!canShowItem(item)) return null;

	return <tr className={`${item.deleting ? 'opacity-50' : ''}`} onClick={() => onClick(item)}>
		{
			columns.map((column, index) => {
				return <td key={column.order || index} className="px-4 py-2 border">
					{getCell(item, itemIndex, column)}
				</td>
			})
		}
	</tr>;
}

function getCell(item, itemIndex, column) {
	if (column.cell) return column.cell(item, itemIndex);

	return item[column.accessor];
}

const TableBody = ({
	columns = [],
	paginationData = [],
	emptyText = 'Nenhum item encontrado',

	onRowClick = (item) => { },
	canShowItem = (item) => true,
}) => {
	return <tbody>
		{(paginationData.length) ? (
			paginationData.map((item, itemIndex) => {
				return <RowCells
					columns={columns}

					item={item}
					itemIndex={itemIndex}
					key={item.id || itemIndex}

					onClick={onRowClick}
					canShowItem={canShowItem}
				/>
			})
		) : (null)}

		{(!paginationData.length) ? (
			<tr>
				<td className="px-4 py-3 text-gray-400 text-center border"
					colSpan={columns.length}
				>{emptyText}</td>
			</tr>
		) : (null)}

	</tbody>
}

export default TableBody;
