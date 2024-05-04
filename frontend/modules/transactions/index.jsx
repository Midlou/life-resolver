import React from 'react';
import _ from 'lodash';

import Moment from 'react-moment';
import { Inertia } from '@inertiajs/inertia';
import CurrencyFormat from 'react-currency-format';

import IndexController from './controllers/index-controller';

import FormModal from './form-modal';

import EditModal from './edit-modal';
import FilterModal from './filter-modal';
import CreateModal from './create-modal';
import Panel from '../../components/panels/panel';
import TextNA from '../../components/text/text-na';
import MainLayout from '../../components/layouts/main';
import BtnTabs from '../../components/tabs/btn-tabs';
import BtnPrimary from '../../components/buttons/primary';
import BtnDefault from '../../components/buttons/default';
import RefreshBtn from '../../components/listing/refresh-btn';
import ClearFilter from '../../components/filters/clear-filter';
import TableListing from '../../components/listing/table-listing';
import SearchFilter from '../../components/filters/search-filter';
import EditColumn from '../../components/listing/columns/edit-column';
import ContainerFlex from '../../components/containers/container-flex';
import TrashFilter, { TrashTitle } from '../../components/filters/trash-filter';
import SoftdeleteColumn from '../../components/listing/columns/softdelete-column';

import service from "./service";

import CreateController from "./controllers/create-modal.controller";
import EditController from "./controllers/edit-modal.controller";

const PageContent = ({ errors, ...props }) => {
	const {
		params,
		setParams,

		loading,
		pagination,
		editModalRef,
		filterModalRef,
		createModalRef,
		selectedFilters,
		getData,
		openEditModal,
		openCreateModal,
		openFilterModal,
		setSelectedFilters
	} = IndexController();

	const COLUMNS = [
		{ header: '#', accessor: 'id', width: '1%', sorting: true },
		{
			header: 'Valor', accessor: 'amount', width: '15%', sorting: true,
			cell: (item) => <div className={`font-bold text-right ${item.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
				<CurrencyFormat value={item.amount}
					displayType={'text'}
					thousandSeparator={'.'}
					decimalSeparator={','}
					prefix={'R$'}
					decimalScale={2}
					fixedDecimalScale={true}
				/>
			</div>
		},
		{
			header: 'Data', accessor: 'transacted_at', width: '1%', sorting: true,
			cell: (item) => <Moment format="DD/MM/YYYY">{item.transacted_at}</Moment>
		},
		{
			header: 'Descrição', accessor: 'description',
			cell: (item) => <TextNA value={item.description}>
				<div className='line-clamp-3'>{item.description}</div>
			</TextNA>
		},
		{
			header: '', accessor: '', width: '1%',
			cell: (item) => <EditColumn shouldShow={!item.deleted_at} onIconClick={() => openEditModal(item)} />
		},
		{
			header: '', accessor: '', width: '1%',
			cell: (item) => <SoftdeleteColumn item={item} onConfirm={getData} service={service} />
		},
	];

	const tabOptions = [
		{ key: 'transaction_tab', label: 'Transações', active: true, },
		{ key: 'dashboard_tab', label: 'Gráficos', onClick: () => Inertia.get('/transactions/dashboards') },
	];

	return <>
		{/* <EditModal ref={editModalRef} /> */}
		<FilterModal ref={filterModalRef} />
		{/* <CreateModal ref={createModalRef} /> */}

		<FormModal controller={EditController} ref={editModalRef} />
		<FormModal controller={CreateController} ref={createModalRef} />

		<ContainerFlex>
			<Panel className='p-4 bg-white'>
				<div className="grid grid-cols-6 gap-3">
					<div className="col-span-6 lg:col-span-3 xl:col-span-2" >
						<BtnTabs options={tabOptions} />
					</div>
				</div>
				<hr className='my-4' />
				<div className="grid md:grid-cols-1 lg:grid-cols-4 gap-3">
					<div>
						<SearchFilter setState={setSelectedFilters} />
					</div>

					<div className='flex gap-4'>
						<div className='btn-group flex flex-grow'>
							<RefreshBtn performRequest={getData} loading={loading} />
							<BtnDefault onClick={openFilterModal}>Filtrar</BtnDefault>
							<ClearFilter state={selectedFilters} setState={setSelectedFilters} />
						</div>

						<TrashFilter setState={setSelectedFilters} />
					</div>

					<div></div>

					<div className='btn-group lg:text-end'>
						<BtnPrimary onClick={openCreateModal}>Nova transação</BtnPrimary>
					</div>
				</div>
				<hr className='my-4' />
				<TrashTitle state={selectedFilters} />
				<TableListing
					loading={loading}
					columns={COLUMNS}

					params={params}
					setParams={setParams}

					pagination={pagination}
					emptyText='Nenhum item cadastrado'
				/>
			</Panel>
		</ContainerFlex>
	</>
}

export default (props) => <MainLayout {...props} title={"Transações"} Component={<PageContent {...props} />} />;
