import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

import If from '../conditionals/if';
import ModalBody from './modal-body';
import ModalHeading, { TitleLabelModal } from './modal-header';

export default ({ cancelModal, opened = false, children = null, isStatic = false, loading = false, sizeClassname = 'lg:max-w-[50%]' }) => {
	if (!opened) return null;
	return <Transition appear show={opened} as={Fragment}>
		<Dialog as="div" className="relative z-20" onClose={!isStatic ? cancelModal : () => { }}>
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-black bg-opacity-40" />
			</Transition.Child>

			<div className="fixed inset-0 overflow-y-auto">
				<div className="flex items-center justify-center p-4 text-center mb-20">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel className={`md:max-w-[100%] lg:max-w-[60%] ${sizeClassname} w-full transform rounded-md bg-white text-left align-middle shadow-xl transition-all`}>
							<If render={loading} body={() => {
								return <>
									<ModalHeading>
										<TitleLabelModal>Carregando...</TitleLabelModal>
									</ModalHeading>
									<ModalBody>
										<div className="flex items-center justify-center">
											<EllipsisHorizontalIcon className="animate-pulse w-20 h-20" />
										</div>
									</ModalBody>
								</>

							}} />

							<If render={!loading} body={() => {
								return children
							}} />
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</Dialog>
	</Transition>
}
