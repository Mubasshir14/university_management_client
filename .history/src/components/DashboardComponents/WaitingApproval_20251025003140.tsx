

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
import { getNotApprovedStudent, makeApproval } from "../Services/Student";
import { makeManyApproval } from "../Services/Student"; 
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

const WaitingApproval = () => {
  const router = useRouter();
  const [approving, setApproving] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getNotApprovedStudent();
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

  const paginatedStudents = students.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

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
      router.push('/admin/dashboard/manage-student');
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
      {/* SVG & Motion Background */}
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
              Waiting Approval
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
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.contactNo}</TableCell>
                      <TableCell className="capitalize">
                        {student.gender}
                      </TableCell>
                      <TableCell>{student.bloodGroup}</TableCell>
                      <TableCell>{student.academicDepartment.name}</TableCell>
                      <TableCell>{`${student.academicSession.name} ${student.academicSession.year}`}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>
                        {student.image ? (
                          <motion.img
                            src={student.image}
                            alt={student.name}
                            className="h-16 w-16 object-cover rounded-lg border-2 border-gray-200/20"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          className="bg-white/5 border-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-blue-600/30 hover:text-blue-400"
                          onClick={async () => {
                            try {
                              const res = await makeApproval(student._id);
                              if (res.success) {
                                toast.success("Student approved successfully!");
                                router.push("/admin/dashboard/manage-student");
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
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
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
                disabled={selectedIds.length === 0}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Approve All Selected
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitingApproval;
