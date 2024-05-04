import React from 'react';
import _ from 'lodash';

import Panel from '../../components/panels/panel';
import MainLayout from '../../components/layouts/main';
import BtnPrimary from '../../components/buttons/primary';
import RefreshBtn from '../../components/listing/refresh-btn';
import TableListing from '../../components/listing/table-listing';
import ContainerFlex from '../../components/containers/container-flex';

import EditModal from './edit-modal';
import CreateModal from './create-modal';
import FilterModal from './filter-modal';
import BtnDefault from '../../components/buttons/default';
import IndexController from './controllers/index-controller';
import ClearFilter from '../../components/filters/clear-filter';
import SearchFilter from '../../components/filters/search-filter';
import EditColumn from '../../components/listing/columns/edit-column';
import TrashFilter, { TrashTitle } from '../../components/filters/trash-filter';
import SoftdeleteColumn from '../../components/listing/columns/softdelete-column';

import service from "./service";

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
		{ header: 'Nome', accessor: 'name', width: '5%', sorting: true },
		{
			header: '', accessor: '', width: '1%',
			cell: (item) => <EditColumn shouldShow={!item.deleted_at} onIconClick={() => openEditModal(item)} />
		},
		{
			header: '', accessor: '', width: '1%',
			cell: (item) => <SoftdeleteColumn item={item} onConfirm={getData} service={service} />
		},
	];

	return <>
		<EditModal ref={editModalRef} />
		<FilterModal ref={filterModalRef} />
		<CreateModal ref={createModalRef} />

		<ContainerFlex>
			<Panel className='p-4 bg-white'>
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
						<BtnPrimary onClick={openCreateModal}>Novo usuário</BtnPrimary>
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

export default (props) => <MainLayout {...props} title={"Usuários"} Component={<PageContent {...props} />} />;
