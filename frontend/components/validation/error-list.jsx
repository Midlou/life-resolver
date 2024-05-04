import _ from 'lodash';
import React from 'react';
import AlertDanger from '../alerts/danger';

function getErrors(errors) {
    if (!errors) return null;

    return _.map(errors, (message, key) => <AlertDanger key={key}><b>{message}</b></AlertDanger>)
}

const ErrorList = ({ errors = [], ...props }) => {
    return getErrors(errors);
}

export default ErrorList;
