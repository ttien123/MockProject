import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DialogCst from 'src/components/DialogCst';
import Input from 'src/components/Input';
import Logo from 'src/components/Logo/Logo';
import path from 'src/constants/path';
import { setListAccount } from 'src/state/ListAccount.slide';
import { RootState } from 'src/store';
import { AuthSchema, authSchema } from 'src/utils/rules';

export type FormDataLogin = Pick<AuthSchema, 'password' | 'confirmPassword'>;
const ResetPasswordSchema = authSchema.pick(['password', 'confirmPassword']);

const ChangePasswordPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const ListAccount = useSelector((state: RootState) => state.ListAccountSlide.ListAccount);
    const emailForgot = useSelector((state: RootState) => state.ListAccountSlide.emailForgot);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataLogin>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(ResetPasswordSchema),
    });
    console.log(emailForgot);

    const onSubmit = handleSubmit((data) => {
        const newListAccount = ListAccount.map((item) => {
            if (item.email === emailForgot) {
                return { ...item, password: data.password };
            } else {
                return item;
            }
        });
        dispatch(setListAccount(newListAccount));
        setOpen(true);
    });
    return (
        <div className="h-screen flex flex-col bg-black ">
            <DialogCst
                open={open}
                ContentModal={
                    <div className="text-black">
                        <h3 className="text-black text-[30px] font-semibold text-center mb-2">
                            Change your password successfully
                        </h3>
                    </div>
                }
                ButtonClose={
                    <Link
                        to={path.login}
                        className="flex items-center justify-center h-[48px] font-medium text-black text-center bg-[#FFCC46] hover:bg-colorWeb w-full rounded-full"
                    >
                        Back To Login
                    </Link>
                }
            />
            <Link to={path.login} className="pl-[74px] py-[32px] bg-[#121212]">
                <Logo />
            </Link>
            <div className="flex-1 bg-bgAuth flex justify-center ">
                <div className="w-full max-w-[350px]">
                    <h1 className="text-[32px] font-semibold text-center mt-[32px] mb-4">Change your password</h1>
                    <div className="mb-4 font-medium">Please enter a new password with at least 6 characters</div>
                    <form onSubmit={onSubmit}>
                        <div>
                            <Input
                                register={register}
                                name="password"
                                type="password"
                                labelName="New password"
                                placeholder="Your password"
                                errorsMessage={errors.password?.message}
                            />
                        </div>
                        <div>
                            <Input
                                register={register}
                                type="password"
                                name="confirmPassword"
                                labelName="Confirm password"
                                placeholder="confirm your password"
                                errorsMessage={errors.confirmPassword?.message}
                            />
                        </div>
                        <Link to={''} className="underline hover:text-[#FFCC46]">
                            Need support?
                        </Link>
                        <div className="my-6">
                            <button className="flex items-center justify-center h-[48px] font-medium text-black text-center bg-[#FFCC46] hover:bg-colorWeb w-full rounded-full">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
