import React from 'react';

export default function ModalBody({ children = null, className = "" }) {
	return <div className={`${className} p-4`}>
		{children}
	</div>
}
