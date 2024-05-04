import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";


export default function DrawerItem({ children, isOpen = false, link = "/", isCurrent = false }) {
    return <InertiaLink as="button" href={link}
        className={`
            ${isCurrent ? "bg-slate-700 border-indigo-500" : "hover:bg-slate-700 hover:border-indigo-500 border-slate-600"}
            flex items-center p-2 text-lg font-normal text-white border-l-4 default-focus-light
        `} tabIndex={isOpen ? 0 : -1}>
        {children}
    </InertiaLink>;
}
