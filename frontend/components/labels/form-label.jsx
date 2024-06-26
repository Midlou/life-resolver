import React, { Fragment, useState } from 'react';
import { usePopper } from 'react-popper'
import { Popover, Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import If from '../conditionals/if';

const LabelElement = ({ children, required, className = '' }) => {
	return <label className={`${className} text-slate-600 font-bold mb-1`}>
		{children}
		{
			required ? <span className='text-red-600'>*</span> : null
		}
	</label>
}

const FormLabel = ({ children = '', isRequired = false, helper = null, ...props }) => {
	let [referenceElement, setReferenceElement] = useState()
	let [popperElement, setPopperElement] = useState()
	let { styles, attributes } = usePopper(referenceElement, popperElement)

	return <div className='flex flex-row justify-between'>
		<LabelElement required={isRequired}>
			{children}
		</LabelElement>
		<If render={helper} body={() => {
			return <Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button ref={setReferenceElement} className={"outline-none w-full"}>
							<span className={`${open ? 'animate-pulse' : ''} font-bold default-focus-light`}>
								<QuestionMarkCircleIcon className={`${open ? 'text-blue-600' : 'text-slate-700'} w-5 h-5 stroke-[2.5] hover:text-blue-600`} />

								{/* <svg className={`${open ? 'fill-blue-600' : 'fill-slate-700'} w-5 h-5 stroke-2 hover:fill-blue-600`} viewBox="0 0 91.999 92">
							<path d="M45.385,0.004C19.982,0.344-0.334,21.215,0.004,46.619c0.34,25.393,21.209,45.715,46.611,45.377  c25.398-0.342,45.718-21.213,45.38-46.615C91.655,19.986,70.785-0.335,45.385,0.004z M45.249,74l-0.254-0.004  c-3.912-0.116-6.67-2.998-6.559-6.852c0.109-3.788,2.934-6.538,6.717-6.538l0.227,0.004c4.021,0.119,6.748,2.972,6.635,6.937  C51.903,71.346,49.122,74,45.249,74z M61.704,41.341c-0.92,1.307-2.943,2.93-5.492,4.916l-2.807,1.938  c-1.541,1.198-2.471,2.325-2.82,3.434c-0.275,0.873-0.41,1.104-0.434,2.88l-0.004,0.451H39.429l0.031-0.907  c0.131-3.728,0.223-5.921,1.768-7.733c2.424-2.846,7.771-6.289,7.998-6.435c0.766-0.577,1.412-1.234,1.893-1.936  c1.125-1.551,1.623-2.772,1.623-3.972c0-1.665-0.494-3.205-1.471-4.576c-0.939-1.323-2.723-1.993-5.303-1.993  c-2.559,0-4.311,0.812-5.359,2.478c-1.078,1.713-1.623,3.512-1.623,5.35v0.457H27.935l0.02-0.477  c0.285-6.769,2.701-11.643,7.178-14.487C37.946,18.918,41.446,18,45.53,18c5.346,0,9.859,1.299,13.412,3.861  c3.6,2.596,5.426,6.484,5.426,11.556C64.368,36.254,63.472,38.919,61.704,41.341z" />
						</svg> */}
							</span>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel ref={setPopperElement}
								style={styles.popper}
								{...attributes.popper}
								className="z-10 w-screen max-w-sm px-4 sm:px-0">

								<div className="overflow-hidden rounded shadow ring-1 ring-black ring-opacity-5">
									<div className="bg-slate-700 text-white p-4">
										<span className="transition duration-150 ease-in-out">
											<div className="font-semibold text-gray-200 text-justify">
												{helper}
											</div>
											<Popover.Button className='hover:underline font-bold mt-4'>
												Fechar
											</Popover.Button>
										</span>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		}} />
	</div>

}

export default FormLabel;

