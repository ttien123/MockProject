import videoBgMp4 from 'src/assets/video_background.mp4';
import videoBgWebm from 'src/assets/video_bgWebm.webm';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';
const UserHomePage = () => {
    return (
        <div className="min-h-screen lg:h-screen relative flex flex-col items-center justify-center lg:block bg-black">
            <div className="h-full">
                <video
                    className="h-[450px] lg:h-full w-full block object-cover object-[75%] lg:object-[0] cursor-not-allowed pointer-events-none select-none"
                    muted
                    loop
                    autoPlay
                >
                    <source type="video/mp4" src={videoBgMp4}></source>
                    <source type="video/mp4" src={videoBgWebm}></source>
                </video>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-transparent z-1 cursor-not-allowed pointer-events-none select-none"></div>
            </div>
            <div className="hidden lg:block absolute top-0 left-0 right-0 bottom-0">
                <div className="mt-[105px] containerCst">
                    <div className="lg:pt-10 max-w-[500px] flex flex-col min-h-[480px]">
                        <div>
                            <h1 className="text-[40px] font-semibold">Welcome to AMELA</h1>
                            <h2 className="text-[25px] my-4 font-semibold">Tek For Human - Công nghệ vị nhân sinh</h2>
                            <p className="my-4 text-[16px]">
                                AMELA Technology JSC. (viết tắt: AMELA) là doanh nghiệp cung cấp các dịch vụ phát triển
                                phần mềm và CNTT có trụ sở chính tại Hà Nội, được thành lập từ năm 2019. AMELA thành
                                công nhờ thấu hiểu khách hàng am hiểu thị trường và văn hóa bản địa để sáng tạo giá trị
                                bằng việc sử dụng, tích hợp, đổi mới công nghệ vì con người.
                            </p>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                            <Link
                                to={path.timekeeping}
                                className="mt-auto w-full flex items-center justify-center mr-4 h-[40px] bg-[#2F3B47] border border-[#2CFFFE] rounded-full font-semibold hover:bg-black transition-all duration-300"
                            >
                                <span className="mt-[-2px]">Bảng chấm công</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block lg:hidden pb-8">
                <div className="containerCst">
                    <div className="pt-10 flex flex-col min-h-[480px]">
                        <div>
                            <h1 className="text-[40px] font-semibold text-center">Welcome to AMELA</h1>
                            <h2 className="text-[25px] my-4 font-semibold text-center">
                                Tek For Human - Công nghệ vị nhân sinh
                            </h2>
                            <p className="my-4 text-[16px] text-center">
                                AMELA Technology JSC. (viết tắt: AMELA) là doanh nghiệp cung cấp các dịch vụ phát triển
                                phần mềm và CNTT có trụ sở chính tại Hà Nội, được thành lập từ năm 2019. AMELA thành
                                công nhờ thấu hiểu khách hàng am hiểu thị trường và văn hóa bản địa để sáng tạo giá trị
                                bằng việc sử dụng, tích hợp, đổi mới công nghệ vì con người.
                            </p>
                        </div>
                        <div className="flex-1 flex items-end justify-center mt-6">
                            <Link
                                to={path.timekeeping}
                                className="mt-auto w-[300px] flex items-center justify-center mr-4 h-[40px] bg-[#2F3B47] border border-[#2CFFFE] rounded-full font-semibold hover:bg-black transition-all duration-300"
                            >
                                <span className="mt-[-2px]">Bảng chấm công</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHomePage;
