import * as yup from 'yup';

const handleConfirmPasswordYup = (refString: string) => {
    return yup
        .string()
        .required('Trường này là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 ký tự')
        .max(160, 'Độ dài từ 6 - 160 ký tự')
        .oneOf([yup.ref(refString)], 'Nhập lại mật khẩu không khớp');
};

export const authSchema = yup.object({
    email: yup
        .string()
        .email('Đây không phải email')
        .required('Trường này là bắt buộc')
        .min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
    password: yup.string().required('Trường này là bắt buộc').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
    confirmPassword: handleConfirmPasswordYup('password'),
});

export const repairInfoUserSchema = yup.object({
    emailPersonal: yup.string().email('Đây không phải email'),
    email: yup.string().email('Đây không phải email').required('Trường này là bắt buộc'),
    gender: yup.string().required('Trường này là bắt buộc'),
    birthday: yup.string().required('Trường này là bắt buộc'),
    phoneNumber: yup.string().required('Trường này là bắt buộc').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
    residenceAddress: yup.string().required('Trường này là bắt buộc').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
    typeUser: yup.string().required('Trường này là bắt buộc').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
    contractType: yup.string().required('Trường này là bắt buộc').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
    group: yup.string().required('Trường này là bắt buộc').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
    maritalStatus: yup.string(),
    stateAccount: yup.string(),
    password: yup.string().required('Trường này là bắt buộc').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
    name: yup.string().required('Trường này là bắt buộc').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
    userManager: yup.string().required('Trường này là bắt buộc').min(6, 'Vui lòng nhập tối thiểu 6 ký tự'),
});

export type AuthSchema = yup.InferType<typeof authSchema>;
export type RepairInfoUserSchema = yup.InferType<typeof repairInfoUserSchema>;
