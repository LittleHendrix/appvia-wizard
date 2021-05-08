
/**
 * 
 * @param {string} key 
 * @param {string} value 
 * @param {object} schema - schema to validate against value
 * @param {function} cb - (key, errMsg) => {}
 * @returns boolean - returns true if input is valid
 */
export const validate = (key, value, schema, cb) => {
    if (!schema) return true;
    let noErrors = false;
    for (let [rgx, errMsg] of schema) {
        noErrors = value.match(rgx) !== null;
        if (cb) {
            noErrors ? cb(key, '') : cb(key, errMsg);
        }
        if (!noErrors) {
            // break as soon as one condition fails to prevent overwriting error message
            break;
        }
    }
    return noErrors;
}

/**
 * 
 * @param {object} obj 
 * @param {(string|null|undefined)} rule 
 * @returns object
 */
export const cleanObj = (obj, rule = '') => {
    const objCp = {...obj};
    for (let prop in objCp) {
        if (objCp[prop] === rule) {
            delete objCp[prop];
        }
    }
    return objCp;
}