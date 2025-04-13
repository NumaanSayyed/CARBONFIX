// StatisticsSection.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
import "swiper/swiper-bundle.css";

const swiperModules = [Pagination, Autoplay];

const StatisticsSection: React.FC<{
    credits: number;
    setCredits: (credits: number) => void;
    isMobile: boolean;
    projectStats: { enrolled: number; completed: number; pending: number; };
}> = ({ credits, setCredits, isMobile, projectStats }) => {

    const addCredits = () => setCredits(credits + 50);

    return (
        <div className="px-4 md:px-8 py-6">
            {isMobile ? (
                <Swiper
                    modules={swiperModules}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    className="mb-8"
                >
                    <SwiperSlide>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6" onClick={addCredits}>
                            <div className="text-4xl font-bold text-green-600 mb-2">{credits}</div>
                            <p className="text-gray-600">Total Carbon Credits</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-white/30 backdrop-blur-md rounded-xl p-6">
                            <div className="text-4xl font-bold text-blue-600 mb-2">12</div>
                            <p className="text-gray-600">Projects Contributed</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-white/30 backdrop-blur-md rounded-xl p-6">
                            <div className="text-4xl font-bold text-purple-600 mb-2">89%</div>
                            <p className="text-gray-600">Sustainability Score</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 cursor-pointer" onClick={addCredits}>
                        <div className="text-5xl font-bold text-green-600">{credits}</div>
                        <p className="text-gray-600">Total Carbon Credits</p>
                    </div>
                    <div className="bg-white/30 backdrop-blur-md rounded-xl p-6">
                        <div className="text-4xl font-bold text-blue-600 mb-2">12</div>
                        <p className="text-gray-600">Projects Contributed</p>
                    </div>
                    <div className="bg-white/30 backdrop-blur-md rounded-xl p-6">
                        <div className="text-4xl font-bold text-purple-600 mb-2">89%</div>
                        <p className="text-gray-600">Sustainability Score</p>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/40 rounded-lg p-5">
                    <h3 className="text-lg font-semibold">Projects Overview</h3>
                    <p>Enrolled: {projectStats.enrolled}</p>
                    <p>Completed: {projectStats.completed}</p>
                    <p>Pending: {projectStats.pending}</p>
                </div>
                <div className="bg-white/40 rounded-lg p-5">
                    <h3 className="text-lg font-semibold">Project Distribution</h3>
                    <div className="w-full h-64"></div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsSection;
