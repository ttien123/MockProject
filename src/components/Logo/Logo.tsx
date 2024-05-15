import LogoIcon from 'src/assets/LogoIcon';
const Logo = () => {
    return (
        <div className="relative h-[34px] flex items-center">
            <LogoIcon />
            <div className="absolute left-[30px] flex items-center">
                <div className="w-[5px] h-[22px] bg-[#FEA628] rounded-[5px] mx-[2.5px] animate-scale-up"></div>
                <div className="w-[5px] h-[34px] bg-[#FEA628] rounded-[5px] mx-[2.5px] animate-scale-up delay-150"></div>
                <div className="w-[5px] h-[22px] bg-[#FEA628] rounded-[5px] mx-[2.5px] animate-scale-up delay-75"></div>
            </div>
        </div>
    );
};

export default Logo;
