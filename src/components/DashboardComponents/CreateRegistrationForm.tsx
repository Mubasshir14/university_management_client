/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { createRegistration } from "../Services/Registration";
import { getMeAsStudentData } from "../Services/Student";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllCoursesAccordingToStudentAcademicSession } from "../Services/Course";

interface Course {
  _id: string;
  name: string;
  courseCode: string;
  credits: number;
}

interface Department {
  _id: string;
  name: string;
}

interface Session {
  _id: string;
  name: string;
  year: string;
}

interface StudentData {
  _id: string;
  id: string;
  academicDepartment: Department;
  academicSession: Session;
  isRegistered: boolean;
  isApproved: boolean;
  year: string;
}

const CreateRegistrationForm = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [totalCredit, setTotalCredit] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoadingData(true)

  //       const studentRes = await getMeAsStudentData();
  //       if (studentRes.success) {
  //         setStudentData(studentRes.data);
  //       } else {
  //         toast.error(studentRes.message || "Failed to fetch student data");
  //       }

  //       const courseRes = await getAllCoursesAccordingToStudentAcademicSession(
  //         studentRes.data._id
  //       );

  //       if (courseRes.success) {
  //         setCourses(courseRes.data);
  //       } else {
  //         toast.error(courseRes.message || "Failed to fetch courses");
  //       }
  //     } catch (err: any) {
  //       toast.error(err.message || "Failed to fetch data");
  //     } finally {
  //       setLoadingData(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);

        // 🧍‍♂️ Fetch Student Data
        const studentRes = await getMeAsStudentData();
        if (!studentRes.success) {
          toast.error(studentRes.message || "Failed to fetch student data");
          return;
        }

        const student = studentRes.data;
        setStudentData(student);

        // 🎓 Determine yearPrefix based on student's academic year
        const prefixMap: Record<string, string> = {
          "1st Year 1st Semester": "11",
          "1st Year 2nd Semester": "12",
          "2nd Year 1st Semester": "21",
          "2nd Year 2nd Semester": "22",
          "3rd Year 1st Semester": "31",
          "3rd Year 2nd Semester": "32",
          "4th Year 1st Semester": "41",
          "4th Year 2nd Semester": "42",
        };
        const studentPrefix = prefixMap[student.year] || "";

        // 📘 Fetch All Courses
        const courseRes = await getAllCoursesAccordingToStudentAcademicSession(
          student._id
        );
        if (!courseRes.success) {
          toast.error(courseRes.message || "Failed to fetch courses");
          return;
        }

        // 🧮 Extract prefix dynamically from courseCode
        const filteredCourses = courseRes.data.filter((course: any) => {
          const code = course.courseCode || "";
          const dashIndex = code.lastIndexOf("-");
          if (dashIndex === -1) return false;

          // extract next 2 chars after '-'
          const prefix = code.substring(dashIndex + 1, dashIndex + 3);
          return prefix === studentPrefix;
        });

        setCourses(filteredCourses);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch data");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sum = selectedCourses.reduce((acc, courseId) => {
      const course = courses.find((c) => c._id === courseId);
      return acc + (course?.credits ?? 0);
    }, 0);
    setTotalCredit(sum);
  }, [selectedCourses, courses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentData) {
      toast.error("Student data not loaded");
      return;
    }

    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course");
      return;
    }

    if (totalCredit < 9 || totalCredit > 15) {
      toast.error(`Total credit (${totalCredit}) must be between 9 and 15`);
      return;
    }

    const payload = {
      student: studentData._id,
      student_id: studentData.id,
      academicDepartment: studentData.academicDepartment,
      academicSession: studentData.academicSession,
      courses: selectedCourses,
      totalCredit,
    };

    setLoading(true);
    try {
      const res = await createRegistration(payload);
      if (res.success) {
        toast.success("Registration created successfully");
        setSelectedCourses([]);
        setTotalCredit(0);
        router.push("/student/dashboard/registration-information");
      } else {
        toast.error(res.message || "Failed to create registration");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create registration");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="text-center text-gray-500 mt-10">Loading data...</div>
    );
  }

  if (!studentData) {
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load student data.
      </div>
    );
  }

  if (studentData.isRegistered) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            type="button"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
          >
            ALREADY REGISTERED
          </Button>

          <div className="mt-6">
            <Link href="/student/dashboard" className="mt-6">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                Go Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto p-6  rounded-xl  backdrop-blur-md font-sansita">
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 ">
        Course Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex  justify-between px-2">
          <div className="">
            <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
              Academic Department
            </Label>
            <Select value={studentData.academicDepartment._id} disabled>
              <SelectTrigger>
                <SelectValue className="">
                  {studentData.academicDepartment.name}
                </SelectValue>
              </SelectTrigger>
            </Select>
          </div>
          <div className="px-2">
            <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
              Academic Session
            </Label>
            <Select value={studentData.academicSession._id} disabled>
              <SelectTrigger>
                <SelectValue>
                  {studentData.academicSession.name} -{" "}
                  {studentData.academicSession.year}
                </SelectValue>
              </SelectTrigger>
            </Select>
          </div>
        </div>
        <div>
          <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
            Academic Semester
          </Label>
          <Select value={studentData.academicSession._id} disabled>
            <SelectTrigger>
              <SelectValue>{studentData.year}</SelectValue>
            </SelectTrigger>
          </Select>
        </div>
        <div>
          <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
            Courses
          </Label>
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-auto border rounded p-2 bg-white/10">
            {courses.map((course) => (
              <label
                key={course._id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={course._id}
                  checked={selectedCourses.includes(course._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCourses([...selectedCourses, course._id]);
                    } else {
                      setSelectedCourses(
                        selectedCourses.filter((id) => id !== course._id)
                      );
                    }
                  }}
                  className="cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium"
                />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                  {`${course.name} (${course.courseCode}) - ${course.credits} Credits `}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-1 text-sm font-medium text-blue-600">
            Total Credits: {totalCredit} (Minimum is 9 & Maximum is 15)
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
          disabled={
            loading ||
            studentData.isRegistered ||
            studentData.isApproved == false
          }
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </Button>
      </form>
    </section>
  );
};

export default CreateRegistrationForm;
