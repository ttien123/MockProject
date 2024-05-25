import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DialogCst from 'src/components/DialogCst';
import Input from 'src/components/Input';
import Logo from 'src/components/Logo/Logo';
import path from 'src/constants/path';
import { setEmailForgot } from 'src/state/ListAccount.slide';
import { RootState } from 'src/store';
import { AuthSchema, authSchema } from 'src/utils/rules';

export type FormDataLogin = Pick<AuthSchema, 'email'>;
const ResetPasswordSchema = authSchema.pick(['email']);

const ForgotPasswordPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const ListAccount = useSelector((state: RootState) => state.ListAccountSlide.ListAccount);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormDataLogin>({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(ResetPasswordSchema),
    });

    const onSubmit = handleSubmit((data) => {
        ListAccount.forEach((account) => {
            if (account.email === data.email) {
                setOpen(true);
                dispatch(setEmailForgot(account.email));
                return;
            }
        });
        setError('email', {
            message: 'Email invalidate',
        });
    });
    return (
        <div className="h-screen flex flex-col bg-black ">
            <DialogCst
                open={open}
                ContentModal={
                    <div className="text-black">
                        <h3 className="text-black text-[30px] font-semibold text-center mb-2">
                            Link sent successfully
                        </h3>
                        <div className="text-black text-[18px]">Please check your email to confirm the request</div>
                    </div>
                }
                ButtonClose={
                    <Link
                        to={path.changePassword}
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
                <div className="w-full max-w-[324px]">
                    <h1 className="text-[30px] font-semibold text-center mt-[32px] mb-4">Reset your password</h1>
                    <div className="mb-6 font-medium">
                        Enter your email address, and we'll send you a link to get back into your account
                    </div>
                    <form onSubmit={onSubmit}>
                        <div>
                            <Input
                                register={register}
                                name="email"
                                labelName="Email"
                                placeholder="Email"
                                errorsMessage={errors.email?.message}
                            />
                        </div>
                        <Link to={''} className="underline hover:text-[#FFCC46]">
                            Need support?
                        </Link>
                        <div className="my-6">
                            <button className="flex items-center justify-center h-[48px] font-medium text-black text-center bg-[#FFCC46] hover:bg-colorWeb w-full rounded-full">
                                Send link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
