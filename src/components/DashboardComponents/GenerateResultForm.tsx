/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  getApprovedRegisteredStudent,
  getSingleRegistration,
} from "../Services/Registration";
import { useRouter } from "next/navigation";
import { generateStudentResult } from "../Services/result";

// ------------------ Types ------------------
type Course = {
  _id: string;
  name: string;
  midTerm1?: number;
  midTerm2?: number;
  finalTerm?: number;
};

type Registration = {
  _id: string;
  student_id: string;
  student: any;
  courses: Course[];
};

// ------------------ Helper ------------------
export const calculateGradeAndPoints = (totalMarks: number) => {
  let result = {
    grade: "NA",
    gradePoints: 0,
  };

  if (totalMarks >= 0 && totalMarks <= 19) {
    result = {
      grade: "F",
      gradePoints: 0.0,
    };
  } else if (totalMarks >= 20 && totalMarks <= 39) {
    result = {
      grade: "D",
      gradePoints: 2.0,
    };
  } else if (totalMarks >= 40 && totalMarks <= 59) {
    result = {
      grade: "C",
      gradePoints: 3.0,
    };
  } else if (totalMarks >= 60 && totalMarks <= 79) {
    result = {
      grade: "B",
      gradePoints: 3.5,
    };
  } else if (totalMarks >= 80 && totalMarks <= 100) {
    result = {
      grade: "A",
      gradePoints: 4.0,
    };
  } else {
    result = {
      grade: "NA",
      gradePoints: 0,
    };
  }

  return result;
};

