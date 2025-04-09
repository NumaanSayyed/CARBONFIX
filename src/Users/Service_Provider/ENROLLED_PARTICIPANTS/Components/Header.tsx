import React from "react";

interface EnrolledParticipantsHeaderProps {
    toggleNotifications: () => void;
    notifications: { isRead: boolean; }[];
}

const Header: React.FC<EnrolledParticipantsHeaderProps> = ({
    toggleNotifications,
    notifications,
}) => {
    return (
        <header className="bg-white  shadow-lg relative ">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                {/* Back Button */}
                <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors !rounded-button"
                onClick={() => window.history.back()}>
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Dashboard
                </button>

                {/* Page Title */}
                <h1 className="text-2xl font-bold text-gray-900 font-inter">
                    Enrolled Participants
                </h1>

                {/* Notifications Button */}
                <div className="relative mt-2"> 
                    <button
                        onClick={toggleNotifications}
                        className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative !rounded-button z-20"
                    >
                        <i className="fas fa-bell text-xl"></i>
                        {notifications.filter((n) => !n.isRead).length > 0 && (
                            <span className="absolute top-2 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                {notifications.filter((n) => !n.isRead).length}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
