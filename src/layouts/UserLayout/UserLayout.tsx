import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import InputSearch from 'src/components/InputSearch';
import Logo from 'src/components/Logo/Logo';
import SheetCst from 'src/components/SheetCst';
import { IoMdClose } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import path from 'src/constants/path';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from 'src/components/ui/dropdown-menu';
const UserLayout = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-10">
                <div className="containerCst bg-transparent pt-[30px] pb-[35px] flex items-center">
                    <div>
                        <Logo />
                    </div>
                    <div className="flex-1 pl-10 hidden lg:block">
                        <InputSearch />
                    </div>
                    <div className="flex items-center justify-center">
                        <Link
                            to={path.login}
                            className="hidden lg:flex items-center justify-center w-[150px] mr-4 h-[40px] bg-transparent border border-[#2CFFFE] rounded-full font-semibold hover:bg-[#2F3B47] transition-all duration-300"
                        >
                            <span className="mt-[-2px]">Logout</span>
                            <BiLogOut className="w-5 h-5 text-white cursor-pointer ml-2" />
                        </Link>
                        <div className="hidden lg:block">
                            <Link to={''}>
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
                                            <Link to={''}>
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <InputSearch />
                                    </div>
                                    <div>
                                        <Link
                                            to={path.login}
                                            className="mt-auto flex items-center justify-center mr-4 h-[40px] bg-[#2F3B47] border border-[#2CFFFE] rounded-full font-semibold hover:bg-black transition-all duration-300"
                                        >
                                            <span className="mt-[-2px]">Logout</span>
                                            <BiLogOut className="w-5 h-5 text-white cursor-pointer ml-2" />
                                        </Link>
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
