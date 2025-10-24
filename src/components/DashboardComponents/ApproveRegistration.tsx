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
import { getApprovedRegisteredStudent } from "../Services/Registration";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ApproveRegistration = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getApprovedRegisteredStudent();
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

  const downloadRegistrationList = () => {
    try {
      const doc = new jsPDF("landscape", "mm", "a4");

      doc.addImage(
        "https://i.ibb.co/MygP1k8Q/university-education-logo-design-template-free-vector.jpg",
        "JPEG",
        15,
        8,
        25,
        25
      );

      doc.setFont("times", "bold");
      doc.setFontSize(22);
      doc.setTextColor(0, 51, 102);
      doc.text("State University of Bangladesh", 148.5, 18, {
        align: "center",
      });

      doc.setFont("times", "italic");
      doc.setFontSize(11);
      doc.setTextColor(80);
      doc.text(
        "State University of Bangladesh Ave, Dhaka, Bangladesh",
        148.5,
        25,
        { align: "center" }
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 51, 102);
      doc.text("Registration List", 148.5, 35, { align: "center" });

      const columns = [
        { header: "Sl. No.", dataKey: "slNo" },
        { header: "Student ID", dataKey: "id" },
        { header: "Full Name", dataKey: "name" },
        // { header: "Email", dataKey: "email" },
        { header: "Contact No", dataKey: "contactNo" },
        { header: "Gender", dataKey: "gender" },
        { header: "Department", dataKey: "department" },
        { header: "Session", dataKey: "session" },
        { header: "Semester", dataKey: "year" },
        // { header: "Blood Group", dataKey: "bloodGroup" },
      ];

      const rows = students.map((student, index) => ({
        slNo: index + 1,
        id: student?.student?.id || "N/A",
        name: student?.student?.name || "N/A",
        email: student?.student?.email || "N/A",
        contactNo: student?.student?.contactNo || "N/A",
        gender: student?.student?.gender
          ? student.student.gender.charAt(0).toUpperCase() +
            student.student.gender.slice(1)
          : "N/A",
        department: student?.academicDepartment?.name || "N/A",
        session: student?.academicSession
          ? `${student.academicSession.name} ${student.academicSession.year}`
          : "N/A",
        year: student.student.year,
        bloodGroup: student?.student?.bloodGroup || "N/A",
      }));

      autoTable(doc, {
        columns,
        body: rows,
        startY: 42,
        theme: "grid",
        styles: {
          font: "helvetica",
          fontSize: 9,
          textColor: [0, 51, 102],
          lineColor: [0, 51, 102],
          lineWidth: 0.1,
          cellPadding: 3,
          overflow: "linebreak",
        },
        headStyles: {
          fillColor: [0, 51, 102],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: "bold",
          halign: "center",
          valign: "middle",
        },
        alternateRowStyles: {
          fillColor: [245, 250, 255],
        },
        columnStyles: {
          slNo: { cellWidth: 15, halign: "center" },
          id: { cellWidth: 25 },
          name: { cellWidth: 40 },
          email: { cellWidth: 50 },
          contactNo: { cellWidth: 30 },
          gender: { cellWidth: 20, halign: "center" },
          department: { cellWidth: 35 },
          semester: { cellWidth: 30 },
          bloodGroup: { cellWidth: 20, halign: "center" },
        },
        margin: { top: 40, left: 14, right: 14 },
        didDrawPage: (data) => {
          doc.setFontSize(8);
          doc.setTextColor(120);
          doc.text(
            `Page ${data.pageNumber} of ${doc.getNumberOfPages()}`,
            148.5,
            200,
            { align: "center" }
          );
        },
      });

      const fileName = `Registration_List_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(fileName);

      toast.success("Registration list downloaded successfully!");
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
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
            <div className="flex md:flex-row flex-col  items-center justify-between">
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 relative">
                Manage Course Registrations
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              </h1>
              <Button
                onClick={downloadRegistrationList}
                className="my-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700   hover:to-green-500"
              >
                Download Registration List
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
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
                    <TableHead>Total Credit</TableHead>
                    {/* <TableHead>Actions</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents.map((student, index) => (
                    <motion.tr
                      key={student._id["$oid"]}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-blue-600/30 transition-colors duration-200 border-b border-gray-600/50"
                    >
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
                      <TableCell>{student.student.year}</TableCell>{" "}
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
                      {/* <TableCell>
                        <div
                          
                          className=" text-purple-600  hover:text-purple-700 hover:scale-105 transition-all transform "
                        >
                          <Eye />
                        </div>
                      </TableCell> */}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApproveRegistration;
