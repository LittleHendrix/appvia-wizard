import React from 'react';
import { useForm } from '../context';
import { actions, formFields, fetchOpts } from '../config/appConfig';
import { validate, cleanObj } from './formHelpers';

export function Form({children, id}) {
    const { state, dispatch } = useForm();
    const [ isSending, setIsSending ] = React.useState(false);
    const [ isEnabling, setIsEnabling ] = React.useState();
    const { errors, step, isLast, inputValues: ctxInputValues } = state;
    const [ inputValues, setInputValues ] = React.useState(ctxInputValues);
    const userFormFields = formFields[id];
    
    const dispatchErrors = (key, errMsg) => {
        dispatch({ type: actions.ERROR, payload: { key, value: errMsg }});
    }
    // find if any errors exists for inputs in the current form
    const formErr = [...errors.entries()]
        .filter(([key, errMsg]) => Object.keys(inputValues).includes(key) && errMsg !== '' && !errMsg.toLowerCase().includes('server'));
    const hasClientSideErr = formErr.length > 0;

    const baseURL = `http://localhost:9000${import.meta.env.BASE_URL}`;
    
    const handleSubmit = event => {
        event.preventDefault();
        setIsSending(true);

        const data = new FormData(event.target);

        // validate all form input entries 
        for (let [key, value] of data.entries()) {
            const validationSchema = userFormFields.find(f => f.id === key).validationSchema;
            if (validationSchema) validate(key, value, validationSchema, dispatchErrors);
        }
        
        if (!hasClientSideErr) {
            const url = isLast ? `${baseURL}${import.meta.env.VITE_API_SUMMARY}` : `${baseURL}${import.meta.env.VITE_API_VALIDATE}`;
            const plainFormData = isLast ? { ...cleanObj(ctxInputValues), pass: true } : Object.fromEntries(data.entries());
            // process Switch differently than other native form inputs
            if (id === actions.FEATURES) {
                // progress to the next step directly (simulate 1s delay)
                setTimeout(() => {
                    setIsSending(false);
                    dispatch({ type: actions.NEXT, payload: step })
                }, 1000);
            } else {
                // call validate on remote
                fetch(url,{
                    ...fetchOpts.POST,
                    body: JSON.stringify(plainFormData)
                }).then(response => {
                    setIsSending(false);
                    if (!response.ok) {
                        return response.json().then(res => { throw new Error(res.error) })
                    }
                    return response.json()
                }).then(jsonRes => {
                    const { isValid, success, processedData } = jsonRes;
                    if (isValid || success) {
                        setIsSending(false);
                        dispatchErrors('name', '');
                        if (isLast) {
                            dispatch({ type: actions.SUMMARY });
                        } else {
                            setInputValues({ ...inputValues, ...processedData });
                            dispatch({ type: actions[id], payload: processedData });
                            // progress to the next step
                            setTimeout(() => {
                                dispatch({ type: actions.NEXT, payload: step })
                            }, 100);
                        }
                    }
                }).catch(err => {
                    console.error(err);
                    dispatchErrors('name', err.message);
                });
            }
        } else {
            setIsSending(false);
        }

    }

    const onChangeHandler = (key, e) => {
        let value = e;
        if (e.target) {
            value = e.target.value;
        }
        setInputValues({ ...inputValues, [key]: value });

        const { validationSchema, type } = userFormFields.find(f => f.id === key) || {};
        if (validationSchema) {
            const validateTimeoutId = setTimeout(() => {
                clearTimeout(validateTimeoutId);
                validate(key, value, validationSchema, dispatchErrors);
            }, 100);
        } else if (type === 'switch') {
            // handle onChange for Switch
            setIsEnabling(key);
            const url = `${baseURL}${import.meta.env.VITE_API_FEATURES}`;
            // call enable feature on remote
            fetch(url,{
                ...fetchOpts.POST,
                body: JSON.stringify({ key: key, value: value })
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(res => {
                        setIsEnabling(false);
                        setInputValues({ ...inputValues, [key]: '' });
                        throw new Error(res.error);
                    })
                }
                return response.json()
            }).then(jsonRes => {
                const { isSetable } = jsonRes;
                console.log(`is ${key} Setable? `, isSetable)
                setIsEnabling(false);
                dispatchErrors(key, '');
                setInputValues({ ...inputValues, [key]: isSetable });
            }).catch(err => {
                console.error(err);
                dispatchErrors(key, err.message);
            });
        }
    }
    
    return (
        // bypass native HTML5 validation attributes (e.g. required, minlenght, pattern, .etc) and handle errors ourselves
        <form id={id} autoComplete="off" onSubmit={handleSubmit} noValidate>
            {children({ userFormFields, inputValues, errors, onChangeHandler, isSending, isEnabling, hasClientSideErr })}
        </form>
    )
}