import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import PublicNavbar from "../navbars/public-navbar";

import { AppProvider } from "../../shared/contexts/app.context";

const MainLayout = ({ title, Component, ...props }) => {
    let user = props.user;
    return <AppProvider>
        <ToastContainer position='bottom-left' autoClose={5000} theme="colored" />

        <Helmet>
            <title>{`${title} - ${props.app_name}`}</title>
        </Helmet>

        <header>
            <PublicNavbar title={title} {...props} />
        </header>
        <main className="bg-gray-100 min-h-screen">
            {Component}
        </main>
    </AppProvider>
}

export default MainLayout;
