import React from 'react';
import _ from 'lodash';

import DatePicker from "react-datepicker";
import { Inertia } from '@inertiajs/inertia';

import IndexController from './controllers/index-controller';

import Panel from '../../components/panels/panel';
import MainLayout from '../../components/layouts/main';
import RefreshBtn from '../../components/listing/refresh-btn';
import ContainerFlex from '../../components/containers/container-flex';

import BtnTabs from '../../components/tabs/btn-tabs';
import Bar from '../../components/react-charts/bar';
import Line from '../../components/react-charts/line';
import TransactionsSummaryTable from './components/transactions_summary_table';
import CategoriesSummary from './components/categories_summary';

const availableCharts = {
	bar: Bar,
	line: Line
};

const PageContent = ({ errors, ...props }) => {
	const {
		loading,
		listingData,
		filterModalRef,
		selectedFilters,
		getData,
		openFilterModal,
		setSelectedFilters,
	} = IndexController();

	const tabOptions = [
		{ key: 'transaction_tab', label: 'Transações', onClick: () => Inertia.get('/transactions') },
		{ key: 'dashboard_tab', label: 'Gráficos', active: true, },
	];

	return <>
		<ContainerFlex>
			<Panel className='p-4 bg-white'>
				<div className="grid grid-cols-6 gap-3">
					<div className="col-span-6 lg:col-span-3 xl:col-span-2" >
						<BtnTabs options={tabOptions} />
					</div>
				</div>
				<hr className='my-4' />
				<div className="grid md:grid-cols-1 lg:grid-cols-4 gap-3">
					<div className="col-span-2">
						<div className="flex flex-row">
							<DatePicker
								selected={selectedFilters.date_start}
								onChange={(date) => setSelectedFilters(state => ({ ...state, date_start: date }))}
								selectsStart
								startDate={selectedFilters.date_start}
								endDate={selectedFilters.date_end}
								dateFormat="dd/MM/yyyy"
								className="border border-gray-300 rounded py-2 px-3 text-slate-600 w-full"
							/>
							<div className="flex items-center">
								<h3 className="mx-3 items-center">
									Até
								</h3>
							</div>
							<DatePicker
								selected={selectedFilters.date_end}
								onChange={(date) => setSelectedFilters(state => ({ ...state, date_end: date }))}
								selectsEnd
								startDate={selectedFilters.date_start}
								endDate={selectedFilters.date_end}
								minDate={selectedFilters.date_start}
								dateFormat="dd/MM/yyyy"
								className="border border-gray-300 rounded py-2 px-3 text-slate-600 w-full"
							/>
						</div>
					</div>

					<div className='btn-group flex flex-grow'>
						<RefreshBtn performRequest={getData} loading={loading} />
					</div>
				</div>
				<hr className='my-4' />

				<div className="grid md:grid-cols-1 lg:grid-cols-4 gap-3">
					<CategoriesSummary summaryData={listingData?.summary} />

					<TransactionsSummaryTable summaryData={listingData?.summary} />
				</div>

				<div className="grid md:grid-cols-1 lg:grid-cols-12 gap-3">
					{(listingData.charts?.data?.length) ? (
						listingData.charts.data.map((dashboardData, index) => {
							const Chart = availableCharts[dashboardData.chart_type];
							return <div key={index} className={`col-span-12`}>
								<Chart options={dashboardData.options} data={dashboardData.data} />
							</div>
						})
					) : (null)}
				</div>
			</Panel>
		</ContainerFlex>
	</>
}

export default (props) => <MainLayout {...props} title={"Gráficos de transações"} Component={<PageContent {...props} />} />;
