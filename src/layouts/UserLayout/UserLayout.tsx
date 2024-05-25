import { useState } from 'react';
import { Link, Outlet, useMatch, useNavigate } from 'react-router-dom';
import InputSearch from 'src/components/InputSearch';
import Logo from 'src/components/Logo/Logo';
import SheetCst from 'src/components/SheetCst';
import { IoMdClose } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import path from 'src/constants/path';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setRoleAuth } from 'src/state/Auth.slide';
import { setUserInfoToLS } from 'src/utils/ListAccount.Local';

const UserLayout = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.ListAccountSlide.userInfo);
    const isProfilePage = useMatch(path.profileUserPage);

    const handleLogout = () => {
        dispatch(setRoleAuth(''));
        setUserInfoToLS(null);
        navigate(path.login);
    };

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-10">
                <div
                    className={`${
                        isProfilePage ? 'bg-[#222433] lg:bg-transparent' : 'bg-transparent'
                    } containerCst pt-[30px] pb-[35px] flex items-center`}
                >
                    <Link to={path.UserHomePage}>
                        <Logo />
                    </Link>
                    <div className="flex-1 pl-10 hidden lg:block">
                        <InputSearch />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={handleLogout}
                            className="hidden lg:flex items-center justify-center w-[150px] mr-4 h-[40px] bg-transparent border border-[#2CFFFE] rounded-full font-semibold hover:bg-[#2F3B47] transition-all duration-300"
                        >
                            <span className="mt-[-2px]">Logout</span>
                            <BiLogOut className="w-5 h-5 text-white cursor-pointer ml-2" />
                        </button>
                        <div className="hidden lg:block">
                            <Link to={`/profileUserPage/${userInfo.id}`}>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                    </div>
                    <div className="lg:hidden flex-1 text-right h-[25px]">
                        <SheetCst
                            open={isOpenMenu}
                            setOpen={setIsOpenMenu}
                            buttonOpen={
                                <button className="ml-auto h-[25px] flex flex-col justify-between group items-center">
                                    <div className="block bg-[#FEA628] group-hover:w-[20px] w-[35px] h-[3px] rounded-[10px] transition-all duration-500"></div>
                                    <div className="block bg-[#FEA628] w-[35px] h-[3px] rounded-[10px] transition-all duration-500"></div>
                                    <div className="block bg-[#FEA628] group-hover:w-[20px] w-[35px] h-[3px] rounded-[10px] transition-all duration-500"></div>
                                </button>
                            }
                            content={
                                <div className="h-full bg-colorWeb p-4 flex flex-col">
                                    <div>
                                        <div className="text-right">
                                            <button onClick={() => setIsOpenMenu(false)} className="p-2">
                                                <IoMdClose size={25} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-[24px] my-8 text-center font-semibold">
                                                Welcome to AMELA
                                            </h2>
                                            <Link
                                                onClick={() => setIsOpenMenu(false)}
                                                to={`/profileUserPage/${userInfo.id}`}
                                            >
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <InputSearch setIsOpenMenu={setIsOpenMenu} />
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleLogout}
                                            className="mt-auto w-full flex items-center justify-center mr-4 h-[40px] bg-[#2F3B47] border border-[#2CFFFE] rounded-full font-semibold hover:bg-black transition-all duration-300"
                                        >
                                            <span className="mt-[-2px]">Logout</span>
                                            <BiLogOut className="w-5 h-5 text-white cursor-pointer ml-2" />
                                        </button>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </header>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;
