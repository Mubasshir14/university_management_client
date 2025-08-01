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
import Image from "next/image";
import Course from "./Course";
import { getStudentByCourse } from "../Services/Registration";

const FilterByCourse = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<
    string | null
  >(null);

  const [students, setStudents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedCourseId) {
        const res = await getStudentByCourse(selectedCourseId);
        console.log(res.data);
        setStudents(res.data || []);
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
          {students.length === 0 ? (
            <p className="text-center text-gray-500">No students found.</p>
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
                    <TableHead>Semester</TableHead>
                    <TableHead>Image</TableHead>
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
                      <TableCell>{`${student.academicSemester.name} ${student.academicSemester.year}`}</TableCell>
                      <TableCell>
                        {student.image ? (
                          <Image
                            height={40}
                            width={40}
                            src={student.student.image}
                            alt={student.name}
                            className="h-10 w-10 object-cover rounded-full"
                          />
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
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
