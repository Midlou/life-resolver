import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';
import ContainerFlex from '../../components/containers/container-flex';
import MainLayout from '../../components/layouts/main';

import { MENU_ITEMS } from '../../shared/constants/constants';

const pageTitle = "Painel";
const PageContent = ({ app_name, ...props }) => {
    return <ContainerFlex className='flex-col gap-y-8'>
        <div className="flex justify-center mt-5">
            <span className="font-semibold text-3xl font-mono text-gray-700">
                Bem-vindo ao {app_name}!
            </span>
        </div>
        <div className='flex justify-center'>
            <ul className="rounded-lg border border-gray-200 w-96">
                {
                    MENU_ITEMS.map((page, index) => {
                        return <InertiaLink key={page?.value || index} as="li" href={page.link} method="get" tabIndex={0}
                            className={`
                                ${pageTitle === page.label ? " border-indigo-500 bg-slate-200 " : " hover:border-indigo-500 "}
                                px-6 py-2 w-full border-l-4 cursor-pointer hover:bg-slate-200 default-focus-light bg-white
                            `}>

                            {page.label}
                        </InertiaLink>
                    })
                }
            </ul>
        </div>
    </ContainerFlex>
}

export default (props) => <MainLayout {...props} title={pageTitle} Component={<PageContent {...props} />} />;
