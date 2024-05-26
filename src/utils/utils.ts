export function formatTime(hours: number, minutes: number): string {
    // Chuyển đổi giờ, phút, giây sang chuỗi
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Trả về chuỗi thời gian ở định dạng giờ:phút:giây
    return `${formattedHours}:${formattedMinutes}`;
}

export function getDayOfWeek(day: number, month: number, year: number) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek;
}

export function getDayOfWeekForFirstDayOfMonth(year: number, month: number) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    return dayOfWeek;
}

export function calculateTimeDifference(time1: string, time2: string): number {
    // Tách chuỗi thời gian thành giờ và phút
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    // Tính số phút giữa hai thời điểm
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;
    const minuteDifference = Math.abs(totalMinutes1 - totalMinutes2);

    // Tính số giờ và phút từ số phút chênh lệch
    const hours = Math.floor(minuteDifference / 60);

    // Trả về kết quả tương ứng
    if (hours >= 8) {
        return 8;
    } else if (hours >= 4) {
        return 4;
    } else {
        return 0;
    }
}

export function calculateTimeDifferenceFromStart(time1: string, time2: string): number {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    // Tính số phút giữa hai thời điểm
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;
    const minuteDifference = Math.abs(totalMinutes1 - totalMinutes2);

    // Trả về kết quả tương ứng
    if (minuteDifference >= 0) {
        return minuteDifference;
    } else {
        return 0;
    }
}

export function calculateWeekdayCount() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Tạo một đối tượng Date để lấy thông tin về ngày đầu tiên của tháng
    const date = new Date(year, month, 1);

    // Lấy thứ của ngày đầu tiên (0 là Chủ Nhật, 1 là Thứ Hai, ...)
    const firstDayOfWeek = date.getDay();

    // Tính số ngày trong tháng
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Đếm số ngày từ thứ 2 đến thứ 6
    let weekdayCount = 0;
    for (let day = 2 - firstDayOfWeek; day <= daysInMonth; day += 1) {
        if (day > 0 && day <= daysInMonth && day % 7 > 0 && day % 7 < 5) {
            weekdayCount += 1;
        }
    }

    return weekdayCount * 8;
}

export function getDaysFromStartOfMonthExcludingWeekends(): number {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let daysFromStartOfMonth = 0;
    const currentDay = startOfMonth;

    while (currentDay <= currentDate) {
        const dayOfWeek = currentDay.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            daysFromStartOfMonth++;
        }
        currentDay.setDate(currentDay.getDate() + 1);
    }

    return daysFromStartOfMonth;
}
