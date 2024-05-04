import React from "react";
import CurrencyFormat from "react-currency-format";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";

import If from "../conditionals/if";
import Panel from "../panels/panel";
import CounterInput from "../inputs/counter-input";

const ColumnTitle = ({ children }) => {
	return <span className='text-gray-500 text-lg leading-none mb-1 hidden sm:block'>
		{children}
	</span>
}

const CartItem = ({ item = null, onRemoveItem = () => { }, onItemChange = () => { } }) => {
	function onChangeQty(qty) {
		item.qty = qty;

		onItemChange(item);
	}

	let thumbnail = _.find(item?.files, { properties: { is_thumbnail: true } }) || item?.files[0];
	let priceWithDiscount = (item?.price - (item?.price * ((item?.discount || 0) / 100))) || 0

	return <Panel className='p-4 sm:p-6 bg-white'>
		<div className='grid grid-cols-12 gap-4'>
			<div className='col-span-2 row-span-2 overflow-hidden flex justify-center'>
				<If render={thumbnail} body={() => {
					return <img src={`/file/${thumbnail?.filename}`}
						className="rounded-t rounded flex-shrink-0 object-cover w-20 h-20 outline-none sm:w-40 sm:h-40" />
				}} />
				<If render={!thumbnail} body={() => {
					return <div
						className="rounded-t rounded flex-shrink-0 object-cover w-20 h-20 outline-none sm:w-40 sm:h-40 flex items-center justify-center bg-slate-300">
						<PhotoIcon className="h-8 w-8 text-indigo-600" />
					</div>
				}} />
			</div>
			<div className=" col-span-10 flex flex-col">
				<div className="grid grid-cols-6">
					<div className="col-span-5">
						<ColumnTitle>Produto</ColumnTitle>
						<h3 className="text-lg text-justify font-bold tracking-tight text-gray-700 dark:text-white line-clamp-3">
							{item.title}
						</h3>
					</div>
					<div className="col-span-1 flex justify-end">
						<XMarkIcon className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-500" onClick={() => onRemoveItem(item)} />
					</div>
				</div>
			</div>
			<div className="col-span-10 grid grid-cols-12 gap-2 content-end">
				<div className='col-span-4 sm:flex flex-col hidden'>
					<ColumnTitle>Preço un.</ColumnTitle>
					<h3>
						<CurrencyFormat
							className='text-xl'
							value={priceWithDiscount}
							displayType={'text'}
							thousandSeparator={'.'}
							decimalSeparator={','}
							prefix={'R$ '}
							decimalScale={2}
							fixedDecimalScale={true}
						/>
					</h3>
					<If render={item?.discount} body={() => {
						return <span className="text-gray-500 text-sm">
							<s className="mr-2">
								<CurrencyFormat value={item.price || 0}
									displayType={'text'}
									thousandSeparator={'.'}
									decimalSeparator={','}
									prefix={'R$ '}
									decimalScale={2}
									fixedDecimalScale={true}
								/>
							</s>
							<span className="text-emerald-500">
								{item?.discount}% OFF
							</span>
						</span>
					}} />
				</div>
				<div className='col-span-8 sm:col-span-5 flex flex-col sm:justify-between justify-end'>
					<ColumnTitle>&nbsp;</ColumnTitle>
					<CounterInput
						decimalScale={0}
						onChangeValue={onChangeQty}
						defaultValue={item.qty}
						isAllowed={(values, sourceInfo) => {
							const { value } = values;
							return value > 0;
						}}
					/>
				</div>
				<div className='col-span-4 sm:col-span-3 flex flex-col sm:justify-between justify-end sm:text-start text-end'>
					<ColumnTitle>Total</ColumnTitle>
					<h3>
						<CurrencyFormat
							className='text-lg'
							value={priceWithDiscount * item.qty}
							displayType={'text'}
							thousandSeparator={'.'}
							decimalSeparator={','}
							prefix={'R$ '}
							decimalScale={2}
							fixedDecimalScale={true}
						/>
					</h3>
				</div>
			</div>

		</div>
	</Panel>
}

export default CartItem;
