"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import {
  getNotApprovedRegisteredStudent,
  makeRegistrationApproval,
} from "../Services/Registration";
import Link from "next/link";
import { Input } from "../ui/input";

const PendingRegistration = () => {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getNotApprovedRegisteredStudent();
        if (data.data) {
          setStudents(data.data);
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

  const handleApproveAll = async () => {
    if (selectedIds.length === 0) {
      toast.error("Select at least one student to approve!");
      return;
    }

    try {
      setApproving(true);
      const res = await makeManyApproval({ ids: selectedIds });
      if (res.success) {
        toast.success("Selected students approved successfully!");
        router.push("/admin/dashboard/manage-student");
        setSelectedIds([]);
      } else {
        toast.error(res.message || "Approval failed.");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setApproving(false);
    }
  };

  const paginatedStudents = students.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(students.length / itemsPerPage);

  if (loading) {
    return <div className="text-center text-gray-200">Loading...</div>;
  }

  if (students.length === 0) {
    return (
      <div className="text-center text-gray-200">
        No students awaiting approval.
      </div>
    );
  }

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
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
          <div className="border-2 border-gray-200/20 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow duration-300">
            <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 relative">
              Pending Course Registration
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            </h1>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
                    <TableHead>Select</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact No</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Total Credits</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents.map((student, index) => (
                    <motion.tr
                      key={student._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-blue-600/30 transition-colors duration-200 border-b border-gray-600/50"
                    >
                      <TableCell>
                        <Input
                          type="checkbox"
                          checked={selectedIds.includes(student._id)}
                          onChange={() => toggleSelect(student._id)}
                        />
                      </TableCell>
                      <TableCell>{student.student.id}</TableCell>
                      <TableCell>{student.student.name}</TableCell>
                      <TableCell>{student.student.email}</TableCell>
                      <TableCell>{student.student.contactNo}</TableCell>
                      <TableCell className="capitalize">
                        {student.student.gender}
                      </TableCell>
                      <TableCell>{student.student.bloodGroup}</TableCell>
                      <TableCell>{student.academicDepartment.name}</TableCell>
                      <TableCell>{`${student.academicSession.name} ${student.academicSession.year}`}</TableCell>
                      <TableCell>{student.student.year}</TableCell>
                      <TableCell>
                        {student.student.image ? (
                          <motion.img
                            src={student.student.image}
                            alt={student.name}
                            className="h-16 w-16 object-cover rounded-lg border-2 border-gray-200/20"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </TableCell>
                      <TableCell>{student.totalCredit}</TableCell>
                      <TableCell className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          className="bg-white/5 border-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-blue-600/30 hover:text-blue-400"
                          onClick={async () => {
                            try {
                              const res = await makeRegistrationApproval(
                                student._id
                              );
                              if (res.success) {
                                toast.success(
                                  "Registration approved successfully!"
                                );
                                router.push(
                                  "/admin/dashboard/approve-registration"
                                );
                              } else {
                                toast.error(res.message || "Approval failed.");
                              }
                            } catch (error: any) {
                              toast.error(
                                "Something went wrong: " + error.message
                              );
                            }
                          }}
                        >
                          Approve
                        </Button>
                        <Link
                          href={`/admin/dashboard/course-drop-individual-registration/${student._id}`}
                        >
                          <Button
                            variant="outline"
                            className="bg-white/5 border-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-blue-600/30 hover:text-blue-400"
                          >
                            View
                          </Button>
                        </Link>
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
            <div className="mt-6 text-right">
              <Button
                variant="default"
                onClick={handleApproveAll}
                disabled={selectedIds.length === 0 || approving}
                className={`bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2`}
              >
                {approving && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                )}
                {approving ? "Processing..." : "Approve All Selected"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PendingRegistration;
