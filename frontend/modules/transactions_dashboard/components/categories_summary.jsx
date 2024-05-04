import React from "react";
import CurrencyFormat from "react-currency-format";

const CategoriesSummary = ({ summaryData = {} }) => {
	return <div className='overflow-auto default-scrollbar'>
		<table className="w-full">
			<tbody>
				{
					(
						summaryData?.categories_summary?.length
					) ? (
						summaryData.categories_summary.map((categorySummary, index) => {
							return <tr key={index}>
								<th className='px-4 py-2 border uppercase text-default font-semibold text-xs'>
									{categorySummary.category.name}
								</th>
								<td className="px-4 py-3 text-center border">
									<div className={`font-bold ${categorySummary.total > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
										<CurrencyFormat value={categorySummary.total}
											displayType={'text'}
											thousandSeparator={'.'}
											decimalSeparator={','}
											prefix={'R$'}
											decimalScale={2}
											fixedDecimalScale={true}
										/>
									</div>
								</td>
							</tr>
						})) : (null)
					}
			</tbody>
		</table>
	</div>
}

export default CategoriesSummary;
