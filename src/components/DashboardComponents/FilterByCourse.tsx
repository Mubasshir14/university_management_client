"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Course from "./Course";
import { getStudentByCourse } from "../Services/Registration";

const FilterByCourse = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [students, setStudents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedCourseId) {
        setIsLoading(true);
        try {
          const res = await getStudentByCourse(selectedCourseId);
          setStudents(res.data || []);
        } catch (error) {
          console.error("Error fetching students:", error);
          setStudents([]);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchStudents();
  }, [selectedCourseId]);

  const paginatedStudents = students.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(students.length / itemsPerPage);
  return (
    <section className="py-10 font-sansita">
      <Course onSelect={setSelectedCourseId} />

      {selectedCourseId && (
        <div className="mt-10 px-4">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-96 bg-gradient-to-b from-blue-50/50 to-purple-50/50 rounded-xl p-8 backdrop-blur-sm border border-gray-200/20"
            >
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-ping"></div>
              </motion.div>
              <p className="mt-4 text-lg font-medium text-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Loading students...
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Fetching data for the selected course
              </p>
            </motion.div>
          ) : students.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg">No students found.</p>
            </motion.div>
          ) : (
            <>
              <Table>
                <TableHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Dept</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Semester</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {paginatedStudents.map((student, index) => (
                    <motion.tr
                      key={student._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TableCell>{student.student.id}</TableCell>
                      <TableCell>{student.student.name}</TableCell>
                      <TableCell>{student.student.email}</TableCell>
                      <TableCell>{student.student.contactNo}</TableCell>
                      <TableCell className="capitalize">
                        {student.student.gender}
                      </TableCell>
                      <TableCell>{student.academicDepartment.name}</TableCell>
                      <TableCell>{`${student.academicSession.name} ${student.academicSession.year}`}</TableCell>
                      <TableCell>{student.student.year}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between mt-4">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Page {page} of {totalPages}
                </span>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default FilterByCourse;
