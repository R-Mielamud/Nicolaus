const PARTIAL_REGEX = /^[0-9]{0,9}$/;
const FULL_REGEX = /^[0-9]{9}$/;

export const partialTelephoneValid = (telephone: string) => {
    return PARTIAL_REGEX.test(telephone);
};

export const fullTelephoneValid = (telephone: string) => {
    return FULL_REGEX.test(telephone);
};
