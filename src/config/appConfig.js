export const actions = {
    SUMMARY: 'SUMMARY',
    REVIEW: 'REVIEW',
    FEATURES: 'FEATURES',
    USER: 'USER',
    ERROR: 'ERROR',
    NEXT: 'NEXT',
    PREV: 'PREV'
}

/**
 * add additional pages and specify the step prop
 */
export const pages = {
    USER: { step: 0, id: 'USER', label: 'Step 1', description: 'User details' },
    FEATURES: { step: 1, id: 'FEATURES', label: 'Step 2', description: 'Feature selections' },
    REVIEW: { step: 2, id: 'REVIEW', label: 'Step 3', description: 'Review: input verification' }
}

const pagesMap = Object.values(pages).sort((a, b) => a.step - b.step).map(page => page.id);

/**
 * form config object
 * add additional fields to a form, or an additional form
 * make sure the {key} value matches what is specified in pages object
 */
export const formFields = {
    [pages.USER.id]: [
        { id: 'name', label: 'Name', type: 'text', required: true, validationSchema: [
            [/.*\S/g, 'Name field is required.'],
            [/^[a-zA-Z_-\s]{1,63}$/g, 'Name must be between 1 and 63 alphabetic characters long.' ]
        ] },
        { id: 'description', label: 'Description', type: 'textarea', required: false, validationSchema: null }
        // { id: 'password', label: 'Password', type: 'password', required: true, validationSchema: [
        //     [/.*\S/g, 'This field is required.'],
        //     [/[A-Za-z0-9]{9,}$/g, 'Password must contain at least 9 characters.'],
        //     [/^(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9]{9,}$/g, 'Password must contain at least one UPPERCASE and one lowercase character.'],
        //     [/^(?=.*[0-9])[A-Za-z0-9]{9,}$/g, 'Password must contain at least one number.'],
        // ] },
    ],
    [pages.FEATURES.id]: [
        { id: 'koreAWS', label: 'Enable Kore AWS console.', type: 'switch', required: false, validationSchema: null },
        { id: 'koreGCP', label: 'Enable Kore GCP console.', type: 'switch', required: false, validationSchema: null },
        { id: 'koreAzure', label: 'Enable Kore Azure console.', type: 'switch', required: false, validationSchema: null },
        { id: 'koreNews', label: 'Opt-in to receive Kore monthly newsletter.', type: 'switch', required: false, validationSchema: null }
    ],
    [pages.REVIEW.id]: [],
}

/**
 * create an obj from each step form, with each field id as key
 * use to populate initial state
 *  { name: '', description: '', koreAWS: '', ... }
 */
const formFieldsObject = Object.keys(formFields).reduce((result, formKey) => (
                                        {...result, ...formFields[formKey].reduce((allFields, current) => ({...allFields, [current.id]: '' }), {})}
                                    ), {});

export const initialState = {
    pagesMap,
    step: pages.USER.step,
    done: false,
    isLast: false,
    errors: new Map(),
    inputValues: formFieldsObject
}

export const fetchOpts = {
    POST: {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
}