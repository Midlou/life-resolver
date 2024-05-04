import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import PublicLayout from '../../components/layouts/public';
import BtnPrimary from '../../components/buttons/primary';
import ContainerFlex from '../../components/containers/container-flex';
import registerController from './controllers/register.controller';
import { Inertia } from '@inertiajs/inertia';
import Panel from '../../components/panels/panel';
import FormLabel from '../../components/labels/form-label';
import Input from '../../components/inputs/input';
import ErrorList from '../../components/validation/error-list';
import DocumentInput from '../../components/inputs/document-input';
import If from '../../components/conditionals/if';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import MaskInput from '../../components/inputs/mask-input';
import { BRAZIL_FEDERATIVE_UNITS } from '../../shared/constants/constants';
import ListBox from '../../components/inputs/list-box';

const PageContent = ({ errors, ...props }) => {
	const { loading, credentials, setProperty, handleSubmit } = registerController(props);

	return <ContainerFlex className='flex-col items-center'>
		{/* <span className="font-semibold text-4xl font-mono text-indigo-500 my-4">
			Criar conta
		</span> */}

		<If render={loading} body={() => {
			return <Panel className='w-full px-4 py-3 flex items-center justify-center bg-white'>
				<EllipsisHorizontalIcon className="animate-pulse w-20 h-20" />
			</Panel>
		}} />

		{/* <If render={!loading} body={() => {
		return */} <Panel className="flex flex-col w-full lg:w-3/4 bg-white p-8">
			<div className="flex justify-center">
				<span className="font-semibold text-3xl font-mono text-gray-700">
					Criar conta
				</span>
			</div>

			<hr className='my-8' />

			<ErrorList errors={props?.errors} />

			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<FormLabel isRequired={!credentials.name}>Nome completo</FormLabel>
						<Input name='name' placeholder='Insira um nome'
							onChangeValue={value => setProperty('name', value)}
						/>
					</div>
					<div>
						<FormLabel isRequired={!credentials.email}>E-mail</FormLabel>
						<Input name='email' placeholder='Insira um e-mail'
							onChangeValue={value => setProperty('email', value)}
						/>
					</div>
					<div>
						<FormLabel isRequired={!credentials.document}>CPF ou CNPJ</FormLabel>
						<DocumentInput name='document' placeholder='Insira um CPF ou CNPJ'
							value={credentials.document}
							onChange={(event, type) => {
								setProperty('document', event.target.value)
							}}
						/>
					</div>
					<div>
						<FormLabel isRequired={!credentials.phone}>Telefone celular</FormLabel>
						<MaskInput mask={"(99) 9 9999 9999"} alwaysShowMask={true}
							onChangeValue={value => setProperty('phone', value)}
							value={credentials.phone || ''}
						/>
					</div>
				</div>

				<hr className='my-8' />

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<FormLabel>Senha</FormLabel>
						<Input type='password' name='password' placeholder='Insira uma senha'
							onChangeValue={value => setProperty('password', value)}
						/>
					</div>
					<div>
						<FormLabel>Confirme senha</FormLabel>
						<Input type='password' name='password_confirmation' placeholder='Confirme a senha'
							onChangeValue={value => setProperty('password_confirmation', value)}
						/>
					</div>
				</div>

				<hr className='my-8' />

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<FormLabel isRequired={!credentials.cep}>CEP</FormLabel>
						<MaskInput mask={"99999-999"} alwaysShowMask={true}
							onChangeValue={value => setProperty('cep', value)}
							value={credentials.cep || ''}
						/>
					</div>
					<div>
						<div className='grid grid-cols-4 gap-2'>
							<div className='col-span-3'>
								<FormLabel isRequired={!credentials.street}>Logradouro</FormLabel>
								<Input name='street' placeholder='Insira um logradouro'
									onChangeValue={value => setProperty('street', value)}
								/>
							</div>
							<div className='col-span-1'>
								<FormLabel isRequired={!credentials.street_number}>Número</FormLabel>
								<MaskInput mask={'9999999999'} maskChar={false}
									onChangeValue={value => setProperty('street_number', value)}
									value={credentials.street_number || ''}
								/>
							</div>
						</div>
					</div>
					<div>
						<FormLabel>Complemento</FormLabel>
						<Input name='complement' placeholder='Insira um complemento'
							onChangeValue={value => setProperty('complement', value)}
						/>
					</div>
					<div>
						<FormLabel>Referência</FormLabel>
						<Input name='reference' placeholder='Insira uma referência'
							onChangeValue={value => setProperty('reference', value)}
						/>
					</div>
					<div>
						<FormLabel isRequired={!credentials.district}>Bairro</FormLabel>
						<Input name='district' placeholder='Insira um bairro'
							onChangeValue={value => setProperty('district', value)}
						/>
					</div>
					<div>
						<FormLabel isRequired={!credentials.city}>Cidade</FormLabel>
						<Input name='city' placeholder='Insira uma cidade'
							onChangeValue={value => setProperty('city', value)}
						/>
					</div>
					<div>
						<FormLabel isRequired={!credentials.federative_unit}>Estado</FormLabel>
						<ListBox
							fieldValue={'name'}
							label='Estado'
							data={BRAZIL_FEDERATIVE_UNITS}
							onSelect={(value) => setProperty('federative_unit', value)}
							openUp={true}
						/>
					</div>
				</div>

				<hr className='my-8' />

				<div className='flex justify-center'>
					<BtnPrimary isLoading={credentials?.loading} type='submit' className='text-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3'>
						Continuar
					</BtnPrimary>
				</div>
				<div className='flex justify-center mt-4'>
					<div>
						Já possuí uma conta? <b>
							<a onClick={() => Inertia.get('/login')} className='stylized-link'>
								Entre
							</a>
						</b>
					</div>
				</div>
			</form>
		</Panel>

	</ContainerFlex>
}

export default (props) => <PublicLayout {...props} title={"Cadastrar"} Component={<PageContent {...props} />} />;
