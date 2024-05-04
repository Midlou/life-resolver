import React from 'react';

import BtnSuccess from '../buttons/success';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const RefreshBtn = ({ performRequest = false, loading = false }) => {
    function performReload(ev) {
        if (loading) return;

        ev.stopPropagation();
        performRequest();
    }

    return <BtnSuccess className={loading ? 'cursor-not-allowed' : ''} onClick={performReload}>
        {
            loading
                ? <ArrowPathIcon className='animate-spin w-6 h-6' />
                : <ArrowPathIcon className='w-6 h-6' />
        }
    </BtnSuccess>
}

export default RefreshBtn;
