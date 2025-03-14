import React, { useState, useEffect } from "react";

interface Student {
    id: string;
    name: string;
    avatar: string;
    status: "Active" | "Pending" | "Inactive";
    enrolled: string;
    enrollmentDate: string;
    carbonPoints: number;
    email: string;
}

const StudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

    // ✅ Dummy Data
    useEffect(() => {
        setStudents([
            { id: "S1001", name: "Emily Richardson", avatar: "https://randomuser.me/api/portraits/women/44.jpg", status: "Active", enrolled: "Forestation", enrollmentDate: "2025-02-28", carbonPoints: 200, email: "emily@example.com" },
            { id: "S1002", name: "Michael Anderson", avatar: "https://randomuser.me/api/portraits/men/50.jpg", status: "Pending", enrolled: "Water Conservation", enrollmentDate: "2025-03-01", carbonPoints: 150, email: "michael@example.com" },
            { id: "S1003", name: "Sarah Williams", avatar: "https://randomuser.me/api/portraits/women/48.jpg", status: "Inactive", enrolled: "Soil Restoration", enrollmentDate: "2025-03-03", carbonPoints: 80, email: "sarah@example.com" },
            { id: "S1004", name: "David Martinez", avatar: "https://randomuser.me/api/portraits/men/52.jpg", status: "Active", enrolled: "Solar Energy Initiative", enrollmentDate: "2025-03-05", carbonPoints: 300, email: "david@example.com" },
        ]);
    }, []);

    // ✅ Toggle Row Expansion
    const toggleStudentDetails = (studentId: string) => {
        setExpandedStudentId(expandedStudentId === studentId ? null : studentId);
    };

    // ✅ Get status badge color
    const getStatusClass = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-emerald-100 text-emerald-600";
            case "Pending":
                return "bg-orange-100 text-orange-600";
            case "Inactive":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mt-24 mb-16 max-w-7xl w-full">
                {/* ✅ Header with Search */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Enrolled Students</h2>
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* ✅ Student List */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {["S.No", "Student", "Email", "Program", "Carbon Points", "Enrollment Date", "Status"].map((heading) => (
                                    <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students
                                .filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((student, index) => (
                                    <React.Fragment key={student.id}>
                                        {/* ✅ Main Row */}
                                        <tr
                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => toggleStudentDetails(student.id)}
                                        >
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                                <img className="w-8 h-8 rounded-full shadow-md" src={student.avatar} alt={student.name} />
                                                {student.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{student.email}</td>
                                            <td className="px-6 py-4">{student.enrolled}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">{student.carbonPoints}</td>
                                            <td className="px-6 py-4">{student.enrollmentDate}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(student.status)}`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                        </tr>

                                        {/* ✅ Expanded Details Row */}
                                        {expandedStudentId === student.id && (
                                            <tr className="bg-gray-50">
                                                <td colSpan={7} className="p-4">
                                                    <div className="flex items-center gap-6">
                                                        {/* ✅ Avatar */}
                                                        <img className="w-20 h-20 rounded-full shadow-md border" src={student.avatar} alt={student.name} />

                                                        {/* ✅ Details */}
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                                                            <p className="text-sm text-gray-600">
                                                                <strong>Email:</strong> {student.email}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                <strong>Program:</strong> {student.enrolled}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                <strong>Enrollment Date:</strong> {student.enrollmentDate}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                <strong>Carbon Points:</strong> {student.carbonPoints}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                <strong>Status:</strong> <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(student.status)}`}>{student.status}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentList;
