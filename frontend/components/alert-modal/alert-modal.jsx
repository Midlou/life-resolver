import React from "react";

import Modal from "../modal/modal";
import { ExclamationCircleIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

// import { parse_html } from "../../shared/helpers";

const Success = ({ message = '' }) => {
    return <div className="flex flex-col justify-center items-center">
        <CheckCircleIcon className="green-500"/>
        <h5 className='text-default'>{message}</h5>
    </div>
}

const Danger = ({ message = '', isHtml = false }) => {
    return <div className="flex flex-col justify-center items-center">
        <XCircleIcon className="red-600"/>
        {/* {isHtml ? <h5 className='text-default'>{parse_html(message)}</h5> : null} */}
        {!isHtml ? <h5 className='text-default'>{message}</h5> : null}
    </div>
}

const Default = ({ message = '' }) => {
    return <div className="flex flex-col justify-center items-center">
        <ExclamationCircleIcon className="gray-600"/>
        <h5 className='text-default'>{message}</h5>
    </div>
}

const Footer = ({ confirmBtnText = 'Confirmar', cancelBtnText = 'Cancelar', onConfirm = () => { }, onCancel = () => { } }) => {
    return <>
        <button className="inline-flex justify-center mr-2 text-sm font-medium text-blue-900 bg-blue-100 rounded-sm p-3 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            type="button" onClick={onConfirm}>
            {confirmBtnText}
        </button>
        <button className="inline-flex justify-center text-sm font-medium text-gray-900 bg-gray-100 rounded-sm p-3 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            type="button" onClick={onCancel}>
            {cancelBtnText}
        </button>
    </>
}

const AlertModal = ({ type = 'default', isHtml = false, opened = false, message = '', title = '', onRequestClose, onRequestCancel, onRequestConfirm }) => {

    // return <Modal {...{ onRequestClose, opened, title: isHtml ? parse_html(title) : title }}
    return <Modal {...{ onRequestClose, opened, title: title }}
        footer={type === 'confirm' ? <Footer onConfirm={onRequestConfirm} onCancel={onRequestCancel} /> : null}>
        {type === 'success' ? <Success {...{ message }} /> : null}
        {type === 'danger' ? <Danger {...{ message, isHtml }} /> : null}
        {type === 'default' ? <Default {...{ message }} /> : null}
        {type === 'confirm' ? <Default {...{ message }} /> : null}
    </Modal>
}

export default AlertModal;
