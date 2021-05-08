import { renderHook } from '@testing-library/react-hooks'
import { useForm } from './context';

describe('context', () => {
    test('useForm -> should throw error when used outside FormProvider', () => {
        const { result } = renderHook(() => useForm());
        expect(() => result.current).toThrowError('useForm must be used within a FormProvider!');
    });
});