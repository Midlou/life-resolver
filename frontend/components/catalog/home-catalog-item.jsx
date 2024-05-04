import React from "react";
import { Inertia } from "@inertiajs/inertia";
import CurrencyFormat from "react-currency-format";
import { PhotoIcon } from "@heroicons/react/24/solid";

import If from "../conditionals/if";

const HomeCatalogItem = ({ children = null, item = null, catalog = null, className = '', onItemClick = null }) => {
	let thumbnail = _.find(item.files, { properties: { is_thumbnail: true } }) || item.files[0];

	return <div className={`${className} cursor-pointer flex flex-col h-full w-full bg-white rounded border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 ease-in-out transition`}
	onClick={() => Inertia.get(`/catalog/${catalog.id}`)}
	>
		<div className="rounded-t w-full overflow-hidden group-hover:opacity-75 h-48 sm:h-48 lg:aspect-none">
			<If render={thumbnail?.filename} body={() => {
				return <img src={`/file/${thumbnail?.filename}`} className="h-full w-full object-scale-down md:object-cover object-center" />;
			}} />
			<If render={!thumbnail?.filename} body={() => {
				return <div className="h-full w-full object-scale-down md:object-cover object-center flex items-center justify-center bg-slate-300">
					<PhotoIcon className="h-10 w-10 text-indigo-600"/>
				</div>
			}} />
		</div>
		<div className="m-4">
			<span className="text-base font-bold tracking-tight text-gray-600 line-clamp-3">
				{item.title}
			</span>
		</div>
		<div className="m-4 mt-auto text-gray-500">
			<div>
				<If render={item?.discount} body={() => {
					return <span className="text-gray-500 text-sm">
						<s className="mr-2">
							<CurrencyFormat value={item.price || 0}
								displayType={'text'}
								thousandSeparator={'.'}
								decimalSeparator={','}
								prefix={'R$'}
								decimalScale={2}
								fixedDecimalScale={true}
							/>
						</s>
						<span className="text-emerald-500">
							{item?.discount}% OFF
						</span>
					</span>
				}} />
				<h3>
					<b className="text-indigo-500 text-xl">
						<CurrencyFormat
							value={(item?.price - (item?.price * ((item?.discount || 0) / 100))) || 0}
							displayType={'text'}
							thousandSeparator={'.'}
							decimalSeparator={','}
							prefix={'R$'}
							decimalScale={2}
							fixedDecimalScale={true}
						/>
					</b>
				</h3>
			</div>
		</div>

	</div>
}

export default HomeCatalogItem;
