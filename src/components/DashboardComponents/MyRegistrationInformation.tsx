/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getMeAsStudentData } from "../Services/Student";
import { getMyRegistrationInfo } from "../Services/Registration";
import { toast } from "sonner";
import {
  Loader2,
  User,
  Book,
  CheckCircle,
  Clock,
  Building,
} from "lucide-react";

interface Course {
  _id: string;
  name: string;
  credits: number;
  shortName: string;
  courseCode: string;
}

interface RegistrationData {
  student_id: string;
  year: string;
  student: any;
  totalCredit: number;
  isApproved: boolean;
  academicDepartment: { name: string };
  academicSession: { name: string; year: string };
  courses: Course[];
}

const MyRegistrationInformation = () => {
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrationInfo = async () => {
      try {
        setLoading(true);

        const studentRes = await getMeAsStudentData();
        if (!studentRes.success) {
          toast.error(studentRes.message || "Failed to get student data");
          return;
        }

        const studentId = studentRes.data._id;
        const registrationRes = await getMyRegistrationInfo(studentId);

        if (registrationRes?.success === false) {
          toast.error(registrationRes.message || "Registration not found");
          return;
        }

        setRegistration(registrationRes.data);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading registration info...</span>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="text-center text-red-500 mt-6 p-4 bg-red-100 rounded-lg">
        No registration information found.
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto mt-10 p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 font-sansita">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center gap-2">
        <Book className="h-8 w-8" /> My Registration Information
      </h2>

      <div className="grid gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Student Details
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Student ID:
              </span>{" "}
              {registration.student_id}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Total Credit:
              </span>{" "}
              {registration.totalCredit}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Registration Approval Status:
              </span>{" "}
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                  registration.isApproved
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {registration.isApproved ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
                {registration.isApproved ? "Approved" : "Pending"}
              </span>
            </p>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Building className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Academic Details
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Department:
              </span>{" "}
              {registration.academicDepartment?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Session:
              </span>{" "}
              {registration.academicSession?.name} -{" "}
              {registration.academicSession?.year}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Semester:
              </span>{" "}
              {registration.student.year}
            </p>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Book className="h-6 w-6 text-pink-600" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Selected Courses
            </h3>
          </div>
          {registration.courses?.length > 0 ? (
            <ul className="space-y-3">
              {registration.courses.map((course, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-900/70 transition-colors"
                >
                  <span className="h-2 w-2 bg-blue-500 rounded-full" />
                  <div>
                    <p className="font-medium">
                      {course.name} ({course.courseCode})
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.credits} Credits
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No courses registered.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyRegistrationInformation;