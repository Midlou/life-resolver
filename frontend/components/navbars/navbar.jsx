import React, { Fragment } from "react";
import { ArrowRightOnRectangleIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { Inertia } from "@inertiajs/inertia";
import { Menu, Transition } from "@headlessui/react";
import If from "../conditionals/if";

const NavBar = ({ title = '', setDrawerIsOpen = () => { }, ...props }) => {
	let user = props.user;
	return <nav className="text-white text-center p-2 bg-slate-700 drop-shadow-lg">
		<div className="flex flex-wrap justify-between items-center mx-auto">
			<div className="flex justify-between items-center">
				<If render={user} body={() => {
					return <button type="button" onClick={() => setDrawerIsOpen(true)}
						className="inline-flex items-center text-lg text-gray-400 hover:text-white rounded-lg hover:bg-gray-600 default-focus-light">

						<Bars3Icon className="h-10 w-10" />
					</button>
				}} />

				<h3 className="ml-5 mb-0 font-semibold">
					{title}
				</h3>
			</div>

			<If render={user} body={() => {
				return <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
					<Menu as="div" className="relative inline-block text-left">
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
							<Menu.Items className="z-50 absolute right-0 w-48 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="px-1 py-1 text-gray-700 text-lg">
									<Menu.Item>
										<button type="button" onClick={() => Inertia.get('/settings')}
											className="hover:border-amber-500 hover:text-amber-500 border-l-4 cursor-pointer hover:bg-amber-100 default-focus-light flex w-full items-center px-1 py-1">
											<Cog8ToothIcon className="mr-2 h-6 w-6" /> <b className="text-gray-700">Configurações</b>
										</button>
									</Menu.Item>
									<hr className="my-2" />
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
				</div>
			}} />
		</div>
	</nav>
}

export default NavBar;
