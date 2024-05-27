import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { UserAccountType } from 'src/mock/ListAccount';
import { RootState } from 'src/store';
import PopoverCst from '../PopoverCst';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Nodata from '../Nodata';
import useDebounce from 'src/hooks/useDebounce';

interface Props {
    setIsOpenMenu?: (value: React.SetStateAction<boolean>) => void;
}

const InputSearch = ({ setIsOpenMenu }: Props) => {
    const listAccount = useSelector((state: RootState) => state.ListAccountSlide.ListAccount);
    const userAccount = useSelector((state: RootState) => state.ListAccountSlide.userInfo);
    const [listAccountFound, setListAccountFound] = useState<UserAccountType[]>([]);
    const [valueInput, setValueInput] = useState('');
    const [openDropDown, setOpenDropDown] = useState(false);
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const searchValue = e.target.value;
    //     if (!searchValue.startsWith(' ')) {
    //         setValueInput(e.target.value);
    //     }
    // };
    const debouncedValue = useDebounce(valueInput, 500);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setValueInput(e.target.value);
        }
    };

    const handleSearch = () => {
        const newListAccountFound = listAccount.filter(
            (e) =>
                e.name.toLocaleLowerCase().includes(debouncedValue?.trim().toLocaleLowerCase() || '') &&
                e.id !== userAccount.id,
        );
        setOpenDropDown(true);
        setListAccountFound(newListAccountFound);
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setOpenDropDown(false);
        } else {
            const newListAccountFound = listAccount.filter(
                (e) =>
                    e.name.toLocaleLowerCase().includes(debouncedValue?.trim().toLocaleLowerCase() || '') &&
                    e.id !== userAccount.id,
            );
            setOpenDropDown(true);
            setListAccountFound(newListAccountFound);
        }
    }, [debouncedValue, listAccount, userAccount.id, valueInput]);

    return (
        <div>
            <PopoverCst
                open={openDropDown}
                isToggle={false}
                isClick={false}
                setOpen={setOpenDropDown}
                className="relative w-full lg:max-w-[400px]"
                classNamePosition="w-full rounded-[10px] overflow-hidden"
                renderPopover={
                    <div className={`bg-[#FEA628] h-[400px] p-4 overflow-auto left-0 right-0`}>
                        {listAccountFound.length > 0 ? (
                            listAccountFound.map((item) => (
                                <Link
                                    onClick={() => {
                                        setOpenDropDown(false);
                                        setValueInput('');
                                        setIsOpenMenu && setIsOpenMenu(false);
                                    }}
                                    key={item.id}
                                    to={`/profileUserPage/${item.id}`}
                                    className="flex items-center py-2 px-4 bg-white mt-2 text-black rounded-md"
                                >
                                    <div>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <div className="font-semibold">{item.name}</div>
                                        <div>Mã NV: TTS000022</div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <Nodata />
                            </div>
                        )}
                    </div>
                }
            >
                <div className="flex items-center justify-between h-[40px] rounded-full overflow-hidden">
                    <input
                        type="text"
                        value={valueInput}
                        onChange={handleChange}
                        placeholder="Search…"
                        className="flex-1 h-full px-4 text-black outline-none border-none text-[14px] rounded-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-[#FFDD5C] text-white h-full min-w-[50px] flex items-center justify-center"
                    >
                        <IoSearchSharp className="w-6 h-6 outline-none" />
                    </button>
                </div>
            </PopoverCst>
        </div>
    );
};

export default InputSearch;
