import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { validate } from '../../../shared/helpers/validation';

const validations = {
	login: {
        message: <span>O campo <b>e-mail, CPF ou CNPJ</b> não pode ficar vazio!</span>,
        condition: (state) => state.login
    },
    password: {
        message: <span>O campo <b>senha</b> não pode ficar vazio!</span>,
        condition: (state) => state.password
    }
};

function indexController(props) {
    const [credentials, setCredentials] = useState({});

    const setProperty = (key, value) => {
        setCredentials(state => ({ ...state, [key]: value }));
    }

    function setLoading(isLoading) {
        setProperty('loading', isLoading);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        try {
            validate(credentials, validations);
            await Inertia.post('/login', credentials, { onError });
        } catch (errors) {
            setLoading(false);
            toast.error(_.head(errors));
        }
    }

    function onError(err) {
        setLoading(false);
        if (props?.errors) toast.error("Algo deu errado");
    }

    return {
        credentials,
        setProperty,
        handleSubmit
    };
}

export default indexController;
