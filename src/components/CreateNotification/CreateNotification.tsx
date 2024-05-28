import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Input from '../Input';
interface Props {
    setOpenCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CreateNotification = ({ setOpenCreateAccount }: Props) => {
    const [value, onChange] = useState<Value>(null);

    return (
        <div className=" min-h-[450px] bg-white rounded-md p-4 mt-2 flex flex-col">
            <div className="flex justify-center lg:gap-4 flex-col lg:flex-row">
                <div className="w-full">
                    <div className="mb-2 block font-semibold text-[14px]">Chọn lịch thông báo</div>
                    <DateTimePicker
                        onChange={onChange}
                        minDate={new Date()}
                        value={value}
                        disableClock
                        isClockOpen
                        showLeadingZeros
                        className={'block w-full text-[16px] h-[45px] rounded-sm'}
                    />
                    <div className="mt-1 mb-1 text-red-600 min-h-[21px] font-semibold text-[14px]">
                        {false && 'Trường này là bắt buộc'}
                    </div>
                </div>
                <div className="w-full">
                    <Input
                        // register={register}
                        name="email"
                        labelName="Email"
                        extendClassNameInput="text-[14px]"
                        placeholder="Message"
                        // errorsMessage={errors.email?.message}
                    />
                </div>
            </div>
            <div className="flex-1">
                <div>Chọn danh sách người nhận thông báo</div>
                <div className="min-h-[200px] border mt-2"></div>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={() => setOpenCreateAccount(false)}
                    className="bg-[#fff8ee] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-colorWeb hover:text-white rounded-sm  text-[14px] py-2 px-8 w-full lg:w-[200px] text-[#fea628] font-medium"
                >
                    Hủy
                </button>
                <button className="bg-[#fea628] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-white hover:text-colorWeb rounded-sm text-[14px] py-2 px-8 w-full lg:w-[200px] text-white font-medium">
                    Hoàn thành
                </button>
            </div>
        </div>
    );
};

export default CreateNotification;
