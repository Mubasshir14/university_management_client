/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { getAllFaculty } from "../Services/Faculty";
import { getAllSemester } from "../Services/Semester";
import { updateCourse } from "../Services/Course";

interface Faculty {
  _id: string;
  name: string;
  academicDepartment: {
    name: string;
    shortName: string;
  };
}

interface AcademicSemester {
  _id: string;
  name: string;
  startMonth: string;
  endMonth: string;
  year: string;
}

interface UpdateCourseProps {
  course: {
    _id: string;
    name: string;
    shortName: string;
    courseCode: string;
    credits: number;
    faculty: string[];
    offered_in: string[];
  };
}

export default function UpdateCourse({ course }: UpdateCourseProps) {
  const router = useRouter();
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [semesters, setSemesters] = useState<AcademicSemester[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      name: course?.name || "",
      shortName: course?.shortName || "",
      courseCode: course?.courseCode || "",
      credits: course?.credits || "",
      faculty: course?.faculty || [],
      offered_in: course?.offered_in || [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [facultyRes, semesterRes] = await Promise.all([
          getAllFaculty(),
          getAllSemester(),
        ]);
        if (facultyRes.success) {
          setFaculties(facultyRes.data);
        } else {
          toast.error(facultyRes.message || "Failed to fetch faculties");
        }
        if (semesterRes.success) {
          setSemesters(semesterRes.data);
        } else {
          toast.error(semesterRes.message || "Failed to fetch semesters");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "updating";
    const formattedData = {
      ...data,
      credits: Number(data.credits),
    };

    try {
      const res = await updateCourse(course._id, formattedData);
      if (res.success) {
        toast.success(res.message || "Course updated successfully", {
          id: toastId,
        });
        router.push("/admin/dashboard/manage-course");
      } else {
        toast.error(res.message || "Failed to update course", { id: toastId });
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message || "Failed to update course. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <section className="py-10 bg-gradient-to-b from-blue-600/10 to-purple-600/10 relative font-sansita">
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 100C200 50, 400 150, 600 100S800 50, 1000 100s400 150, 600 100V600H0Z"
            fill="url(#wave)"
          />
          <motion.circle
            cx="10%"
            cy="20%"
            r="50"
            fill="url(#node1)"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="90%"
            cy="80%"
            r="70"
            fill="url(#node2)"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <defs>
            <linearGradient id="wave" x1="0" y1="0" x2="0" y2="600">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
            </linearGradient>
            <radialGradient id="node1" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="node2" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
        >
          <div className="border-2 border-gray-200/20 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow duration-300">
            <h1 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 relative">
              Update Course
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            </h1>
            {loading ? (
              <div className="text-center text-gray-200">Loading...</div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                            Course Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Introduction to Programming"
                              className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                    {/* Short Name */}
                    <FormField
                      control={form.control}
                      name="shortName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                            Short Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Intro to Prog"
                              className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                    {/* Course Code */}
                    <FormField
                      control={form.control}
                      name="courseCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                            Course Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., CSE101"
                              className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                    {/* Credits */}
                    <FormField
                      control={form.control}
                      name="credits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                            Credits
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 3"
                              className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Faculty */}
                    <FormField
                      control={form.control}
                      name="faculty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            Faculty
                          </FormLabel>
                          <FormControl>
                            <Select
                              isMulti
                              options={faculties.map((fac) => ({
                                value: fac._id,
                                label: `${fac.name}, ${fac.academicDepartment?.shortName}`,
                                title:
                                  fac.academicDepartment?.shortName ||
                                  "No department",
                              }))}
                              className="react-select-container text-blue-500"
                              classNamePrefix="react-select"
                              onChange={(selected) =>
                                field.onChange(selected.map((s) => s.value))
                              }
                              value={faculties
                                .filter((fac) => field.value.includes(fac._id))
                                .map((fac) => ({
                                  value: fac._id,
                                  label: `${fac.name}, ${fac.academicDepartment?.shortName}`,
                                  title:
                                    fac.academicDepartment?.shortName ||
                                    "No department",
                                }))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Offered In */}
                    <FormField
                      control={form.control}
                      name="offered_in"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            Offered In
                          </FormLabel>
                          <FormControl>
                            <Select
                              isMulti
                              options={semesters.map((sem) => ({
                                value: sem._id,
                                label: `${sem.name} ${sem.year}`,
                                title: `${sem.startMonth} - ${sem.endMonth} ${sem.year}`,
                              }))}
                              className="bg-white/5 text-blue-500 rounded"
                              classNamePrefix="react-select"
                              onChange={(selected) =>
                                field.onChange(selected.map((s) => s.value))
                              }
                              value={semesters
                                .filter((sem) => field.value.includes(sem._id))
                                .map((sem) => ({
                                  value: sem._id,
                                  label: `${sem.name} ${sem.year}`,
                                  title: `${sem.startMonth} - ${sem.endMonth} ${sem.year}`,
                                }))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <Button
                      asChild
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg animate-pulse-slow"
                      disabled={isSubmitting || loading}
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {isSubmitting ? "Updating Course..." : "Update Course"}
                      </motion.button>
                    </Button>
                  </motion.div>
                </form>
              </Form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
