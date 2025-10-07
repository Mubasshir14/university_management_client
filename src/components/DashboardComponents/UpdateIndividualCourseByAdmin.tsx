/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { updateAndDropCourseByAdmin } from "../Services/Registration";
import {
  Book,
  Building,
  CheckCircle,
  Clock,
  Loader2,
  Trash2,
  User,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  name: string;
  credits: number;
  shortName: string;
  courseCode: string;
}

interface AcademicDepartment {
  _id: string;
  name: string;
  shortName?: string;
}

interface AcademicSession {
  _id: string;
  name: string;
  year: string;
  code?: string;
  startMonth?: string;
}

interface Student {
  _id: string;
  id: string;
  firstName: string;
  lastName?: string;
  image?: string;
  year: string;
}

interface RegistrationData {
  _id: string;
  student_id: string;
  totalCredit: number;
  isApproved: boolean;
  academicDepartment: AcademicDepartment;
  academicSession: AcademicSession;
  courses: Course[];
  student: Student;
}

interface Props {
  studentId: string;
  onClose: () => void;
}

const UpdateIndividualCourseByAdmin = ({
  registration,
}: {
  registration: RegistrationData;
}) => {
  const [selectedCoursesToDrop, setSelectedCoursesToDrop] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCourseToggle = (courseId: string) => {
    setSelectedCoursesToDrop((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleDropCourses = async () => {
    if (!registration || selectedCoursesToDrop.length === 0) {
      toast.error("Please select at least one course to drop");
      return;
    }

    const creditsToDrop = registration.courses
      .filter((course) => selectedCoursesToDrop.includes(course._id))
      .reduce((sum, course) => sum + course.credits, 0);
    const remainingCredit = registration.totalCredit - creditsToDrop;

    if (remainingCredit < 9 || remainingCredit > 15) {
      toast.error(
        `Remaining credit (${remainingCredit}) must be between 9 and 15`
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const regData = {
        studentId: registration.student._id,
        academicSessionId: registration.academicSession?._id,
        academicDepartmentId: registration.academicDepartment?._id,
        courseIdsToDrop: selectedCoursesToDrop,
      };

      const response = await updateAndDropCourseByAdmin(regData);

      if (response.success) {
        toast.success("Courses dropped successfully!");
        router.push("/admin/dashboard/pending-registration");
      } else {
        toast.error(response.message || "Failed to drop courses");
      }
    } catch (error: any) {
      toast.error(
        error.message || "Something went wrong while dropping courses"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!registration) {
    return (
      <div className="text-center text-red-500 mt-6 p-4 bg-red-100 rounded-lg">
        No registration information found.
      </div>
    );
  }

  if (registration.isApproved) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-600 flex items-center justify-center gap-2">
          <CheckCircle className="h-8 w-8" />
          Registration Approved
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          You cannot update now. Your registration has already been approved.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto mt-10 p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 font-sansita">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center gap-2">
        <Book className="h-8 w-8" /> Update Registration Information
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
              {registration?.student_id}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Total Credit:
              </span>{" "}
              {registration?.totalCredit}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Registration Approval Status:
              </span>{" "}
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                <Clock className="h-4 w-4" />
                Pending
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
              {registration?.academicDepartment?.name}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Session:
              </span>{" "}
              {`${registration?.academicSession?.name} - ${registration?.academicSession?.year}`}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Year:
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
            <>
              <ul className="space-y-3">
                {registration.courses.map((course: Course, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-900/70 transition-colors"
                  >
                    <Input
                      type="checkbox"
                      checked={selectedCoursesToDrop.includes(course._id)}
                      onChange={() => handleCourseToggle(course._id)}
                      className="h-5 w-5 text-blue-600"
                    />
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
              {registration.totalCredit <= 9 ? (
                <p className="flex items-center justify-center">
                  <small className="capitalize italic text-xs text-center my-2 text-red-600">
                    You cannot drop courses if you have 9 or fewer credits
                  </small>
                </p>
              ) : null}
              <Button
                onClick={handleDropCourses}
                disabled={
                  isSubmitting ||
                  selectedCoursesToDrop.length === 0 ||
                  registration.totalCredit <= 9
                }
                className="mt-4 bg-red-600 hover:bg-red-700 text-white"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Trash2 className="h-5 w-5 mr-2" />
                )}
                {isSubmitting ? "Dropping Courses..." : "Drop Selected Courses"}
              </Button>
            </>
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

export default UpdateIndividualCourseByAdmin;
