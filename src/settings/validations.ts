import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 6 characters')
    .max(20, 'User name must not exceed 20 characters'),
  email: Yup.string().required('Email is reuqired').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must not exceed 15 characters'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Confirm password does not match'),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is reuqired').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must not exceed 15 characters'),
});
