import * as yup from 'yup';

export type UserInfo = {
    id: string;
    email: string;
    phone?: string;
    address?: string;
};

export const userAuthInfoSchema = yup.object({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required').min(8),
    orders: yup.array(yup.string()),
});

export type UserAuthInfo = yup.InferType<typeof userAuthInfoSchema>;

export const updateUserInfoSchema = yup.object({
    email: yup.string(),
    phone: yup.string(),
    address: yup.string(),
    oldPassword: yup.string().min(8, 'Must be at least 8 characters'),
    newPassword: yup.string().when(['oldPassword'], {
        is: (oldPassword: string) => !!oldPassword,
        then: yup
            .string()
            .required('New password is required')
            .min(8, 'Must be at least 8 characters'),
    }),
});

export type UpdateUserInfoSchema = yup.InferType<typeof updateUserInfoSchema>;

export const forgotPasswordSchema = yup.object({
    email: yup.string().required('Email is required').email('Email is invalid'),
});

export type ForgotPasswordInfo = {
    email: string;
    success?: string;
    fail?: string;
};

export const signUpInfoSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Email is required'),
    msg: yup.string(),
    password: yup.string().when(['msg'], {
        is: (msg: string) => !!msg,
        then: yup
            .string()
            .required('Password is required')
            .min(8, 'Must be at least 8 characters'),
    }),
});

export type SignUpInfo = {
    email: string;
    msg?: string;
    password?: string;
};
