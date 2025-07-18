/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { getAllCourse } from "../Services/Course";

interface Course {
  _id: string;
  name: string;
  shortName: string;
  courseCode: string;
  credits: number;
  faculty: { _id: string; name: string }[] | null;
  offered_in:
    | {
        _id: string;
        name: string;
        startMonth: string;
        endMonth: string;
        year: string;
      }[]
    | null;
}

export default function ManageCourse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof Course>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await getAllCourse();
        if (res.success && Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          setCourses([]);
          toast.error(res.message || "Failed to fetch courses");
        }
      } catch (err: any) {
        setCourses([]);
        toast.error(err.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSort = (column: keyof Course) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  const sortedCourses = [...courses].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    const aStr = typeof aValue === "string" ? aValue : JSON.stringify(aValue);
    const bStr = typeof bValue === "string" ? bValue : JSON.stringify(bValue);

    if (aStr < bStr) return sortOrder === "asc" ? -1 : 1;
    if (aStr > bStr) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedCourses = sortedCourses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(courses.length / itemsPerPage);

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
                Manage Courses
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                {/* <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-600 to-teal-600 rounded-full" /> */}
              </h1>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg animate-pulse-slow"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link href="/admin/dashboard/add-course">Add Course</Link>
                </motion.div>
              </Button>
            </div>
            {loading ? (
              <div className="text-center text-gray-200">Loading...</div>
            ) : courses.length === 0 ? (
              <div className="text-center text-gray-200">No courses found.</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("name")}
                        >
                          Name{" "}
                          {sortBy === "name" &&
                            (sortOrder === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("shortName")}
                        >
                          Short Name{" "}
                          {sortBy === "shortName" &&
                            (sortOrder === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("courseCode")}
                        >
                          Course Code{" "}
                          {sortBy === "courseCode" &&
                            (sortOrder === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer "
                          onClick={() => handleSort("credits")}
                        >
                          Credits{" "}
                          {sortBy === "credits" &&
                            (sortOrder === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead className="">Faculty</TableHead>
                        <TableHead className="">
                          Offered In
                        </TableHead>
                        <TableHead className="">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedCourses.map((course, index) => (
                        <motion.tr
                          key={course._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-blue-600/30 transition-colors duration-200 border-b border-gray-600/50"
                        >
                          <TableCell>{course.name || "N/A"}</TableCell>
                          <TableCell>{course.shortName || "N/A"}</TableCell>
                          <TableCell>{course.courseCode || "N/A"}</TableCell>
                          <TableCell>{course.credits ?? "N/A"}</TableCell>
                          {/* <TableCell className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            {course.faculty && Array.isArray(course.faculty)
                              ? course.faculty.map((fac) => fac.name).join(", ") || "N/A"
                              : "N/A"}
                          </TableCell>
                          <TableCell className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            {course.offered_in && Array.isArray(course.offered_in)
                              ? course.offered_in.map((sem) => `${sem.name} ${sem.year}`).join(", ") || "N/A"
                              : "N/A"}
                          </TableCell> */}
                          <TableCell className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            {course.faculty &&
                            Array.isArray(course.faculty) &&
                            course.faculty.length > 0 ? (
                              <>
                                {course.faculty
                                  .slice(0, 3)
                                  .map((fac) => fac.name)
                                  .join(", ")}
                                {course.faculty.length > 3 ? "..." : ""}
                              </>
                            ) : (
                              "N/A"
                            )}
                          </TableCell>

                          <TableCell className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            {course.offered_in &&
                            Array.isArray(course.offered_in) &&
                            course.offered_in.length > 0 ? (
                              <>
                                {course.offered_in
                                  .slice(0, 3)
                                  .map((sem) => `${sem.name} ${sem.year}`)
                                  .join(", ")}
                                {course.offered_in.length > 3 ? "..." : ""}
                              </>
                            ) : (
                              "N/A"
                            )}
                          </TableCell>

                          <TableCell className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/20"
                              onClick={() =>
                                toast.info("Edit functionality coming soon!")
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-600/20"
                              onClick={() =>
                                toast.info("Delete functionality coming soon!")
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-white/5 border-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-blue-600/30 hover:text-blue-400"
                  >
                    Previous
                  </Button>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="bg-white/5 border-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-blue-600/30 hover:text-blue-400"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
