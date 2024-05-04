import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

// Set datepicker locate
import pt from 'date-fns/locale/pt';
import { registerLocale, setDefaultLocale } from "react-datepicker";

registerLocale('pt', pt);
setDefaultLocale('pt');

import If from "../conditionals/if";
import NavBar from "../navbars/navbar";
import Drawer from "../navbars/drawer";
import DrawerItem from "../navbars/drawerItem";

import { MENU_ITEMS } from "../../shared/constants/constants";

const MainLayout = ({ title, Component, app_name, ...props }) => {
    const [isDrawerOpen, setDrawerIsOpen] = useState(false);

    let user = props.user;
    return <>
        <ToastContainer position='bottom-left' autoClose={5000} theme="colored" />

        <Helmet>
            <title>{`${title} - ${app_name}`}</title>
        </Helmet>

        <header>
            <NavBar title={title} setDrawerIsOpen={setDrawerIsOpen} {...props} />
        </header>
        <main className="bg-gray-100 min-h-screen">
            {Component}
        </main>

        <If render={user} body={() => {
            return <Drawer title={title} isOpen={isDrawerOpen} setIsOpen={setDrawerIsOpen}>
            {
                MENU_ITEMS.map((page, index) => {
                    return <DrawerItem key={page?.value || index} link={page.link} isCurrent={title === page.label} isOpen={isDrawerOpen}>
                        {page.label}
                    </DrawerItem>
                })
            }
            </Drawer>
        }} />
    </>
}

export default MainLayout;
