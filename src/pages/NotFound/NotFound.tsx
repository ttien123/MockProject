import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const negative = useNavigate();
    useEffect(() => {
        const isToHome = setTimeout(() => {
            negative('/');
        }, 3000);
        return () => {
            clearTimeout(isToHome);
        };
    }, []);
    return (
        <div className="flex items-center justify-center flex-col h-screen relative">
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-black">
                404
            </div>
            <img
                src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
                alt="Page not found"
                className="max-w-1200 mx-auto w-full block h-full"
            />
        </div>
    );
};

export default NotFound;
