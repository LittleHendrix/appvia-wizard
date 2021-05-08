import React from 'react';
import { Input, Switch, Alert, Tooltip } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const Field = ({ type, ...restProps}) => {
  const { TextArea } = Input;
  switch (type) {
      case 'switch':
        return <Switch {...restProps} />
      case 'textarea':
        return <TextArea {...restProps} />
      default:
        return <Input {...restProps} />
    }
}

export const FormField = ({ id, label, type, required, error, value, onChangeHandler, loading }) => {
  const isSwitch = type === 'switch';
  const isTextarea = type === 'textarea';
  
  const fieldProps = {
    type,
    id, 
    name: id, 
    required, 
    onChange: e => onChangeHandler(id, e),
    className: error ? 'error' : '',
    ...(isSwitch ? { checked: value } : { value: value }),
    ...(isSwitch && { checkedChildren: <CheckOutlined />, unCheckedChildren: <CloseOutlined />, loading: loading === id }),
    ...(isTextarea && { row: 8 })
  };

  return (
    <div className="form-row">
      <div className={isSwitch ? 'field-container checkbox' : 'field-container'} data-testid={`${id}-input`}>
        <div className="label-container">
          {id === 'name'
            ? <Tooltip title="Name must not exceed 63 characters in length"><label htmlFor={id}>{label}</label></Tooltip> 
            : <label htmlFor={id}>{label}</label>}
          {required && <sup>*</sup>}
        </div>
        <Field {...fieldProps} />
      </div>
      {error && <Alert message={error.msg} type="error" showIcon data-testid={`${id}-error`} />}
    </div>
  )
}