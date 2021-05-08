import React from 'react';

import { initialState } from '../config/appConfig';
import { reducer } from './reducer';

const FormContext = React.createContext();

function FormProvider({ children }) {
    const [ state, dispatch ] = React.useReducer(reducer, initialState);
    return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider> 
}

function useForm() {
    const formCtx = React.useContext(FormContext);
    if (formCtx === undefined) {
        throw new Error('useForm must be used within a FormProvider!');
    }
    return formCtx;
}

export { FormProvider, useForm }