export default function GenerateResultForm() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [courseMarks, setCourseMarks] = useState<Course[]>([]);
  const [averageMarks, setAverageMarks] = useState(0);
  const [cgpa, setCgpa] = useState({ grade: "NA", gradePoints: 0 });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getApprovedRegisteredStudent();

        if (data.data) {
          const filtered = data.data.filter(
            (reg: any) => reg.isResultPublished === false
          );
          setRegistrations(filtered);
        } else {
          toast.error(data?.message || "Failed to fetch students");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleSelectRegistration = async (id: string) => {
    const reg = registrations.find((r) => r._id === id);
    if (!reg) return;

    try {
      setLoading(true);
      const res = await getSingleRegistration(id);
      setSelectedRegistration(res.data);
      setCourseMarks(
        res.data.courses.map((c: Course) => ({
          ...c,
          midTerm1: 0,
          midTerm2: 0,
          finalTerm: 0,
        }))
      );
      setErrors({});
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch registration details");
    } finally {
      setLoading(false);
    }
  };


  const handleMarksChange = (
    index: number,
    field: keyof Course,
    value: string
  ) => {
    const numValue = Number(value);
    const newErrors = { ...errors };
    const courseId = courseMarks[index]._id;

    if (field === "midTerm1" && (numValue < 0 || numValue > 20)) {
      newErrors[`${courseId}-midTerm1`] = "MidTerm 1 must be between 0 and 10";
    } else if (field === "midTerm2" && (numValue < 0 || numValue > 20)) {
      newErrors[`${courseId}-midTerm2`] = "MidTerm 2 must be between 0 and 10";
    } else if (field === "finalTerm" && (numValue < 0 || numValue > 60)) {
      newErrors[`${courseId}-finalTerm`] =
        "Final Term must be between 0 and 40";
    } else {
      delete newErrors[`${courseId}-${field}`];
    }

    setErrors(newErrors);

    const newMarks = [...courseMarks];
    (newMarks[index] as any)[field] = numValue || 0;
    setCourseMarks(newMarks);

    const totals = newMarks.map(
      (c) => (c.midTerm1 || 0) + (c.midTerm2 || 0) + (c.finalTerm || 0)
    );
    const total = totals.reduce((a, b) => a + b, 0);
    const avg = newMarks.length > 0 ? total / newMarks.length : 0;
    setAverageMarks(avg);
    setCgpa(calculateGradeAndPoints(avg));
  };


  const handleSubmit = async () => {
    if (!selectedRegistration) {
      toast.error("Please select a registration");
      return;
    }
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix all input errors before submitting");
      return;
    }

    const courseMarksData = courseMarks.map((course) => ({
      courseId: course._id,
      midTerm1: course.midTerm1 ?? 0,
      midTerm2: course.midTerm2 ?? 0,
      finalTerm: course.finalTerm ?? 0,
      total:
        (course.midTerm1 ?? 0) +
        (course.midTerm2 ?? 0) +
        (course.finalTerm ?? 0),
    }));

    setLoading(true);
    try {
      const res = await generateStudentResult(
        selectedRegistration._id,
        courseMarksData
      );
      console.log(res);
      if (res) {
        toast.success("Result generated successfully!");
        router.push("/admin/dashboard/student-result");
        setCourseMarks(
          courseMarks.map((c) => ({
            ...c,
            midTerm1: 0,
            midTerm2: 0,
            finalTerm: 0,
          }))
        );
        setAverageMarks(0);
        setCgpa({ grade: "NA", gradePoints: 0 });
        setSelectedRegistration(null);
        setErrors({});
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto mt-10 shadow-2xl rounded-2xl bg-white font-sansita">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-2xl">
        <CardTitle className="text-2xl font-bold">
          Generate Student Result
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Select Registration
          </label>
          <Select onValueChange={handleSelectRegistration} disabled={loading}>
            <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 ">
              <SelectValue placeholder="Select a registration" />
            </SelectTrigger>
            <SelectContent className="font-bold font-sansita">
              {registrations.map((reg) => (
                <SelectItem key={reg._id} value={reg._id}>
                  {`${reg.student.name} (${reg.student_id})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

       
        {courseMarks.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-center bg-white">
              <thead className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  font-semibold">
                <tr>
                  <th className="p-3">Course</th>
                  <th className="p-3">MidTerm 1 (Max 20)</th>
                  <th className="p-3">MidTerm 2 (Max 20)</th>
                  <th className="p-3">Final Term (Max 60)</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {courseMarks.map((course, idx) => {
                  const total =
                    (course.midTerm1 || 0) +
                    (course.midTerm2 || 0) +
                    (course.finalTerm || 0);
                  return (
                    <tr key={course._id} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium">
                        {course.name || `Course ${idx + 1}`}
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          min={0}
                          max={20}
                          value={course.midTerm1}
                          onChange={(e) =>
                            handleMarksChange(idx, "midTerm1", e.target.value)
                          }
                          className={`w-24 mx-auto ${
                            errors[`${course._id}-midTerm1`]
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="0-20"
                        />
                        {errors[`${course._id}-midTerm1`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`${course._id}-midTerm1`]}
                          </p>
                        )}
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          min={0}
                          max={20}
                          value={course.midTerm2}
                          onChange={(e) =>
                            handleMarksChange(idx, "midTerm2", e.target.value)
                          }
                          className={`w-24 mx-auto ${
                            errors[`${course._id}-midTerm2`]
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="0-20"
                        />
                        {errors[`${course._id}-midTerm2`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`${course._id}-midTerm2`]}
                          </p>
                        )}
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          min={0}
                          max={60}
                          value={course.finalTerm}
                          onChange={(e) =>
                            handleMarksChange(idx, "finalTerm", e.target.value)
                          }
                          className={`w-24 mx-auto ${
                            errors[`${course._id}-finalTerm`]
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="0-60"
                        />
                        {errors[`${course._id}-finalTerm`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`${course._id}-finalTerm`]}
                          </p>
                        )}
                      </td>
                      <td className="p-3 font-semibold text-blue-600">
                        {total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

       
        {courseMarks.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-1 mb-4 sm:mb-0">
              <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Average Marks:{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {averageMarks.toFixed(2)}
                </span>
              </p>
              <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Grade:{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {cgpa.grade}
                </span>{" "}
                (GPA:{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {cgpa.gradePoints}
                </span>
                )
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={loading || Object.keys(errors).length > 0}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
            >
              {loading ? "Generating..." : "Generate Result"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
