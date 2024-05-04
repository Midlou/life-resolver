import React from "react";
import { Helmet } from 'react-helmet';
import { ToastContainer } from "react-toastify";

const GuestLayout = ({ title, Component, app_name, ...props }) => {
    return <>
        <ToastContainer position='bottom-left' autoClose={5000} theme="colored" />

        <Helmet>
            <title>{`${title} - ${app_name}`}</title>
        </Helmet>

        <main>
            {Component}
        </main>
    </>
}

export default GuestLayout;
