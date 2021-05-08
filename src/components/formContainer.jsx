import React from 'react';
import { Button } from 'antd';
import { useForm } from '../context';
import { actions, pages } from '../config/appConfig';
import { Form, FormField } from '../components';
import './styles.css';

export function FormContainer() {

  const { state: { step, done, isLast }, dispatch } = useForm();
  const id = Object.values(pages).find(p => p.step === step).id;

  if (done) {
    return (
      <>
        <h1 className="success">Data submission successful</h1>
      </>
    )
  }

  return (
    <Form id={id}>
      {({
        userFormFields, 
        inputValues, 
        errors, 
        onChangeHandler, 
        isSending, 
        isEnabling, 
        hasClientSideErr
      }) => {
        return (
          <fieldset name={id}>
            {isLast && (
              <>
                <h1>Please review the summary below and submit if all information are correct.</h1>
                <ul>
                  {Object.entries(inputValues).filter(([, value]) => value !== '').map((entry, i) => <li key={i}>{entry[0]}: <strong>{entry[1].toString()}</strong></li>)}
                </ul>
              </>
            )}
            {userFormFields?.map((fieldProps, i) => 
              <FormField key={i} {...fieldProps} 
                value={inputValues[fieldProps.id]} 
                error={errors.get(fieldProps.id)} 
                onChangeHandler={onChangeHandler}
                loading={isEnabling} />)}
            <div className="form-row submit-row">
              {step > 0 && <Button id="prev" value="Go back" onClick={() => dispatch({ type: actions.PREV, payload: step })} disabled={isEnabling}>Go back</Button>}
              {!isLast ? <Button type="primary" htmlType="submit" loading={isSending} disabled={isEnabling || hasClientSideErr}>Next</Button>
              : <Button type="primary" htmlType="submit" loading={isSending}>Submit</Button>}
            </div>
          </fieldset>
      )}}
    </Form>
  )
}