import { useSelector } from 'react-redux';
import IconAfterNoon from 'src/assets/IconAfterNoon';
import IconCalender from 'src/assets/IconCalender';
import IconClock from 'src/assets/IconClock';
import IconDoc from 'src/assets/IconDoc';
import IconSun from 'src/assets/IconSun';
import { RootState } from 'src/store';
import { calculateWeekdayCount, getDaysFromStartOfMonthExcludingWeekends } from 'src/utils/utils';

const InfoTimeKeeping = () => {
    const userActive = useSelector((state: RootState) => state.ListAccountSlide.userInfo);

    const totalTimeKeeping = userActive.listTimekeeping.reduce((total, item) => {
        return (total += item.workHours);
    }, 0);

    const totalLateWork = userActive.listTimekeeping.reduce((total, item) => {
        return (total += item.late);
    }, 0);

    const totalDayOff = getDaysFromStartOfMonthExcludingWeekends() - userActive.listTimekeeping.length;

    return (
        <div className="pb-2">
            <div className="p-4 bg-btnLinear">
                <div className="text-white font-medium">Ca làm chuẩn</div>
                <div className="flex items-center justify-between gap-2 mt-3">
                    <div className="flex items-center gap-2">
                        <div>
                            <IconSun />
                        </div>
                        <div className="text-[14px] text-white">08:00 - 12:00</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <IconAfterNoon />
                        </div>
                        <div className="text-[14px] text-white">13:30 - 17:30</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between bg-[#e9ebee] p-4">
                <div className="flex items-center justify-center">
                    <div className="bg-[#2ecc71] w-[12px] h-[12px] rounded-[50%]"></div>
                    <div className="text-[14px] ml-2">Đủ công</div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="bg-[#ffdba9] w-[12px] h-[12px] rounded-[50%]"></div>
                    <div className="text-[14px] ml-2">Thiếu công</div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="bg-[#e74c3c] w-[12px] h-[12px] rounded-[50%]"></div>
                    <div className="text-[14px] ml-2">Nghỉ</div>
                </div>
            </div>
            <div className="px-2">
                <div className="flex items-center justify-between px-4 py-2 mt-2 bg-[#ffdba959] rounded-md">
                    <div className="flex items-center justify-start">
                        <IconDoc />
                        <span className="ml-2 text-[14px]">Tổng số công</span>
                    </div>
                    <div className="text-[14px] font-semibold text-[#223354]">
                        {`${totalTimeKeeping}/${calculateWeekdayCount()}`}
                    </div>
                </div>
                <div className="flex items-center justify-between px-4 py-2 mt-2 bg-[#f3f7fb] rounded-md">
                    <div className="flex items-center justify-start">
                        <IconClock />
                        <span className="ml-2 text-[14px]">Số phút muộn</span>
                    </div>
                    <div className="text-[14px] font-semibold text-[#223354]">{totalLateWork}</div>
                </div>
                <div className="flex items-center justify-between px-4 py-2 mt-2 bg-[#f3f7fb] rounded-md">
                    <div className="flex items-center justify-start">
                        <IconCalender />
                        <span className="ml-2 text-[14px]">Số ngày nghỉ</span>
                    </div>
                    <div className="text-[14px] font-semibold text-[#223354]">{totalDayOff}</div>
                </div>
            </div>
        </div>
    );
};

export default InfoTimeKeeping;
