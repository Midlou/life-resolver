import React from "react";

import { PencilSquareIcon } from "@heroicons/react/24/outline";

const EditColumn = ({ onIconClick = () => { }, shouldShow = true }) => {

	return (shouldShow) ? (
		<div className="grid justify-items-center">
			<PencilSquareIcon className='w-6 h-6 text-blue-600 m-2 cursor-pointer'
				onClick={() => onIconClick()}
			/>
		</div>
	) : (null)

}


export default EditColumn;
