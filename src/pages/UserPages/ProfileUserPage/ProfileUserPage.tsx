import { useDispatch, useSelector } from 'react-redux';
import IconPen from 'src/assets/IconPen';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import { RootState } from 'src/store';
import iconInfo from 'src/assets/infoUser.png';
import iconBag from 'src/assets/iconBag.png';
import iconDot from 'src/assets/iconDot.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import path from 'src/constants/path';
import { UserAccountType } from 'src/mock/ListAccount';
import { useEffect, useState } from 'react';
import DialogCst from 'src/components/DialogCst';
import RepairInfoUser from 'src/components/RepairInfoUser';
import IconClose from 'src/assets/IconClose';
import { IoTrashBinSharp } from 'react-icons/io5';
import { setListAccount } from 'src/state/ListAccount.slide';
import { toast } from 'react-toastify';
const ProfileUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModalRepairInfo, setOpenModalRepairInfo] = useState(false);
    const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false);
    const role = useSelector((state: RootState) => state.RoleAuth.roleAuth);
    const listAccount = useSelector((state: RootState) => state.ListAccountSlide.ListAccount);
    const userActive = useSelector((state: RootState) => state.ListAccountSlide.userInfo);
    const [currentUser, setCurrentUser] = useState<UserAccountType>(userActive);
    const handleDeleteUSer = () => {
        navigate(path.AdminHomePage);
        const newListAccount = listAccount.filter((item) => {
            return item.id !== id;
        });
        dispatch(setListAccount(newListAccount));
        toast.success('Xóa tài khoản thành công');
    };

    useEffect(() => {
        const newCurrentUser = listAccount.find((item) => item.id === id);
        newCurrentUser && setCurrentUser(newCurrentUser);
    }, [id, listAccount]);

    return (
        <div className="bg-[#222433] min-h-screen lg:h-screen text-[#333]">
            <div className="pt-[105px] flex items-center h-full flex-col lg:flex-row">
                <div className="w-full lg:w-1/4 h-full px-4 pb-6 text-[#223354]">
                    <div className="h-full bg-white rounded-[10px] border border-[#2CFFFE] px-4 pb-4 flex flex-col">
                        <div>
                            <div className="flex items-center justify-center p-5">
                                <Avatar className="w-[80px] h-[80px]">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>

                            <h3 className="text-[20px] font-semibold text-center">{currentUser.name}</h3>
                            {currentUser.role !== 'admin' && (
                                <>
                                    <div className="mt-4 font-medium">
                                        <div className="font-semibold">Email</div>
                                        <div className="text-[14px] mt-2">{currentUser.email}</div>
                                    </div>
                                    <div className="mt-4 font-medium">
                                        <div className="font-semibold">Mã nhân viên</div>
                                        <div className="text-[14px] mt-2">TTS000022</div>
                                    </div>
                                    <div className="mt-4 font-medium">
                                        <div className="font-semibold">Người quản lý</div>
                                        <div className="text-[14px] mt-2">{currentUser.userManager}</div>
                                    </div>
                                    <div className="mt-4 font-medium">
                                        <div className="font-semibold">Loại chấm công</div>
                                        <div className="text-[14px] mt-2">Loại thường</div>
                                    </div>
                                </>
                            )}
                        </div>
                        {role === 'user' && (
                            <div className="flex-1 flex items-end">
                                {userActive.id !== id ? (
                                    <Link
                                        to={`/profileUserPage/${userActive.id}`}
                                        className="mt-4 bg-btnLinear w-full rounded-full flex items-center justify-center h-10"
                                    >
                                        <div className="mr-2">
                                            <FaArrowRight />
                                        </div>
                                        <span>Trang cá nhân của bạn</span>
                                    </Link>
                                ) : (
                                    <Link
                                        to={path.timekeeping}
                                        className="mt-4 bg-btnLinear w-full rounded-full flex items-center justify-center h-10"
                                    >
                                        <div className="mr-2">
                                            <FaArrowRight />
                                        </div>
                                        <span>Bảng chấm công</span>
                                    </Link>
                                )}
                            </div>
                        )}

                        {role === 'admin' && userActive.id !== id && (
                            <div className="flex-1 flex items-end">
                                <Link
                                    to={`/profileUserPage/${userActive.id}`}
                                    className="mt-4 bg-btnLinear w-full rounded-full flex items-center justify-center h-10"
                                >
                                    <div className="mr-2">
                                        <FaArrowRight />
                                    </div>
                                    <span>Trang cá nhân của bạn</span>
                                </Link>
                            </div>
                        )}

                        {role === 'admin' && userActive.id === id && (
                            <div className="flex-1 flex items-end">
                                <Link
                                    to={path.AdminHomePage}
                                    className="mt-4 bg-btnLinear w-full rounded-full flex items-center justify-center h-10"
                                >
                                    <div className="mr-2">
                                        <FaArrowRight />
                                    </div>
                                    <span>Back to home</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-3/4 h-full px-4 pb-6">
                    <div className="h-full py-2 bg-white rounded-[10px] border border-[#2CFFFE]">
                        <div className="profileInfo h-full overflow-auto px-4 pb-4 flex flex-col">
                            <div className="pt-2 pb-3 flex items-center border-b border-b-[#ebebeb]">
                                <div className="flex-1 flex items-center">
                                    <div>
                                        <img src={iconInfo} alt="img" />
                                    </div>
                                    <div className="text-[20px] font-semibold ml-4 text-[#223354]">
                                        Thông tin cá nhân
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {(role === 'admin' || userActive.id === currentUser.id) && (
                                        <div>
                                            <DialogCst
                                                open={openModalRepairInfo}
                                                setOpen={setOpenModalRepairInfo}
                                                classNameContent={`text-black p-0 border-none overflow-hidden bg-[#222433] px-4 pb-4 pt-2 max-w-[90%] rounded-[10px]  ${
                                                    role === 'admin' ? 'lg:max-w-[1000px]' : 'lg:max-w-[500px]'
                                                }`}
                                                ButtonClick={
                                                    <div className="text-[#FEA628] bg-[#f9fbfc] flex items-center justify-center border border-[#e7e7e7] w-[34px] h-[34px] p-[3px] rounded-[50%]">
                                                        <IconPen />
                                                    </div>
                                                }
                                                ContentModal={
                                                    <div>
                                                        <div className="flex items-center justify-between pb-1 border-b border-b-[#ebebeb]">
                                                            <div className="text-[20px] text-white font-medium flex-1 text-center">
                                                                Chỉnh sửa thông tin cá nhân
                                                            </div>
                                                            <button
                                                                onClick={() => setOpenModalRepairInfo(false)}
                                                                className="text-colorWeb p-1 rounded-[50%] border border-[#223354]"
                                                            >
                                                                <IconClose />
                                                            </button>
                                                        </div>
                                                        <RepairInfoUser
                                                            setOpenModalRepairInfo={setOpenModalRepairInfo}
                                                            currentUser={currentUser}
                                                        />
                                                    </div>
                                                }
                                            />
                                        </div>
                                    )}
                                    {role === 'admin' && userActive.id !== id && (
                                        <div>
                                            <DialogCst
                                                open={openModalDeleteUser}
                                                setOpen={setOpenModalDeleteUser}
                                                classNameContent={`text-black p-0 border-none overflow-hidden bg-[#222433] px-4 pb-4 pt-2 max-w-[90%] rounded-[10px] max-w-[500px]`}
                                                ButtonClick={
                                                    <div className="text-[#FEA628] bg-[#f9fbfc] flex items-center justify-center border border-[#e7e7e7] w-[34px] h-[34px] p-[3px] rounded-[50%]">
                                                        <IoTrashBinSharp size={20} />
                                                    </div>
                                                }
                                                ContentModal={
                                                    <div>
                                                        <div className="flex items-center justify-between pb-1 border-b border-b-[#ebebeb]">
                                                            <div className="text-[20px] text-white font-medium flex-1 text-center">
                                                                Xóa tài khoản
                                                            </div>
                                                            <button
                                                                onClick={() => setOpenModalDeleteUser(false)}
                                                                className="text-colorWeb p-1 rounded-[50%] border border-[#223354]"
                                                            >
                                                                <IconClose />
                                                            </button>
                                                        </div>
                                                        <div className="text-white py-2 flex items-center justify-between gap-2">
                                                            <div>
                                                                <div>Tên: {currentUser.name}</div>
                                                                <div className="mt-2">Email: {currentUser.email}</div>
                                                            </div>
                                                            <div>
                                                                <div>Group: {currentUser.group}</div>
                                                                <div className="mt-2">
                                                                    Loại hợp đồng: {currentUser.contractType}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 flex flex-col lg:flex-row items-center justify-center gap-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenModalDeleteUser(false)}
                                                                className="bg-[#fff8ee] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-colorWeb hover:text-white rounded-sm  text-[14px] py-2 px-8 w-full lg:w-[200px] text-[#fea628] font-medium"
                                                            >
                                                                Hủy
                                                            </button>
                                                            <button
                                                                onClick={handleDeleteUSer}
                                                                className="bg-[#fea628] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-white hover:text-colorWeb rounded-sm text-[14px] py-2 px-8 w-full lg:w-[200px] text-white font-medium"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`${
                                    role === 'user' && currentUser.role !== 'admin' && 'border-b border-b-[#ebebeb]'
                                } flex-1 pb-3 flex flex-col justify-between`}
                            >
                                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:py-4 text-[14px]">
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Ngày sinh</div>
                                    <div className="col-span-1 xl:col-span-2 py-4 lg:py-0">{currentUser.birthday}</div>
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Quốc tịch</div>
                                    <div className="col-span-1 py-4 lg:py-0">Việt Nam</div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:py-4 text-[14px]">
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Giới tính</div>
                                    <div className="col-span-1 xl:col-span-2 py-4 lg:py-0">{currentUser.gender}</div>
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Trạng thái tài khoản</div>
                                    <div className="col-span-1 py-4 lg:py-0">{currentUser.stateAccount}</div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:py-4 text-[14px]">
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Số điện thoại</div>
                                    <div className="col-span-1 xl:col-span-2 py-4 lg:py-0">
                                        {currentUser.phoneNumber}
                                    </div>
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Loại nhân sự</div>
                                    <div className="col-span-1 py-4 lg:py-0">{currentUser.typeUser}</div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:py-4 text-[14px]">
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Tình trạng hôn nhân</div>
                                    <div className="col-span-1 xl:col-span-2 py-4 lg:py-0">
                                        {currentUser.maritalStatus}
                                    </div>
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Phòng ban (Nhóm)</div>
                                    <div className="col-span-1 py-4 lg:py-0">{currentUser.group}</div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:py-4 text-[14px]">
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Địa chỉ tạm trú</div>
                                    <div className="col-span-1 xl:col-span-2 py-4 lg:py-0">
                                        {currentUser.residenceAddress}
                                    </div>
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Loại hợp đồng</div>
                                    <div className="col-span-1 py-4 lg:py-0">{currentUser.contractType}</div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:py-4 text-[14px]">
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Địa chỉ thường trú</div>
                                    <div className="col-span-1 xl:col-span-2 py-4 lg:py-0">
                                        TDP Cầu Thành 2, Thị trấn Hùng Sơn, Đại Từ, Thái Nguyên
                                    </div>
                                    <div className="col-span-1 font-semibold py-4 lg:py-0">Email cá nhân</div>
                                    <div className="col-span-1 py-4 lg:py-0">
                                        {currentUser.emailPersonal || 'Chưa cập nhật'}
                                    </div>
                                </div>
                            </div>
                            {!(role === 'admin' && userActive.id === id) && (
                                <div className="min-h-[148px]">
                                    <div className="pt-4 py-3 border-b border-b-[#ebebeb] flex items-center">
                                        <div>
                                            <img src={iconBag} alt="img" className="block w-[25px] h-[25px]" />
                                        </div>
                                        <div className="text-[#223354] text-[20px] ml-4 font-semibold">
                                            Giai đoạn sự nghiệp
                                        </div>
                                    </div>
                                    {currentUser.processCareer.length > 0 && (
                                        <div className="grid grid-cols-3 gap-4 mt-4">
                                            {currentUser.processCareer.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="col-span-3 lg:col-span-1 bg-[#D5F5E3] px-[15px] py-3 rounded-[6px]"
                                                >
                                                    <div className="flex lg:flex-col xl:flex-row xl:items-center lg:items-start justify-between gap-2">
                                                        <div className="flex items-center">
                                                            <div>
                                                                <img
                                                                    src={iconDot}
                                                                    alt="img"
                                                                    className="block w-[10px] h-[10px]"
                                                                />
                                                            </div>
                                                            <div className="ml-2 text-[14px]">{item.start}</div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div>
                                                                <img
                                                                    src={iconDot}
                                                                    alt="img"
                                                                    className="block w-[10px] h-[10px]"
                                                                />
                                                            </div>
                                                            <div className="ml-2 text-[14px]">
                                                                {item.end || 'Chưa cập nhật'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-[14px] mt-2 font-semibold">
                                                        {item.position}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUserPage;
