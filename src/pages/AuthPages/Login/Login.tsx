import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from 'src/components/Input';
import Logo from 'src/components/Logo/Logo';
import path from 'src/constants/path';
import { setRoleAuth } from 'src/state/Auth.slide';
import { setUserInfo } from 'src/state/ListAccount.slide';
import { RootState } from 'src/store';
import { AuthSchema, authSchema } from 'src/utils/rules';

export type FormDataLogin = Pick<AuthSchema, 'email' | 'password'>;
const loginSchema = authSchema.pick(['email', 'password']);

const Login = () => {
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
            password: '',
        },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = handleSubmit((data) => {
        ListAccount.forEach((item) => {
            if (data.email === item.email && data.password === item.password) {
                dispatch(setRoleAuth(item.role));
                dispatch(setUserInfo(item));
                return;
            }
        });
        setError('email', {
            type: 'error',
            message: 'The email or password is incorrect or does not exist',
        });
    });

    return (
        <div className="h-screen flex flex-col bg-black ">
            <div className="pl-[74px] py-[32px] bg-[#121212]">
                <Logo />
            </div>
            <div className="flex-1 bg-bgAuth flex justify-center ">
                <div className="w-full max-w-[324px]">
                    <h1 className="text-[32px] font-semibold text-center my-[32px]">Log in to Amela</h1>
                    <form onSubmit={onSubmit}>
                        <div>
                            <Input
                                name="email"
                                register={register}
                                labelName="Email"
                                placeholder="Email"
                                errorsMessage={errors.email?.message}
                            />
                        </div>
                        <div>
                            <Input
                                name="password"
                                register={register}
                                labelName="Password"
                                placeholder="Password"
                                type="password"
                                errorsMessage={errors.password?.message}
                            />
                        </div>
                        <div className="my-6">
                            <button className="block h-[48px] font-medium text-center bg-[#FFCC46] hover:bg-colorWeb w-full rounded-full">
                                Log in
                            </button>
                        </div>

                        <Link to={path.forgotPassword} className="underline hover:text-[#FFCC46] text-center block ">
                            Forgot your password?
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
