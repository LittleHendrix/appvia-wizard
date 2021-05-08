import React from 'react';
import { Button, Spin, Result, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm } from '../context';
import { actions, pages } from '../config/appConfig';
import { Form, FormField } from '../components';
import { messenger } from './formHelpers';
import './styles.css';

export function FormContainer() {
  const [ online, setOnline ] = React.useState(true);
  const { state: { step, done, isLast, inputValues: ctxInputValues }, dispatch } = useForm();
  const id = Object.values(pages).find(p => p.step === step).id;

  const onlineCb = () => { 
    messenger('success', 'Application online', { key: 'network', duration: 2 });
    setOnline(true);
  }

  const offlineCb = () => {
    messenger('error', 'Experiencing network issues...', { key: 'network', duration: 2 });
    setOnline(false);
  }

  React.useEffect(() => {
    window.addEventListener('online', onlineCb);
    window.addEventListener('offline', offlineCb);
    return () => {
      window.removeEventListener('online', onlineCb);
      window.removeEventListener('offline', offlineCb);
      message.destroy('network');
    }
  },[]);

  if (done) {
    return (
      <Result
        status="success"
        title="Successfully submitted to Kore!"
        subTitle={Object.entries(ctxInputValues).filter(([, value]) => value !== '').map((entry, i) => <span key={i} className="result-item">{entry[0]}: <strong>{entry[1].toString()}</strong></span>)}
      />
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
        <Spin spinning={isSending} tip="Submitting..." indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
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
                loading={isEnabling} 
                disabled={!online} />)}
            <div className="form-row submit-row">
              {step > 0 && <Button id="prev" value="Go back" onClick={() => dispatch({ type: actions.PREV, payload: step })} disabled={isEnabling || !online}>Go back</Button>}
              {!isLast ? <Button type="primary" htmlType="submit" disabled={isEnabling || hasClientSideErr || !online}>Next</Button>
              : <Button type="primary" htmlType="submit" disabled={!online}>Submit</Button>}
            </div>
          </fieldset>
        </Spin>
      )}}
    </Form>
  )
}