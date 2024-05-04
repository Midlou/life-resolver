import React from "react";
import { Tab } from "@headlessui/react";
import _ from "lodash";
import If from "../conditionals/if";

function getClasses(selected) {
	let selectedClasses = selected
		? 'bg-white shadow'
		: 'text-gray-500 hover:bg-slate-200 hover:text-black';

	return `${selectedClasses} w-full rounded py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`
}

function findDefaultTab(options) {
	return _.findIndex(options, { active: true }) || 0;
}

const SivelTabs = ({ tabs = [], options = [] }) => {
	if (!options) return null;

	return <Tab.Group defaultIndex={findDefaultTab(options)}>
		<Tab.List className="flex space-x-1 rounded bg-blue-900/20 p-1">
			{
				options.map((option) => {
					return <Tab
						key={option.key}
						className={
							({ selected }) => getClasses(selected)
						}
						onClick={option.onClick}
					>
						{option.label}
					</Tab>
				})
			}
		</Tab.List>
		<If render={tabs.length} body={() => {
			return <>
				<hr className="my-6" />
				<Tab.Panels>
					{
						tabs.map((tab, index) => {
							return <Tab.Panel key={index}>
								{
									tab
								}
							</Tab.Panel>
						})
					}
				</Tab.Panels>
			</>
		}} />
	</Tab.Group>
}

export default SivelTabs;
