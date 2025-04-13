// import React from "react";

// interface Notification {
//     id: string;
//     type: "enrollment" | "update" | "alert";
//     message: string;
//     timestamp: string;
//     isRead: boolean;
// }

// interface NotificationPanelProps {
//     notifications: Notification[];
//     showNotifications: boolean;
//     toggleNotifications: () => void;
//     markAllAsRead: () => void;
//     clearAllNotifications: () => void;
// }

// const NotificationPanel: React.FC<NotificationPanelProps> = ({
//     notifications,
//     showNotifications,
//     toggleNotifications,
//     markAllAsRead,
//     clearAllNotifications,
// }) => {
//     if (!showNotifications) return null;

//     return (
//         <div className="fixed inset-y-0 right-0 w-full pt-20 sm:w-96 bg-white shadow-lg transform transition-transform">
//             <div className="p-4 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
//                     <button
//                         onClick={toggleNotifications}
//                         className="text-gray-400 hover:text-gray-500"
//                     >
//                         <i className="fas fa-times"></i>
//                     </button>
//                 </div>
//                 <div className="flex items-center justify-between mt-4">
//                     <button
//                         onClick={markAllAsRead}
//                         className="text-sm text-blue-600 hover:text-blue-700"
//                     >
//                         Mark all as read
//                     </button>
//                     <button
//                         onClick={clearAllNotifications}
//                         className="text-sm text-gray-600 hover:text-gray-700"
//                     >
//                         Clear all
//                     </button>
//                 </div>
//             </div>
//             <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
//                 {notifications.map((notification) => (
//                     <div
//                         key={notification.id}
//                         className={`p-4 rounded-lg ${notification.isRead ? "bg-gray-50" : "bg-blue-50"
//                             }`}
//                     >
//                         <div className="flex items-start gap-3">
//                             <div
//                                 className={`p-2 rounded-full ${notification.type === "enrollment"
//                                         ? "bg-green-100 text-green-600"
//                                         : notification.type === "update"
//                                             ? "bg-blue-100 text-blue-600"
//                                             : "bg-yellow-100 text-yellow-600"
//                                     }`}
//                             >
//                                 <i
//                                     className={`fas ${notification.type === "enrollment"
//                                             ? "fa-user-plus"
//                                             : notification.type === "update"
//                                                 ? "fa-sync"
//                                                 : "fa-exclamation-triangle"
//                                         }`}
//                                 ></i>
//                             </div>
//                             <div className="flex-1">
//                                 <p className="text-sm text-gray-900">{notification.message}</p>
//                                 <p className="text-xs text-gray-500 mt-1">
//                                     {notification.timestamp}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NotificationPanel;

import React from "react";

interface Notification {
    id: string;
    type: "enrollment" | "update" | "alert";
    message: string;
    timestamp: string;
    isRead: boolean;
}

interface NotificationPanelProps {
    notifications: Notification[];
    showNotifications: boolean;
    toggleNotifications: () => void;
    markAllAsRead: () => void;
    clearAllNotifications: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
    notifications,
    showNotifications,
    toggleNotifications,
    markAllAsRead,
    clearAllNotifications,
}) => {
    if (!showNotifications) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-full pt-20 sm:w-96 bg-white shadow-lg transform transition-transform">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                    <button
                        onClick={toggleNotifications}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-700"
                    >
                        Mark all as read
                    </button>
                    <button
                        onClick={clearAllNotifications}
                        className="text-sm text-gray-600 hover:text-gray-700"
                    >
                        Clear all
                    </button>
                </div>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg ${notification.isRead ? "bg-gray-50" : "bg-blue-50"}`}
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className={`p-2 rounded-full ${
                                    notification.type === "enrollment"
                                        ? "bg-green-100 text-green-600"
                                        : notification.type === "update"
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-yellow-100 text-yellow-600"
                                }`}
                            >
                                <i
                                    className={`fas ${
                                        notification.type === "enrollment"
                                            ? "fa-user-plus"
                                            : notification.type === "update"
                                            ? "fa-sync"
                                            : "fa-exclamation-triangle"
                                    }`}
                                ></i>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {notification.timestamp}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPanel;
