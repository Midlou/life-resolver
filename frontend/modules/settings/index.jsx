import _ from 'lodash';
import React from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

import Panel from '../../components/panels/panel';
import MainLayout from '../../components/layouts/main';
import ContainerFlex from '../../components/containers/container-flex';

import Controller from "./controllers/index-controller";
import MaskInput from '../../components/inputs/mask-input';
import FormLabel from '../../components/labels/form-label';
import BtnSuccess from '../../components/buttons/success';
import If from '../../components/conditionals/if';

import { SETTINGS_PHONE_DESCRIPTION } from '../../shared/constants/helper-messages';

import service from "./service";

const PageContent = ({ errors, ...props }) => {
	const { loading, settings, onSave, setProperty } = Controller();

	return <>
		<ContainerFlex>
			<Panel className='p-4 bg-white'>
				<If render={loading} body={() => {
					return <div className="flex items-center justify-center">
						<EllipsisHorizontalIcon className="animate-pulse w-20 h-20" />
					</div>
				}} />

				<If render={!loading} body={() => {
					return <>
						{/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							<div>
								<FormLabel helper={SETTINGS_PHONE_DESCRIPTION} isRequired={true}>Número de telefone para contato</FormLabel>
								<MaskInput mask={"(99) 9 9999 9999"} alwaysShowMask={true}
									onChangeValue={value => setProperty('contact_phone', value)}
									value={settings.contact_phone || ''}
								/>
							</div>
						</div> */}
						<hr className='my-8' />
						<div className="flex flex-row items-center justify-between">
							<BtnSuccess onClick={onSave} type="button">
								Salvar
							</BtnSuccess>
						</div>
					</>
				}} />
			</Panel>
		</ContainerFlex>
	</>

}

export default (props) => <MainLayout {...props} title={"Configurações"} Component={<PageContent {...props} />} />;
