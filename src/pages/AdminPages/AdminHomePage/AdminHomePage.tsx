import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IconClose from 'src/assets/IconClose';
import CreateNotification from 'src/components/CreateNotification';
import CreateUser from 'src/components/CreateUser/CreateUser';
import DataTable from 'src/components/DataTable';
import DialogCst from 'src/components/DialogCst';
import InputSearchTable from 'src/components/InputSearchTable';
import columnsTable from 'src/components/columnTable';
import { UserAccountType } from 'src/mock/ListAccount';
import { RootState } from 'src/store';

const AdminHomePage = () => {
    const [openCreateAccount, setOpenCreateAccount] = useState<boolean>(false);
    const [openCreateNotification, setOpenCreateNotification] = useState<boolean>(false);
    const listAccount = useSelector((state: RootState) => state.ListAccountSlide.ListAccount);
    const valueSearch = useSelector((state: RootState) => state.ValueSearch.valueSearch);
    const [listAccountNow, setListAccountNow] = useState<UserAccountType[]>(listAccount);

    useEffect(() => {
        const newListAccount = listAccount.filter(
            (e) =>
                e.name.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || '') ||
                e.email.toLocaleLowerCase().includes(valueSearch?.toLocaleLowerCase() || ''),
        );
        setListAccountNow(newListAccount);
    }, [valueSearch, listAccount]);
    return (
        <div className="bg-[#222433] min-h-screen h-screen text-[#333] overflow-auto">
            <div className="pt-[105px] h-full ">
                <div className="containerCst h-full pt-4 lg:pt-10 text-white flex flex-col">
                    <div className="flex items-start lg:items-center justify-between lg:h-[40px] flex-col lg:flex-row gap-4">
                        <div className="text-[20px] font-semibold mb-2 lg:mb-0">Danh sách thành viên</div>
                        <div className="flex items-start w-full lg:items-center justify-end flex-1 h-full gap-3 flex-col lg:flex-row">
                            <InputSearchTable />
                            <div className="w-full lg:w-auto">
                                <DialogCst
                                    open={openCreateAccount}
                                    setOpen={setOpenCreateAccount}
                                    classNameContent={`text-black p-0 border-none overflow-hidden bg-[#222433] px-4 pb-4 pt-2 max-w-[90%] rounded-[10px] lg:max-w-[1000px]`}
                                    ButtonClick={
                                        <div className="flex items-center justify-center py-2 w-full lg:ml-auto lg:w-[200px] h-full bg-transparent border border-[#2CFFFE] rounded-full font-semibold hover:bg-[#2F3B47] transition-all duration-300">
                                            Thêm thành viên
                                        </div>
                                    }
                                    ContentModal={
                                        <div>
                                            <div className="flex items-center justify-between pb-1 border-b border-b-[#ebebeb]">
                                                <div className="text-[20px] text-white font-medium flex-1 text-center">
                                                    Tạo tài khoản
                                                </div>
                                                <button
                                                    onClick={() => setOpenCreateAccount(false)}
                                                    className="text-colorWeb p-1 rounded-[50%] border border-[#223354]"
                                                >
                                                    <IconClose />
                                                </button>
                                            </div>
                                            <CreateUser setOpenCreateAccount={setOpenCreateAccount} />
                                        </div>
                                    }
                                />
                            </div>
                            <div className="w-full lg:w-auto">
                                <DialogCst
                                    open={openCreateNotification}
                                    setOpen={setOpenCreateNotification}
                                    classNameContent={`text-black p-0 border-none overflow-hidden bg-[#222433] px-4 pb-4 pt-2 max-w-[90%] rounded-[10px] lg:max-w-[1000px]`}
                                    ButtonClick={
                                        <div className="flex items-center justify-center py-2 w-full lg:ml-auto lg:w-[200px] h-full bg-transparent border border-[#2CFFFE] rounded-full font-semibold hover:bg-[#2F3B47] transition-all duration-300">
                                            Thêm thông báo
                                        </div>
                                    }
                                    ContentModal={
                                        <div>
                                            <div className="flex items-center justify-between pb-1 ">
                                                <div className="text-[20px] text-white font-medium flex-1 text-center">
                                                    Tạo thông báo
                                                </div>
                                                <button
                                                    onClick={() => setOpenCreateNotification(false)}
                                                    className="text-colorWeb p-1 rounded-[50%] border border-[#223354]"
                                                >
                                                    <IconClose />
                                                </button>
                                            </div>
                                            <CreateNotification setOpenCreateAccount={setOpenCreateAccount} />
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 mt-4 xl:mt-8">
                        <DataTable columns={columnsTable} data={listAccountNow} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
