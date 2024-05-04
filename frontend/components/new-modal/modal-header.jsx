import { Dialog } from '@headlessui/react';
import React from 'react';

export const TitleLabelModal = ({ children = null, className = '' }) => <Dialog.Title as="h3" className={`${className} text-lg font-medium leading-6 text-white`}>
	{children}
</Dialog.Title>

export default function ModalHeading({ children = null, className = "bg-slate-700" }) {
	return <Dialog.Title as="div" className={`${className} flex flex-row items-center justify-between p-4 rounded-t-md text-white`}>
		{children}
	</Dialog.Title>
}
