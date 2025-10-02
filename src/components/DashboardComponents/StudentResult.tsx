/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getAllStudentResults } from "../Services/result";

const StudentResult = () => {
  const [result, setResult] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudentResult = async () => {
      try {
        setLoading(true);
        const data = await getAllStudentResults();

        if (data.data) {
          setResult(data.data);
        } else {
          toast.error(data?.message || "Failed to fetch students");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentResult();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading results...</span>
      </div>
    );
  }

  if (!result || result.length === 0) {
    return (
      <div className="text-center text-red-500 mt-6 p-4 bg-red-100 rounded-lg font-sansita">
        No results found!
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto mt-10 p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 font-sansita">
      <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-8">
        Student Results
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100 dark:bg-gray-700">
              <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                Student Name
              </th>
              <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                Student ID
              </th>
              <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                Department
              </th>
              <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                Session
              </th>
              <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                Year
              </th>
              <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                Average Marks
              </th>
              <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                Average Grade
              </th>
              <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                Grade Points
              </th>
              <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                Course Details
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map((res: any, idx: number) => (
              <tr
                key={idx}
                className="border-b border-gray-200 dark:border-gray-600 hover:bg-white/50 dark:hover:bg-gray-900/50 transition-colors text-xs"
              >
                <td className="p-3 text-xs text-gray-700 dark:text-gray-300">
                  {res.student.firstName} {res.student.lastName}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {res.student.id}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {res.registration.academicDepartment?.name || "N/A"}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {res.registration.academicSemester?.name || "N/A"} -{" "}
                  {res.registration.academicSemester?.year || "N/A"}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {res.student.year}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {res.averageMarks}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {res.avgGrade}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {res.avgGradePoints}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  <div className="max-h-32 overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-2 shadow-sm">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-blue-200 dark:bg-gray-600">
                          <th className="p-2 font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-500">
                            Course Code
                          </th>
                          <th className="p-2 font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-500">
                            Course Name
                          </th>
                          <th className="p-2 font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-500">
                            Credits
                          </th>
                          <th className="p-2 font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-500">
                            Marks
                          </th>
                          <th className="p-2 font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-500">
                            Grade
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {res.coursesMarks.map(
                          (course: any, courseIdx: number) => (
                            <tr
                              key={courseIdx}
                              className={`${
                                courseIdx % 2 === 0
                                  ? "bg-white/80 dark:bg-gray-800/80"
                                  : "bg-gray-100/80 dark:bg-gray-900/80"
                              } hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors`}
                            >
                              <td className="p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                                {course.courseId?.courseCode || "N/A"}
                              </td>
                              <td className="p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                                {course.courseId?.name || "N/A"}
                              </td>
                              <td className="p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 text-center">
                                {course.courseId?.credits || 0}
                              </td>
                              <td className="p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 text-center">
                                {course.total || 0}
                              </td>
                              <td className="p-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 text-center">
                                {course.total >= 0 && course.total <= 19
                                  ? "F"
                                  : course.total >= 20 && course.total <= 39
                                  ? "D"
                                  : course.total >= 40 && course.total <= 59
                                  ? "C"
                                  : course.total >= 60 && course.total <= 79
                                  ? "B"
                                  : course.total >= 80 && course.total <= 100
                                  ? "A"
                                  : "N/A"}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentResult;
