export function getErrors(errors, fieldName) {

    return errors && (errors?.data?.errors?.[fieldName]?.[0] ?? false);
}

