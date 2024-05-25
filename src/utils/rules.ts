import * as yup from 'yup';

const handleConfirmPasswordYup = (refString: string) => {
    return yup
        .string()
        .required('Confirm Password is a required field')
        .min(6, 'Length from 6 - 160 characters')
        .max(160, 'Length from 6 - 160 characters')
        .oneOf([yup.ref(refString)], 'Re-enter the password does not match');
};

export const authSchema = yup.object({
    email: yup
        .string()
        .email('This is not an email')
        .required('Email is a required field')
        .min(4, 'Email must be at least 4 characters'),
    password: yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters'),
    confirmPassword: handleConfirmPasswordYup('password'),
});

export const repairInfoUserSchema = yup.object({
    emailPersonal: yup.string().email('This is not an email'),
    phoneNumber: yup.string().required('This is a required field').min(6, 'This field must be at least 6 characters'),
    residenceAddress: yup
        .string()
        .required('This is a required field')
        .min(6, 'This field must be at least 6 characters'),
    typeUser: yup.string().required('This is a required field').min(6, 'This field must be at least 6 characters'),
    contractType: yup.string().required('This is a required field').min(6, 'This field must be at least 6 characters'),
    group: yup.string().required('This is a required field').min(6, 'This field must be at least 6 characters'),
    maritalStatus: yup.string(),
    stateAccount: yup.string(),
});

export type AuthSchema = yup.InferType<typeof authSchema>;
export type RepairInfoUserSchema = yup.InferType<typeof repairInfoUserSchema>;
