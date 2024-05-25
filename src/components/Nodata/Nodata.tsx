import NoData from 'src/assets/NoData';

const Nodata = () => {
    return (
        <div className="flex items-center justify-center flex-col min-h-150  col-span-2">
            <NoData />
            <div className="mt-4 text-[16px] font-semibold">Không có dữ liệu</div>
        </div>
    );
};

export default Nodata;
