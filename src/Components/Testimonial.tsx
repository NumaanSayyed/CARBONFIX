import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useAuth } from "../Helpers/authContext";
import { apiResponse, getWithExpirationCheck } from "../Helpers/Helpers";
import axios from "axios";
import { backend_url } from "../backend_route";
import { useLocation } from "react-router-dom";

const Testimonial: React.FC = () => {
  const { user } = useAuth();
  const {userType} = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [hasGivenFeedback, setHasGivenFeedback] = useState<boolean | null>(
    null
  );
  
  //@ts-ignore
  const resolvedUserType = getWithExpirationCheck("userType") || userType;

  useEffect(() => {
    console.log("User in Testimonial:", user);
    const userType = getWithExpirationCheck("userType");
    console.log("User type is:", userType);
    fetchFeedbacks();
    checkFeedbackStatus();
  }, [user]);  

  const location = useLocation();

  useEffect(() => {
    console.log("Humaira in useEffect user type is ",userType);
    console.log("User changed:", user);
    console.log("user ID:", user?.id);

    if (user?.id || user?.id) {
      fetchFeedbacks();
      checkFeedbackStatus();
    }
  }, [user?.id, user?.id, location.pathname]);

  useEffect(() => {
    const handleFocus = () => {
      checkFeedbackStatus();
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${backend_url}/feedback/high-rated`);
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      apiResponse("Error fetching feedbacks!", "bg-red-500");
    }
  };
  
  const checkFeedbackStatus = async () => {
    if (!user || !user.id) {
      setHasGivenFeedback(null);
      return;
    }
  
    const resolvedUserType = getWithExpirationCheck("userType") || userType;
  
    const params: {
      participant_id?: string;
      service_provider_id?: string;
    } = {};
  
    if (resolvedUserType === "Participant") {
      params.participant_id = user.id;
    } else if (resolvedUserType === "Service Provider") {
      params.service_provider_id = user.id;
    } else {
      setHasGivenFeedback(null);
      return;
    }
  
    try {
      const response = await axios.get(`${backend_url}/feedback/status`, {
        params,
      });
      setHasGivenFeedback(response.data.hasGivenFeedback);
    } catch (error) {
      console.error("Error checking feedback status:", error);
      setHasGivenFeedback(null);
    }
  };
  

  return (
    <div className="container mx-auto px-6 py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
        Hear From Those Leading the Charge!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real stories from people making a difference in our global
          sustainability movement.
        </p>
      </div>

      {user && hasGivenFeedback === false && (
        <div className="flex justify-end mb-12">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition duration-300"
            onClick={() => setShowForm(true)}
          >
            + Add Your Review
          </button>
        </div>
      )}

      {showForm && (
        <ReviewForm
          onClose={() => setShowForm(false)}
          onFeedbackSubmit={fetchFeedbacks}
        />
      )}

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

const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col transform transition-all duration-300 hover:-translate-y-2">
    <div className="flex items-center mb-6">
      <img
        src={
          testimonial.image ||
          "https://tse4.mm.bing.net/th?id=OIP.9BVL-wy_acR02ymiRXskpQHaHa&pid=Api&P=0&h=180"
        }
        alt={testimonial.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-800">
          {testimonial.name}
        </h4>
        <p className="text-sm text-gray-600">{testimonial.role}</p>
      </div>
    </div>
    <div className="flex items-center mb-4">
      {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
        <i key={i} className="fas fa-star text-yellow-400"></i>
      ))}
      {testimonial.rating % 1 !== 0 && (
        <i className="fas fa-star-half-alt text-yellow-400"></i>
      )}
      {[...Array(5 - Math.ceil(testimonial.rating))].map((_, i) => (
        <i
          key={i + Math.floor(testimonial.rating)}
          className="fas fa-star text-gray-300"
        ></i>
      ))}
    </div>
    <p className="text-gray-600 flex-grow italic">"{testimonial.message}"</p>
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center text-green-600">
        <i className="fas fa-leaf mr-2"></i>
        <span className="font-semibold">
          {testimonial.total_carbon_credits?.toLocaleString() ||
            testimonial.generated_carbon_credits?.toLocaleString()}
        </span>
        <span className="ml-2 text-sm text-gray-600">Carbon Credit offset</span>
      </div>
    </div>
  </div>
);

const ReviewForm: React.FC<{
  onClose: () => void;
  onFeedbackSubmit: () => void;
}> = ({ onClose, onFeedbackSubmit }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  //@ts-ignore
  const [error, setError] = useState<string | null>(null);
  //@ts-ignore
  const [success, setSuccess] = useState<string | null>(null);
  const [isMessageValid, setIsMessageValid] = useState(true);
  const { user } = useAuth();

  const submitReview = async () => {
    if (!user) return;
    setError(null);
    setSuccess(null);

    const token = getWithExpirationCheck("token");

    if (!token) {
      apiResponse("Unauthorized! Please log in again.", "bg-red-500");
      return;
    }

    if (!rating || !message) {
      setError("Both rating and message are required.");
      return;
    }

    if (message.length < 50 || message.length > 100) {
      setIsMessageValid(false);
      return;
    }

    setIsMessageValid(true);

    try {
      await axios.post(
        `${backend_url}/feedback/add-feedback`,
        {
          rating,
          message,
          participant_id: user.participant?.id || null,
          service_provider_id: user.serviceProvider?.id || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Feedback submitted successfully.");
      setRating(0);
      setMessage("");
      apiResponse("Feedback Added!", "bg-green-500");
      onFeedbackSubmit();
      onClose();
    } catch (err) {
      console.error(err);
      setError("An error occurred while submitting your feedback.");
      apiResponse("Feedback not Added!", "bg-red-500");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Add Your Review
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating:
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fas fa-star cursor-pointer text-2xl mr-1 ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Message:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full p-2 border ${
              isMessageValid ? "border-gray-300" : "border-red-500"
            } rounded`}
            rows={4}
            placeholder="Share your experience..."
          ></textarea>
          {!isMessageValid && (
            <p className="text-red-500 text-xs mt-1">
              Message must be between 50 and 100 characters.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={submitReview}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
