import videoBgMp4 from 'src/assets/video_background.mp4';
import videoBgWebm from 'src/assets/video_bgWebm.webm';

const Home = () => {
    return (
        <div className="h-screen relative flex items-center justify-center xl:block bg-black">
            <video
                className="h-[450px] xl:h-full w-full block object-cover object-[75%] xl:object-[0]"
                muted
                loop
                autoPlay
            >
                <source type="video/mp4" src={videoBgMp4}></source>
                <source type="video/mp4" src={videoBgWebm}></source>
            </video>
        </div>
    );
};

export default Home;
