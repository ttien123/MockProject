import { Link } from 'react-router-dom';
import Input from 'src/components/Input';
import Logo from 'src/components/Logo/Logo';
import { Label } from 'src/components/ui/label';
import { Switch } from 'src/components/ui/switch';

const Login = () => {
    return (
        <div className="h-screen flex flex-col bg-black ">
            <div className="pl-[74px] py-[32px] bg-[#121212]">
                <Logo />
            </div>
            <div className="flex-1 bg-bgAuth flex justify-center ">
                <div className="w-full max-w-[324px]">
                    <h1 className="text-[32px] font-semibold text-center my-[32px]">Log in to Amela</h1>
                    <form>
                        <div>
                            <Input labelName="Email or username" placeholder="Email or username" />
                        </div>
                        <div>
                            <Input labelName="Password" placeholder="Password" type="password" />
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode" className="text-[12px]">
                                Remember me
                            </Label>
                        </div>
                        <div className="my-6">
                            <button className="block h-[48px] text-center bg-[#FFCC46] hover:bg-colorWeb w-full rounded-full">
                                Log in
                            </button>
                        </div>
                        <Link to={''} className="underline hover:text-[#FFCC46]">
                            Forgot your password?
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
