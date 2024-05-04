import React from "react";
import CurrencyFormat from "react-currency-format";

const TransactionsSummaryTable = ({ summaryData = {} }) => {
	return <div className='overflow-auto default-scrollbar'>
		<table className="w-full">
			<tbody>
				<tr>
					<th className='px-4 py-2 border uppercase text-default font-semibold text-xs'>
						Receita total
					</th>
					<td className="px-4 py-3 text-center border">
						<div className={`font-bold text-emerald-600`}>
							<CurrencyFormat value={summaryData?.revenues_total || 0}
								displayType={'text'}
								thousandSeparator={'.'}
								decimalSeparator={','}
								prefix={'R$'}
								decimalScale={2}
								fixedDecimalScale={true}
							/>
						</div>
					</td>
					<td rowSpan="2" className="px-4 py-3 text-center border">
						Saldo:
						<div className={`font-bold ${summaryData?.diff_total || 0 > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
							<CurrencyFormat value={summaryData?.diff_total || 0}
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
				<tr>
					<th className='px-4 py-2 border uppercase text-default font-semibold text-xs'>
						Despesa total
					</th>
					<td className="px-4 py-3 text-center border">
						<div className={`font-bold text-red-600`}>
							<CurrencyFormat value={summaryData?.expenses_total || 0}
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
			</tbody>
		</table>
	</div>
}

export default TransactionsSummaryTable;
