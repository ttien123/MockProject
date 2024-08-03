import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconChecked from 'src/assets/IconChecked';
import IconClose from 'src/assets/IconClose';
import IconDeny from 'src/assets/IconDeny';
import DialogCst from 'src/components/DialogCst';
import InfoTimeKeeping from 'src/components/InfoTimeKeeping';
import { Separator } from 'src/components/ui/separator';
import { TimekeepingType, UserAccountType } from 'src/mock/ListAccount';
import { setListAccount, setUserInfo } from 'src/state/ListAccount.slide';
import { RootState } from 'src/store';
import {
    calculateTimeDifference,
    calculateTimeDifferenceFromStart,
    formatTime,
    getDayOfWeek,
    getDayOfWeekForFirstDayOfMonth,
} from 'src/utils/utils';

interface PropsModalTimeKeepingDetail {
    setIsOpenModalTimeKeeping: React.Dispatch<React.SetStateAction<boolean>>;
    setDaySelected: React.Dispatch<React.SetStateAction<TimekeepingType | undefined>>;
    daySelected: TimekeepingType | undefined;
    currentMonth: number;
    currentYear: number;
    currentDate: Date;
}

const ModalTimeKeepingDetail = ({
    setIsOpenModalTimeKeeping,
    daySelected,
    currentMonth,
    currentYear,
    currentDate,
    setDaySelected,
}: PropsModalTimeKeepingDetail) => {
    const userActive = useSelector((state: RootState) => state.ListAccountSlide.userInfo);
    const listAccount = useSelector((state: RootState) => state.ListAccountSlide.ListAccount);
    const dispatch = useDispatch();

    const handleCheckIn = () => {
        if (daySelected && !daySelected.startWork) {
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const timeCheckIn = formatTime(hours, minutes);
            const totalLateWork = calculateTimeDifferenceFromStart(timeCheckIn, '08:00');
            const newDayCheckIn = { ...daySelected, startWork: timeCheckIn, late: totalLateWork };
            setDaySelected(newDayCheckIn);
            const newTimeKeeping: TimekeepingType[] = [...userActive.listTimekeeping, newDayCheckIn];

            const updateUserActive = { ...userActive, listTimekeeping: newTimeKeeping };
            const newListAccount: UserAccountType[] = listAccount.map((item) => {
                if (item.id === userActive.id) {
                    return { ...item, listTimekeeping: newTimeKeeping };
                } else {
                    return item;
                }
            });
            dispatch(setListAccount(newListAccount));
            dispatch(setUserInfo(updateUserActive));
        }
    };

    const handleCheckOut = () => {
        if (daySelected && !daySelected.endWork && daySelected.startWork) {
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const timeCheckOut = formatTime(hours, minutes);
            const totalHoursWork = calculateTimeDifference(timeCheckOut, daySelected.startWork);
            const newDayCheckOut = { ...daySelected, endWork: timeCheckOut, workHours: totalHoursWork };
            setDaySelected(newDayCheckOut);
            const newTimeKeeping: TimekeepingType[] = userActive.listTimekeeping.map((item) => {
                if (item.date === daySelected.date) {
                    return newDayCheckOut;
                } else {
                    return item;
                }
            });
            const updateUserActive = { ...userActive, listTimekeeping: newTimeKeeping };
            const newListAccount: UserAccountType[] = listAccount.map((item) => {
                if (item.id === userActive.id) {
                    return { ...item, listTimekeeping: newTimeKeeping };
                } else {
                    return item;
                }
            });
            dispatch(setListAccount(newListAccount));
            dispatch(setUserInfo(updateUserActive));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between pb-1 border-b border-b-[#ebebeb]">
                <div className="pb-1 text-[20px] text-white font-medium flex-1 text-center">Chi tiết chấm công</div>
                <button
                    onClick={() => setIsOpenModalTimeKeeping(false)}
                    className="text-colorWeb p-1 rounded-[50%] border border-[#223354]"
                >
                    <IconClose />
                </button>
            </div>
            <div className="bg-white mt-2 p-4">
                <div className="mb-2">
                    <h3 className="text-[20px] text-[#000000de]">{userActive.name}</h3>
                    <div className="text-[#8d8d8d]">{userActive.email}</div>
                </div>
                <Separator />
                <div className="mt-4">
                    <div className="text-[#223354] font-medium">Ngày tháng</div>
                    {daySelected?.date}/{currentMonth}/{currentYear}
                </div>
                <Separator />
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex-1">
                        <div className="text-[#223354] font-medium">Check in</div>
                        <div>{daySelected?.startWork || 'N/A'}</div>
                        <Separator />
                    </div>
                    <div className="flex-1">
                        <div className="text-[#223354] font-medium">Check out</div>
                        <div>{daySelected?.endWork || 'N/A'}</div>
                        <Separator />
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex-1">
                        <div className="text-[#223354] font-medium">Số công</div>
                        <div>{daySelected?.workHours || 0}</div>
                        <Separator />
                    </div>
                    <div className="flex-1">
                        <div className="text-[#223354] font-medium">Đi muộn</div>
                        <div>{daySelected?.late || 0} phút</div>
                        <Separator />
                    </div>
                </div>
                <div className="mt-4 flex flex-col lg:flex-row items-center justify-center gap-4">
                    <button
                        onClick={handleCheckIn}
                        disabled={daySelected?.date !== currentDate.getDate() || Boolean(daySelected.startWork)}
                        type="button"
                        className="disabled:cursor-not-allowed disabled:hover:text-[#fea628] disabled:hover:border-[#fff8ee] disabled:hover:bg-[#fff8ee] font-medium bg-[#fff8ee] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-colorWeb hover:text-white rounded-sm  text-[14px] py-2 px-8 w-full text-[#fea628]"
                    >
                        Check In
                    </button>
                    <button
                        type="button"
                        onClick={handleCheckOut}
                        disabled={daySelected?.date !== currentDate.getDate() || Boolean(daySelected.endWork)}
                        className="disabled:cursor-not-allowed disabled:hover:text-[#fea628] disabled:hover:border-[#fff8ee] disabled:hover:bg-[#fff8ee] font-medium bg-[#fff8ee] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-colorWeb hover:text-white rounded-sm  text-[14px] py-2 px-8 w-full text-[#fea628]"
                    >
                        Check Out
                    </button>
                </div>
                <div className="mt-4 flex flex-col lg:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => setIsOpenModalTimeKeeping(false)}
                        className="bg-[#fea628] border border-[#fff8ee] hover:border-colorWeb transition-all duration-300 hover:bg-white hover:text-colorWeb rounded-sm text-[14px] py-2 px-8 w-full text-white font-medium"
                    >
                        Xong
                    </button>
                </div>
            </div>
        </div>
    );
};

const TimekeepingPage = () => {
    const [isOpenModalTimeKeeping, setIsOpenModalTimeKeeping] = useState<boolean>(false);
    const [daySelected, setDaySelected] = useState<TimekeepingType>();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const userActive = useSelector((state: RootState) => state.ListAccountSlide.userInfo);
    const currentYear = currentDate.getFullYear();
    const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
    const [startDayOfWeek, setStartDayOfWeek] = useState(1);

    console.log(startDayOfWeek);

    const handleOpenModal = (dayWork: TimekeepingType | undefined, dayChoose: number) => {
        setIsOpenModalTimeKeeping(true);
        dayWork && setDaySelected(dayWork);
        !dayWork && setDaySelected({ date: dayChoose, startWork: '', endWork: '', late: 0, workHours: 0 });
    };

    useEffect(() => {
        const newDayStartMonth = getDayOfWeekForFirstDayOfMonth(currentYear, currentMonth);
        setStartDayOfWeek(newDayStartMonth);
    }, [currentYear, currentMonth]);

    return (
        <div className="bg-[#222433] min-h-screen lg:h-screen text-[#333]">
            <DialogCst
                open={isOpenModalTimeKeeping}
                setOpen={setIsOpenModalTimeKeeping}
                classNameContent={`text-black p-0 border-none overflow-hidden bg-[#222433] px-4 pb-4 pt-2 max-w-[90%] rounded-[10px] lg:max-w-[875px]`}
                ContentModal={
                    <ModalTimeKeepingDetail
                        currentDate={currentDate}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        daySelected={daySelected}
                        setDaySelected={setDaySelected}
                        setIsOpenModalTimeKeeping={setIsOpenModalTimeKeeping}
                    />
                }
            />
            <div className="pt-[105px] flex items-center h-full flex-col lg:flex-row">
                <div className="w-full lg:w-3/4 h-full pl-4 pr-2 pb-6">
                    <div className="h-full bg-white rounded-[10px] border border-[#2CFFFE] px-4 pb-4 flex flex-col">
                        <div className="text-center my-4">{`Tháng ${currentMonth} / ${currentYear}`}</div>
                        <div className="grid grid-cols-7 bg-[#E7E7E7] flex-1 w-full overflow-auto">
                            <div className="col-span-7 grid grid-cols-7 w-full mb-17] bg-[#E7E7E7]">
                                {Array(7)
                                    .fill(0)
                                    .map((_, index) => (
                                        <div
                                            key={index}
                                            className="col-span-1 bg-white p-2 text-[14px] border border-[#E7E7E7] text-center"
                                        >{`${index + 2 <= 7 ? `Thứ ${index + 2}` : 'Chủ nhật'}`}</div>
                                    ))}
                            </div>
                            {Array(startDayOfWeek - 1)
                                .fill(0)
                                .map((_, index) => (
                                    <div
                                        key={index}
                                        className="col-span-1 flex flex-col cursor-pointer bg-white p-2 text-[14px] border border-[#E7E7E7]"
                                    ></div>
                                ))}
                            {Array(Number(daysInCurrentMonth))
                                .fill(0)
                                .map((_, index) => {
                                    const isCheckWeekend = getDayOfWeek(index + 1, currentMonth, currentYear);
                                    const dayWork = userActive.listTimekeeping.find((item) => item.date === index + 1);
                                    return (
                                        <div
                                            onClick={() =>
                                                !(isCheckWeekend === 0 || isCheckWeekend === 6) &&
                                                index + 1 <= currentDate.getDate() &&
                                                handleOpenModal(dayWork, index + 1)
                                            }
                                            key={index}
                                            className={`${
                                                dayWork && Number(dayWork.workHours) >= 4
                                                    ? '!bg-[#bbfdb9]'
                                                    : 'bg-[#ffc6c6]'
                                            }  ${
                                                (index + 1 >= currentDate.getDate() ||
                                                    isCheckWeekend === 0 ||
                                                    isCheckWeekend === 6) &&
                                                !dayWork &&
                                                '!bg-[#fff]'
                                            } ${
                                                dayWork && dayWork.startWork && !dayWork.endWork && '!bg-[#f9e2c0]'
                                            } col-span-1 cursor-pointer text-[14px] border border-[#E7E7E7] min-h-[104px]`}
                                        >
                                            <div className="flex xl:items-center h-full">
                                                <div
                                                    className={`${
                                                        dayWork && Number(dayWork.workHours) >= 4
                                                            ? '!bg-[#2ecc71]'
                                                            : 'bg-[#e74c3c]'
                                                    } ${
                                                        (index + 1 >= currentDate.getDate() ||
                                                            isCheckWeekend === 0 ||
                                                            isCheckWeekend === 6) &&
                                                        !dayWork &&
                                                        'bg-white'
                                                    } ${
                                                        dayWork &&
                                                        dayWork.startWork &&
                                                        !dayWork.endWork &&
                                                        '!bg-[#fea628]'
                                                    } w-[3px] bg-[#e74c3c] h-full`}
                                                ></div>
                                                <div className="flex flex-1 flex-col h-full p-1">
                                                    <div>{index + 1}</div>
                                                    {((!(isCheckWeekend === 0 || isCheckWeekend === 6) &&
                                                        index + 1 < currentDate.getDate()) ||
                                                        (index + 1 === currentDate.getDate() && dayWork)) && (
                                                        <>
                                                            <div className="flex-1 hidden xl:flex  flex-col justify-evenly">
                                                                <div className="flex items-center text-[14px] gap-[2px] xl:flex-row flex-col">
                                                                    <div>
                                                                        <span>Công</span>
                                                                        <span className="ml-[2px]">
                                                                            {dayWork ? dayWork.workHours : '0'}
                                                                        </span>
                                                                    </div>
                                                                    <span>-</span>
                                                                    <div>
                                                                        <span>Muộn</span>
                                                                        <span className="ml-[2px]">
                                                                            {dayWork?.late || '0'}'
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-1">
                                                                    <div className="flex items-center gap-2">
                                                                        {dayWork?.startWork ? (
                                                                            <IconChecked />
                                                                        ) : (
                                                                            <IconDeny />
                                                                        )}
                                                                        <span>In: {dayWork?.startWork || 'N/A'}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        {dayWork?.endWork ? (
                                                                            <IconChecked />
                                                                        ) : (
                                                                            <IconDeny />
                                                                        )}
                                                                        <span>Out: {dayWork?.endWork || 'N/A'}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 xl:hidden flex flex-col items-center justify-center">
                                                                {dayWork && dayWork?.workHours >= 4 ? (
                                                                    <IconChecked width={20} height={20} />
                                                                ) : (
                                                                    <IconDeny width={20} height={20} />
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            {Array(35 - (startDayOfWeek - 1) - Number(daysInCurrentMonth))
                                .fill(0)
                                .map((_, index) => (
                                    <div
                                        key={index}
                                        className="col-span-1 flex flex-col cursor-pointer bg-white p-2 text-[14px] border border-[#E7E7E7]"
                                    ></div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/4 h-full pr-4 pl-2 pb-6 text-[#223354]">
                    <div className="h-full bg-white rounded-[10px] border border-[#2CFFFE] overflow-hidden">
                        <InfoTimeKeeping />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimekeepingPage;
