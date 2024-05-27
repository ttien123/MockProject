import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import useDebounce from 'src/hooks/useDebounce';
import { setValueSearch } from 'src/state/ValueSearch.slide';
const InputSearchTable = () => {
    const [valueInput, setValueInput] = useState('');
    const dispatch = useDispatch();
    const debouncedValue = useDebounce(valueInput, 500);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setValueInput(e.target.value);
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            dispatch(setValueSearch(''));
        } else {
            dispatch(setValueSearch(debouncedValue));
        }
    }, [debouncedValue, dispatch]);
    return (
        <div className="flex items-center h-full flex-1 w-full">
            <div className="flex items-center justify-between h-[40px] rounded-full overflow-hidden w-full">
                <input
                    type="text"
                    value={valueInput}
                    onChange={handleChange}
                    placeholder="Search…"
                    className="flex-1 h-full px-4 text-black outline-none border-none text-[14px]"
                />
                <button className="bg-[#FFDD5C] text-white h-full min-w-[50px] flex items-center justify-center">
                    <IoSearchSharp className="w-6 h-6 outline-none" />
                </button>
            </div>
        </div>
    );
};
export default InputSearchTable;
