import { actions } from '../config/appConfig';

const previous = (current, length = 1) => (current - 1 + length) % length;

const next = (current, length = 1) => (current + 1) % length;

export function reducer(state, action) {
    switch (action.type) {
        case actions.SUMMARY:
            return { ...state, done: true };
        case actions.REVIEW:
            return { ...state, isLast: true };
            case actions.USER:
            case actions.FEATURES:
                return {...state, inputValues: { ...state.inputValues, ...action.payload } };
                // return {...state, inputValues: { ...state.inputValues, ...Object.fromEntries(action.payload)} };
        case actions.ERROR:
            // overwrite prev errors Map so React can compare state correctly
            return { ...state, errors: new Map(state.errors.set(action.payload.key, action.payload.value)) };
        case actions.NEXT:
            const nextStep = next(state.step, state.pagesMap.length );
            return { ...state, step: nextStep, isLast: nextStep === state.pagesMap.length - 1 }
        case actions.PREV:
            return { ...state, step: previous(state.step, state.pagesMap.length ), isLast: false }
        default:
            throw new Error(`Invalid action type: "${action.type}"`);
    }
}