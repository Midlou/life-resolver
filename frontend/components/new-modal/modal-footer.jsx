import React from "react";

export default function ModalFooter({ children = null, className = '' }) {
	return <div className={`${className} p-4`}>
		{children}
	</div>
}
