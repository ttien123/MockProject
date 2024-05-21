import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setValueSearch } from 'src/state/ValueSearch.slide';
import { IoSearchSharp } from 'react-icons/io5';

const InputSearch = () => {
    const dispatch = useDispatch();
    const [valueInput, setValueInput] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setValueInput(e.target.value);
        }
    };

    const handleSearch = () => {
        dispatch(setValueSearch(valueInput));
    };

    useEffect(() => {
        if (valueInput === '') {
            dispatch(setValueSearch(''));
        }
    }, [valueInput]);

    return (
        <div className="flex items-center justify-between h-[40px] w-full max-w-[400px] rounded-full overflow-hidden">
            <input
                type="text"
                value={valueInput}
                onChange={handleChange}
                placeholder="Search…"
                className="flex-1 h-full px-4 text-black outline-none border-none text-[14px]"
            />
            <button
                onClick={handleSearch}
                className="bg-[#FFDD5C] text-white h-full min-w-[50px] flex items-center justify-center"
            >
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
        </div>
    );
};

export default InputSearch;
