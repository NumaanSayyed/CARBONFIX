import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

const testimonials = [
    {
        name: "Isabella Rodriguez",
        role: "Environmental Advocate",
        impact: 2345,
        rating: 5,
        image: "https://public.readdy.ai/ai/img_res/6a480b64c788faafca812fb9552f5b39.jpg",
        text: "The platform made it incredibly easy to track my carbon footprint and connect with impactful projects. I've reduced my carbon emissions by 40% in just 6 months!",
    },
    {
        name: "Alexander Chen",
        role: "Tech Entrepreneur",
        impact: 3120,
        rating: 5,
        image: "https://public.readdy.ai/ai/img_res/abbcf48ab1793174ff203b8812c39530.jpg",
        text: "As a business owner, I wanted to make our operations more sustainable. This platform provided the perfect solution with its comprehensive tracking and verified offset projects.",
    },
    {
        name: "Sophie Anderson",
        role: "University Student",
        impact: 1890,
        rating: 5,
        image: "https://public.readdy.ai/ai/img_res/91991b85c7a82727ad8ca1deaedcb1e8.jpg",
        text: "Being part of this community has been eye-opening. The real-time impact tracking keeps me motivated, and I love seeing how my small actions add up to make a big difference.",
    },
    {
        name: "Marcus Thompson",
        role: "Corporate Sustainability Director",
        impact: 4567,
        rating: 5,
        image: "https://public.readdy.ai/ai/img_res/63e1e370e713e5aab69d1c43b55919cf.jpg",
        text: "The transparency and verification processes are top-notch. It's exactly what we needed to ensure our corporate sustainability initiatives are making a real impact.",
    },
];

const Testimonial: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-24 bg-gradient-to-b from-green-50 to-white">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">What Our Users Say</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Real stories from people making a difference in our global sustainability movement.
            </p>

            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="testimonials-swiper pb-12"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <TestimonialCard testimonial={testimonial} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

// Testimonial Card Component
const TestimonialCard: React.FC<{ testimonial: any; }> = ({ testimonial }) => (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col transform transition-all duration-300 hover:-translate-y-2">
        <div className="flex items-center mb-6">
            <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
        </div>
        <div className="flex items-center mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400"></i>
            ))}
        </div>
        <p className="text-gray-600 flex-grow italic">"{testimonial.text}"</p>
        <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center text-green-600">
                <i className="fas fa-leaf mr-2"></i>
                <span className="font-semibold">{testimonial.impact.toLocaleString()}</span>
                <span className="ml-2 text-sm text-gray-600">Carbon Credit offset</span>
            </div>
        </div>
    </div>
);

export default Testimonial;