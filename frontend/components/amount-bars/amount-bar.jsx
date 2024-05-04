import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import If from '../conditionals/if';

const AmountBar = ({ loading = false, items = [], ...props }) => {
	return <div className='flex flex-row justify-center w-full fixed z-10 right-0 left-0 bottom-0 bg-white shadow-sm border border-gray-200 overflow-auto sm:overflow-hidden'>
		<If render={!loading} body={() => {
			return items.map((item, index) => {
				return <div key={index} style={{color: item.color || '#000'}} className={`px-4 py-1 text-center border-r border-gray-200 first:border-l`}>
					<p className="p-0 m-0 text-base">
						<If render={!item.text} body={() => <b>
							<CurrencyFormat value={item.amount}
								displayType={'text'}
								thousandSeparator={'.'}
								decimalSeparator={','}
								prefix={item.prefix}
								suffix={item.suffix}
								decimalScale={2}
								fixedDecimalScale={true} />
						</b>} />

						<If render={item.prefix && item.text} body={() => <span> {item.prefix}</span>} />
						<If render={item.text} body={() => <b>{item.amount}</b>} />
						<If render={item.suffix && item.text} body={() => <span> {item.suffix}</span>} />
					</p>
					<p className="p-0 m-0 text-lg">{item.label}</p>
				</div>
			})

		}} />

		<If render={loading} body={() => {
			return <div className='animate-pulse w-full h-1 rounded bg-indigo-500 m-4'>
			</div>


			// return <div className="amounts-bar-loading">
			{/* <div className="progress-line"></div> */ }
			{/* <EllipsisHorizontalIcon className="animate-pulse w-20 h-20" /> */ }
			// </div>
		}} />
	</div>;
}

export default AmountBar;
