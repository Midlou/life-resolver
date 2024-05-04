import AlertModal from "./alert-modal";
import React, { createContext, useState } from "react";

const AlertModalContext = createContext({
    confirm: (title, message, onConfirm = null, onCancel = null) => { },
    show: (title, message) => { },
    danger: (title, message, isHtml = false) => { },
    success: (title, message) => { },
});

const { Provider } = AlertModalContext;

const AlertModalProvider = ({ children = null }) => {

    const [alertAttributes, setAlertAttributes] = useState(false);

    const setProperty = (key, name) => {
        setAlertAttributes(oldState => ({
            ...oldState,
            [key]: name
        }));
    }

    const closeModal = () => setProperty('isOpened', false);

    const onRequestCancel = () => {
        closeModal();
        alertAttributes?.onCancel();
    }

    const onRequestClose = () => {
        closeModal();
    }

    const onRequestConfirm = () => {
        closeModal();
        alertAttributes?.onConfirm();
    }

    const success = (title, message) => {
        setAlertAttributes({
            isOpened: true,
            type: 'success',
            message,
            title
        });
    }

    const danger = (title, message, isHtml = false) => {
        setAlertAttributes({
            isOpened: true,
            type: 'danger',
            title,
            message,
            isHtml
        });
    }

    const show = (title, message) => {
        setAlertAttributes({
            isOpened: true,
            type: 'default',
            title,
            message
        });
    }

    const confirm = (title, message, onConfirm = () => { }, onCancel = () => { }) => {
        setAlertAttributes({
            type: 'confirm',
            isOpened: true,
            onConfirm,
            onCancel,
            title,
            message
        });
    }

    return <Provider value={{ confirm, show, danger, success }}>
        {children}
        <AlertModal opened={alertAttributes?.isOpened}
            {...{
                ...alertAttributes,
                onRequestClose,
                onRequestCancel,
                onRequestConfirm
            }}
        />
    </Provider>
}

export { AlertModalProvider, AlertModalContext };
