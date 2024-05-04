import React from 'react';

// Controller
import indexController from './controllers/index.controller';

// Components
import Input from '../../components/inputs/input';
import GuestLayout from '../../components/layouts/guest';
import BtnPrimary from '../../components/buttons/primary';
import FormLabel from '../../components/labels/form-label';
import ErrorList from '../../components/validation/error-list';
import ContainerFlex from '../../components/containers/container-flex';
import { Inertia } from '@inertiajs/inertia';

const PageContent = ({ app_name, ...props }) => {
	const { credentials, setProperty, handleSubmit } = indexController(props);

	return <ContainerFlex className='flex-col items-center'>
		<span className="font-semibold text-5xl font-mono text-indigo-500 my-8">
			{app_name}
		</span>

		<div className="w-full sm:w-3/4 md:w-2/4 lg:w-2/5 xl:w-1/3 2xl:w-1/4 bg-white shadow-md rounded px-8 py-10 flex flex-col border border-gray-300">
			<div className="flex justify-center">
				<span className="font-semibold text-3xl font-mono text-gray-700">
					Entrar
				</span>
			</div>

			<hr className='my-8' />

			<ErrorList errors={props?.errors} />

			<form onSubmit={handleSubmit}>
				<div className='mb-6'>
					<FormLabel isRequired={!credentials.login}>E-mail, CPF ou CNPJ</FormLabel>
					<Input type='text' name='login' placeholder='Insira seu e-mail, CPF ou CNPJ'
						onChangeValue={text => setProperty('login', text)}
					/>
				</div>
				<div>
					<FormLabel isRequired={!credentials.password}>Senha</FormLabel>
					<Input type='password' name='password' placeholder='Insira sua senha'
						onChangeValue={text => setProperty('password', text)}
					/>
				</div>

				<hr className='my-8' />

				<BtnPrimary isLoading={credentials?.loading} type='submit' className='w-full'>
					Entrar
				</BtnPrimary>
				{/* <div className='flex justify-center mt-4'>
					<div>
						Não possuí uma conta? <b>
							<a onClick={() => Inertia.get('/register')} className='stylized-link'>
								cadastre-se
							</a>
						</b>
					</div>
				</div> */}
			</form>
		</div>
	</ContainerFlex>
}

export default (props) => <GuestLayout {...props} title='Entrar' Component={<PageContent {...props} />} />;
