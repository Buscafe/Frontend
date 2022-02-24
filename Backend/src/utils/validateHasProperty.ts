export function validateFields(obj: {}, ...validateFields: string[]){
    const validatedArr = validateFields.map((validateField, index) => {
        return {
            field: validateField,
            exists: obj.hasOwnProperty(validateField),
            empty: Object.values(obj)[index] === ''
        }
    });

    return validatedArr;
}