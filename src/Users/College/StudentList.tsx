import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../../backend_route";
import { getWithExpirationCheck } from "../../Helpers/Helpers";

interface Student {
  id: string;
  name: string;
  avatar: string;
  status: "Completed" | "WIP";
  carbonCredits:number;
  enrollmentDate:string;
  enrolled: {
    project: string;
    projectEnrollmentDate: string;
    projectCarbonPoints: number;
    project_enroll_status: "Completed" | "WIP";
  }[];
  email: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${backend_url}/college/student-list`, {
          headers: {
            Authorization: `Bearer ${getWithExpirationCheck("token")}`,
          },
        });

        const fetchedStudents = response.data.map((student: any, index: number) => ({
          id: `S${1001 + index}`,
          name: student.full_name,
          avatar: `https://tse4.mm.bing.net/th?id=OIP.9BVL-wy_acR02ymiRXskpQHaHa&pid=Api&P=0&h=180`,
          carbonCredits:student.total_carbon_credits ?? 0,
          enrollmentDate:new Date(student.date_of_joining).toISOString().split("T")[0],
          status: student.projects.some((p: any) => p.project_enroll_status === "WIP") ? "WIP" : "Completed",
          enrolled: student.projects.map((project: any) => ({
            project: project.project_name,
            carbonCredits:student.total_carbon_credits ?? 0,
            // projectEnrollmentDate: new Date(student.date_of_joining).toISOString().split("T")[0],
            projectCarbonPoints: student.total_carbon_credits ?? 0,
            project_enroll_status: "NA", // static fallback; replace if available from backend
          })),
          email: student.email,
        }));

        setStudents(fetchedStudents);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  const toggleStudentDetails = (studentId: string) => {
    setExpandedStudentId(expandedStudentId === studentId ? null : studentId);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mt-24 mb-16 max-w-7xl w-full">
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

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["S.No", "Student", "Email", "Project", "Carbon Credits", "Join Date On CarbonFix"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students
                .filter((student) =>
                  student.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((student, index) => (
                  <React.Fragment key={student.id}>
                    <tr
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => toggleStudentDetails(student.id)}
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                        <img
                          className="w-8 h-8 rounded-full shadow-md"
                          src={student.avatar}
                          alt={student.name}
                        />
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{student.email}</td>
                      <td className="px-6 py-4">
                        {student.enrolled.map((e) => e.project).join(", ")}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {student.carbonCredits}
                      </td>
                      <td className="px-6 py-4">{student.enrollmentDate}</td>
                    </tr>

                    {expandedStudentId === student.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="p-4">
                          <div className="grid grid-cols-5 gap-4 text-sm text-gray-600 font-semibold border-b pb-2">
                            <p>Project</p>
                            <p>Joining Date</p>
                            <p>Total Credits</p>
                            <p>Status</p>
                            <p>Estimated CC</p>
                          </div>
                          {student.enrolled.map((enrollment, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-5 gap-4 text-sm text-gray-600 border-b py-2"
                            >
                              <p>{enrollment.project}</p>
                              <p>{"NA"}</p>
                              <p>{`NA`}</p>
                              <p>
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    enrollment.project_enroll_status === "Completed"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {enrollment.project_enroll_status}
                                </span>
                              </p>
                              {/* <p>{enrollment.projectCarbonPoints * 0.1} CC</p> */}
                              <p>{"NA"} CC</p>
                            </div>
                          ))}
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
