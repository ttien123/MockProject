import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'src/components/Input';
import Logo from 'src/components/Logo/Logo';
import { Label } from 'src/components/ui/label';
import { Switch } from 'src/components/ui/switch';
import path from 'src/constants/path';
import { setRoleAuth } from 'src/state/Auth.slide';
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
        formState: { errors },
    } = useForm<FormDataLogin>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = handleSubmit((data) => {
        if (data.email === 'admin@gmail.com' && data.password === '123456') {
            dispatch(setRoleAuth('admin'));
        }
        ListAccount.forEach((item) => {
            if (data.email === item.email && data.password === item.password) {
                dispatch(setRoleAuth('user'));
            }
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
                        <div className="flex items-center space-x-2 mt-2">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode" className="text-[12px]">
                                Remember me
                            </Label>
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
