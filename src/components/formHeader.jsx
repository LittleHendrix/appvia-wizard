import React from 'react';
import { useForm } from '../context';
import { pages } from '../config/appConfig';
import { Steps } from 'antd';

export function FormHeader() {
    const { Step } = Steps;
    const { state: { step: ctxStep } } = useForm();
    return (
        <Steps current={ctxStep}>
            {Object.entries(pages).map(([key, {label, description }]) => <Step key={key} title={label} description={description} />)}
        </Steps>
    )
}