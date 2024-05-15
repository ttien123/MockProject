import { Link } from 'react-router-dom';
import DialogCst from 'src/components/DialogCst';
import Input from 'src/components/Input';
import Logo from 'src/components/Logo/Logo';
import path from 'src/constants/path';

const ForgotPasswordPage = () => {
    return (
        <div className="h-screen flex flex-col bg-black ">
            <div className="pl-[74px] py-[32px] bg-[#121212]">
                <Logo />
            </div>
            <div className="flex-1 bg-bgAuth flex justify-center ">
                <div className="w-full max-w-[324px]">
                    <h1 className="text-[32px] font-semibold text-center mt-[32px] mb-4">Reset your password</h1>
                    <div className="mb-4 font-medium">
                        Enter your email address or username, and we'll send you a link to get back into your account.
                    </div>
                    <form>
                        <div>
                            <Input labelName="Email or username" placeholder="Email or username" />
                        </div>
                        <Link to={path.forgotPassword} className="underline hover:text-[#FFCC46]">
                            Need support?
                        </Link>
                        <div className="my-6">
                            <DialogCst
                                ButtonClick={
                                    <div className="flex items-center justify-center h-[48px] font-medium text-black text-center bg-[#FFCC46] hover:bg-colorWeb w-full rounded-full">
                                        Send link
                                    </div>
                                }
                                ContentModal={
                                    <div className="text-black">
                                        <h3 className="text-black text-[30px] font-semibold text-center mb-2">
                                            Link sent successfully
                                        </h3>
                                        <div className="text-black text-[18px]">
                                            Please check your email to confirm the request
                                        </div>
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
