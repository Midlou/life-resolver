import React from 'react'
import { render } from 'react-dom'
import 'react-toastify/dist/ReactToastify.css';
import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/inertia-react'

require('./bootstrap');

InertiaProgress.init({
    color: '#6366f1',
    includeCSS: true,
    showSpinner: false,
});

createInertiaApp({
    resolve: name => require(`./modules/${name}`),
    setup({ el, App, props }) {
        render(<App {...props} />, el)
    },
})
