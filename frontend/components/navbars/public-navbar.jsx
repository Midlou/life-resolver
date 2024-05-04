import React, { Fragment, useContext, useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import { Menu, Transition } from "@headlessui/react";
import { ArrowRightOnRectangleIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

import If from "../conditionals/if";

import { AppContext } from "../../shared/contexts/app.context";
import { HomeIcon, IdentificationIcon, ShoppingBagIcon, ShoppingCartIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { get_local_storage_array } from "../../shared/constants/helpers";

const NavBar = ({ title = '', ...props }) => {
	const appContext = useContext(AppContext);

	useEffect(() => {
		let savedCart = get_local_storage_array(`${props.app_name}_cart`);

		return appContext.setCartItems(savedCart);
	}, [])

	let user = props.user;
	return <nav className="text-white text-center p-2 bg-slate-700 drop-shadow-lg">
		<div className="flex flex-wrap justify-between items-center mx-auto">
			<div className="flex justify-between items-center">

				<button type="button" onClick={() => Inertia.get('/')}
					className="flex items-center hover:text-indigo-500 cursor-pointer ml-5 px-1 py-1">
					<HomeIcon className="w-6 h-6" />
				</button>
				<h3 className="ml-5 mb-0 font-semibold">
					{title}
				</h3>
			</div>
			<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

				<button type="button" onClick={() => Inertia.get('/cart')}
					className="flex relative items-center hover:text-emerald-500 cursor-pointer mr-5 px-1 py-1">
					<ShoppingCartIcon className="h-7 w-7 mr-1" />
					<If render={appContext.appState?.cart?.items?.length} body={() => {
						return <b className="absolute right-0 top-0 rounded-md bg-emerald-500 px-1 m-0 text-white font-mono leading-tight text-center">
							{appContext.appState?.cart?.items?.length}
						</b>
					}} />
				</button>
				<If render={user} body={() => {
					return <Menu as="div" className="relative inline-block text-left mr-5">
						<div>
							<Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-800 hover:bg-gray-900 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
								{user?.name || 'Usuário'}
								<ChevronDownIcon
									className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
									aria-hidden="true"
								/>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 w-48 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="px-1 py-1 text-gray-700 text-lg">
									<Menu.Item>
										<button type="button" onClick={() => Inertia.get('/cart')}
											className="hover:border-indigo-600 hover:text-indigo-600 border-l-4 cursor-pointer hover:bg-slate-200 default-focus-light flex w-full items-center px-1 py-1">
											<ShoppingCartIcon className="mr-2 h-6 w-6" /> <span className="text-gray-700">Meu carrinho</span>
										</button>
									</Menu.Item>
									<hr className="my-2" />
									<Menu.Item>
										<button type="button" onClick={() => Inertia.get('/customer_orders')}
											className="hover:border-indigo-600 hover:text-indigo-600 border-l-4 cursor-pointer hover:bg-slate-200 default-focus-light flex w-full items-center px-1 py-1">
											<ShoppingBagIcon className="mr-2 h-6 w-6" /> <span className="text-gray-700">Meus pedidos</span>
										</button>
									</Menu.Item>
									<Menu.Item>
										<button type="button" onClick={() => Inertia.get('/customer_info')}
											className="hover:border-indigo-600 hover:text-indigo-600 border-l-4 cursor-pointer hover:bg-slate-200 default-focus-light flex w-full items-center px-1 py-1">
											<IdentificationIcon className="mr-2 h-6 w-6" /> <span className="text-gray-700">Meus dados</span>
										</button>
									</Menu.Item>
									<hr className="my-2" />
									<If render={user?.type == 'system'} body={() => {
										return <>
											<Menu.Item>
												<button type="button" onClick={() => Inertia.get('/admin')}
													className="hover:border-amber-500 hover:text-amber-500 border-l-4 cursor-pointer hover:bg-amber-100 default-focus-light flex w-full items-center px-1 py-1">
													<WrenchScrewdriverIcon className="mr-2 h-6 w-6" /> <b className="text-gray-700">Administração</b>
												</button>
											</Menu.Item>
											<hr className="my-2" />
										</>
									}} />
									<Menu.Item>
										<button type="button" onClick={() => Inertia.post('/logout')}
											className="hover:border-indigo-600 hover:text-indigo-600 border-l-4 cursor-pointer hover:bg-slate-200 default-focus-light flex w-full items-center px-1 py-1">
											<ArrowRightOnRectangleIcon className="mr-2 h-6 w-6" /> <span className="text-gray-700">Sair</span>
										</button>
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				}} />
				<If render={!user} body={() => {
					return <b className="ml-10 mr-2">
						<a onClick={() => Inertia.get('/login')} className='stylized-link'>
							Entrar
						</a>
					</b>
				}} />
			</div>
		</div>
	</nav>
}

export default NavBar;
