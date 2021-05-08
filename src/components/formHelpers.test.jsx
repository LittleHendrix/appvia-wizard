import React from 'react';
// import { render, cleanup, fireEvent } from '@testing-library/react';
import { validate } from './formHelpers';
import { pages, formFields } from '../config/appConfig';

describe('formHelpers - validate', () => {

    const userFormInputs = formFields[pages.USER.id];
    const validateCb = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return if no validationSchema is available for input', () => {
        const roleField = userFormInputs.find(i => i.id === 'role');
        const { validationSchema} = roleField;
        expect(validate('role', '', validationSchema, validateCb)).toBe(true);
        expect(validateCb).not.toHaveBeenCalled();
    });

    test('should validate name input correctly', () => {
        const nameField = userFormInputs.find(i => i.id === 'name');
        const { id, validationSchema} = nameField;
        expect(validate('name', '', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[0][1]);
        expect(validate('name', 'My name', validationSchema, validateCb)).toBe(true);
        expect(validateCb).toHaveBeenCalledWith(id, '');
    });

    test('should validate email input correctly', () => {
        const emailField = userFormInputs.find(i => i.id === 'email');
        const { id, validationSchema} = emailField;
        expect(validate('email', '', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[0][1]);
        expect(validate('email', 'mail@invalid', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[1][1]);
        expect(validate('email', 'mail@valid.com', validationSchema, validateCb)).toBe(true);
        expect(validateCb).toHaveBeenCalledWith(id, '');
    });

    test('should validate password input correctly - empty', () => {
        const passwordField = userFormInputs.find(i => i.id === 'password');
        const { id, validationSchema} = passwordField;
        expect(validate('password', '', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[0][1]);
    });

    test('should validate password input correctly - less than 9 chars', () => {
        const passwordField = userFormInputs.find(i => i.id === 'password');
        const { id, validationSchema} = passwordField;
        expect(validate('password', 'tooshort', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[1][1]);
    });

    test('should validate password input correctly - missing UPPERCASEW or lowercase char', () => {
        const passwordField = userFormInputs.find(i => i.id === 'password');
        const { id, validationSchema} = passwordField;
        expect(validate('password', 'nouppercase', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[2][1]);
        expect(validate('password', 'NOLOWERCASE', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[2][1]);
    });

    test('should validate password input correctly - missing number', () => {
        const passwordField = userFormInputs.find(i => i.id === 'password');
        const { id, validationSchema} = passwordField;
        expect(validate('password', 'ONLYletters', validationSchema, validateCb)).toBe(false);
        expect(validateCb).toHaveBeenCalledWith(id, validationSchema[3][1]);
    });
});
