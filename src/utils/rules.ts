import * as yup from 'yup';

export const authSchema = yup.object({
    email: yup
        .string()
        .email('Email is a required field 1123')
        .required('Email is a required field')
        .min(4, 'Email must be at least 4 characters'),
    password: yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters'),
});

export type AuthSchema = yup.InferType<typeof authSchema>;
