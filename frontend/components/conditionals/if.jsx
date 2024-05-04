import React from 'react';

const If = ({ render = false, body }) => {
    return render ? body() : null;
}

export default If;
