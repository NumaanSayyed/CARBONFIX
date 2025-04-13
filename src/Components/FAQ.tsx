import React, { useState } from "react";

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "general", name: "General Questions", icon: "fa-globe" },
    { id: "users", name: "User Specific", icon: "fa-users" },
    { id: "technical", name: "Technical Support", icon: "fa-gear" },
    { id: "projects", name: "Projects & Rewards", icon: "fa-award" },
  ];

  const faqData = {
    general: [
      {
        question: "What is the Carbon Compensation Platform?",
        answer:
          "Our Carbon Compensation Platform is a comprehensive digital ecosystem designed to help individuals and organizations track, reduce, and offset their carbon footprint. Through innovative technology and partnerships, we enable users to make meaningful contributions to environmental sustainability.",
      },
      {
        question: "How do I earn carbon credits?",
        answer:
          "You can earn carbon credits through various activities such as using public transportation, reducing energy consumption, participating in local environmental projects, and making sustainable purchasing decisions. Each verified action contributes to your carbon credit balance.",
      },
      {
        question: "What are the benefits of joining?",
        answer:
          "Members enjoy multiple benefits including: personalized sustainability tracking, access to exclusive eco-friendly products and services, community engagement opportunities, educational resources, and rewards for environmental actions. Plus, you'll be part of a global movement for positive change.",
      },
    ],
    users: [
      {
        question: "How can I enroll in sustainability projects?",
        answer:
          'Enrolling in sustainability projects is simple. Navigate to the Projects section, browse available options, and click "Enroll" on your chosen project. You\'ll receive immediate access to project materials and can track your progress through your dashboard.',
      },
      {
        question: "How can service providers list sustainability projects?",
        answer:
          "Service providers can create an account, complete our verification process, and use our Project Management Portal to list their sustainability initiatives. We provide tools for project creation, participant management, and impact tracking.",
      },
      {
        question: "How can institutions track student engagement?",
        answer:
          "Institutions receive access to our comprehensive Analytics Dashboard, offering real-time insights into student participation, project effectiveness, and environmental impact metrics. Custom reports can be generated for specific timeframes and activities.",
      },
    ],
    technical: [
      {
        question: "How do I reset my password?",
        answer:
          'To reset your password, click the "Forgot Password" link on the login page. Enter your registered email address to receive a password reset link. Follow the link to create a new secure password. For security, the link expires after 24 hours.',
      },
      {
        question: "Who do I contact for account-related issues?",
        answer:
          "For account-related support, contact our dedicated support team available 24/7 through: Email: support@carbonplatform.com, Live Chat: Available on our website, Phone: +1 (800) 123-4567. Average response time is under 2 hours.",
      },
      {
        question: "Is my data secure on this platform?",
        answer:
          "Yes, we implement industry-leading security measures including end-to-end encryption, regular security audits, and compliance with GDPR and other privacy regulations. Your data is stored in secure, encrypted databases with regular backups.",
      },
    ],
    projects: [
      {
        question: "How are carbon credits tracked?",
        answer:
          "Carbon credits are tracked using our proprietary blockchain-based system that ensures transparency and accuracy. Each action is verified, recorded, and converted to carbon credits using standardized calculations. Real-time tracking is available in your dashboard.",
      },
      {
        question: "What rewards can I earn?",
        answer:
          "Our rewards project offers various incentives including: Eco-friendly product discounts, Premium membership benefits, Partner project vouchers, Community recognition badges, and Carbon credit multipliers. Rewards are automatically credited to your account upon qualifying actions.",
      },
      {
        question: "How do I verify my project completion?",
        answer:
          "Project completion is automatically verified through our platform. Upon meeting all project requirements, you'll receive a digital certificate of completion, and your account will be credited with the corresponding rewards and carbon credits.",
      },
    ],
  };

  const filteredFAQs = faqData[activeCategory as keyof typeof faqData].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Sustainability Support Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find detailed answers about our Carbon Compensation Platform and
            learn how you can contribute to a sustainable future
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full py-4 pl-12 pr-4 text-gray-700 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Selector */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-6 rounded-lg shadow-md transition-all duration-300 flex flex-col items-center space-y-3 hover:transform hover:-translate-y-1 !rounded-button whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-green-50"
                }`}
              >
                <i className={`fas ${category.icon} text-2xl`}></i>
                <span className="font-semibold">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none focus:bg-green-50 !rounded-button whitespace-nowrap"
              >
                <span className="text-sm md:text-xl font-semibold text-gray-800 break-words whitespace-normal">
                  {faq.question}
                </span>

                <i
                  className={`fas fa-chevron-down text-green-600 transition-transform duration-300 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                ></i>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  activeIndex === index ? "max-h-96 px-8 py-6" : "max-h-0"
                }`}
              >
                <p className="text-lg text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 -z-10">
        <img
          src="https://public.readdy.ai/ai/img_res/7ff9ebd6400cca15d6d6066b5ac9849d.jpg"
          alt="Decorative pattern"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 -z-10 transform rotate-180">
        <img
          src="https://public.readdy.ai/ai/img_res/5db6e776fd05ccea64a9c869e8d44df6.jpg"
          alt="Decorative pattern"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
    </div>
  );
};

export default FAQ;
