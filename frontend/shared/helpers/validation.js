import { toast } from "react-toastify";

// const defaultParseOptions = {
//     defaultComp: <span></span>,
//     exception_fields: [
//         { attribute: '', template: 'some text :attribute some' }
//     ]
// };

export const parseValidationErrors = (err) => {
    let errors = _.get(err, 'errors');
    let list = [];
    for (let error in errors) {
        let message = errors[error] || '';

        if (!message) continue;

        list.push(<li key={error}>{_.isArray(message) ? message[0] : message}</li>);
    }
    if (!list.length) return null;

    return [<ul>{list}</ul>];
}

// export const handleOnError = (err, shouldToast = false, setValidationErrors = () => { }) => {
//     if (err?.type === 'validation_error') return toast.error(err.component);

//     // let backendErrors = getErrorCompoments(err, {
//     //     defaultComp: <span>Algo deu errado</span>
//     // });

//     if (shouldToast) {
//         _.map(errors, (message, key) => <AlertDanger key={key}>{message}</AlertDanger>)
//     }

//     // setValidationErrors(backendErrors);
// }

// export const getErrorCompoments = (err, options = defaultParseOptions) => parseValidationErrors(err, options);

export const validate = (state, validations = []) => {
    let errors = [];
    _.each(validations, (properties, key) => {
        let customCondition = properties.condition && !properties.condition(state);
        // let defaultCondition = state[key];

        // if (customCondition || !defaultCondition) errors.push(properties.message);
        if (customCondition) errors.push(properties.message);
    });

    if (errors.length) throw errors;
}

export const toastPropErrors = (errors) => {
    if (!errors) return;

    let toToast = [];
    _.each(errors, (message, key) => toToast.push(message))

    if (toToast[0]) toast.error(toToast[0]);
}
