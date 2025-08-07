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
import { getApprovedStudent } from "../Services/Student";
import { Eye } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ManageStudent = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getApprovedStudent();
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

  // const downloadStudentList = () => {
  //   try {
  //     const doc = new jsPDF("landscape", "mm", "a4");

  //     // Add Header with Title and Logo/Metadata
  //     doc.setFont("helvetica", "bold");
  //     doc.setFontSize(18);
  //     doc.setTextColor(0, 51, 102); // Dark blue for header
  //     doc.text("Student Signature Sheet", 148.5, 15, { align: "center" });

  //     // --- University Name ---
  //     doc.setFont("times", "bold");
  //     doc.setFontSize(24);
  //     doc.setTextColor(0, 51, 102);
  //     doc.text("State University of Bangladesh", 105, 20, { align: "center" });

  //     // --- University Address ---
  //     doc.setFont("times", "normal");
  //     doc.setFontSize(12);
  //     doc.text(
  //       "State University of Bangladesh Ave, Dhaka, Bangladesh",
  //       105,
  //       28,
  //       { align: "center" }
  //     );

  //     // --- University Logo ---
  //     doc.addImage(
  //       "https://i.ibb.co/MygP1k8Q/university-education-logo-design-template-free-vector.jpg",
  //       "JPEG",
  //       95, // X
  //       30, // Y
  //       20, // width
  //       20 // height
  //     );

  //     // Define table columns
  //     const columns = [
  //       { header: "Sl. No.", dataKey: "slNo" },
  //       { header: "Student ID", dataKey: "id" },
  //       { header: "Full Name", dataKey: "name" },
  //       { header: "Email", dataKey: "email" },
  //       { header: "Contact No", dataKey: "contactNo" },
  //       { header: "Gender", dataKey: "gender" },
  //       { header: "Department", dataKey: "department" },
  //       { header: "Semester", dataKey: "semester" },
  //       { header: "Blood Group", dataKey: "bloodGroup" },
  //     ];

  //     // Prepare table data
  //     const rows = students.map((student, index) => ({
  //       slNo: index + 1,
  //       id: student.id || "N/A",
  //       name: student.name || "N/A",
  //       email: student.email || "N/A",
  //       contactNo: student.contactNo || "N/A",
  //       gender: student.gender
  //         ? student.gender.charAt(0).toUpperCase() + student.gender.slice(1)
  //         : "N/A",
  //       department: student.academicDepartment?.name || "N/A",
  //       semester: student.academicSemester
  //         ? `${student.academicSemester.name} ${student.academicSemester.year}`
  //         : "N/A",
  //       bloodGroup: student.bloodGroup || "N/A",
  //     }));

  //     // Generate Table with enhanced styling
  //     autoTable(doc, {
  //       columns,
  //       body: rows,
  //       startY: 45,
  //       theme: "grid",
  //       styles: {
  //         font: "helvetica",
  //         fontSize: 9,
  //         textColor: [50, 50, 50],
  //         lineColor: [200, 200, 200],
  //         lineWidth: 0.1,
  //         cellPadding: 3,
  //         overflow: "linebreak",
  //       },
  //       headStyles: {
  //         fillColor: [0, 51, 102], // Dark blue header
  //         textColor: [255, 255, 255], // White text
  //         fontSize: 10,
  //         fontStyle: "bold",
  //         halign: "center",
  //         valign: "middle",
  //       },
  //       alternateRowStyles: {
  //         fillColor: [245, 245, 245], // Light gray for alternate rows
  //       },
  //       columnStyles: {
  //         slNo: { cellWidth: 15, halign: "center" },
  //         id: { cellWidth: 25 },
  //         name: { cellWidth: 40 },
  //         email: { cellWidth: 50 },
  //         contactNo: { cellWidth: 30 },
  //         gender: { cellWidth: 20, halign: "center" },
  //         department: { cellWidth: 35 },
  //         semester: { cellWidth: 30 },
  //         bloodGroup: { cellWidth: 20, halign: "center" },
  //       },
  //       margin: { top: 45, left: 14, right: 14 },
  //       didDrawPage: (data) => {
  //         // Add footer with page number
  //         doc.setFontSize(8);
  //         doc.setTextColor(100);
  //         doc.text(
  //           `Page ${data.pageNumber} of ${doc.getNumberOfPages()}`,
  //           148.5,
  //           200,
  //           { align: "center" }
  //         );
  //       },
  //     });

  //     // Add watermark (optional)
  //     doc.setFontSize(40);
  //     doc.setTextColor(230, 230, 230);
  //     doc.text("Confidential", 148.5, 100, {
  //       align: "center",
  //       angle: 45,
  //     });

  //     // Save the PDF with a unique filename
  //     const fileName = `Student_List_${
  //       new Date().toISOString().split("T")[0]
  //     }.pdf`;
  //     doc.save(fileName);

  //     // Show success toast
  //     toast.success("Student list downloaded successfully!");
  //   } catch (error: any) {
  //     console.error("Error generating PDF:", error);
  //     toast.error("Failed to generate PDF. Please try again.");
  //   }
  // };
  const downloadStudentList = () => {
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
      doc.text("Student List", 148.5, 35, { align: "center" });


      const columns = [
        { header: "Sl. No.", dataKey: "slNo" },
        { header: "Student ID", dataKey: "id" },
        { header: "Full Name", dataKey: "name" },
        { header: "Email", dataKey: "email" },
        { header: "Contact No", dataKey: "contactNo" },
        { header: "Gender", dataKey: "gender" },
        { header: "Department", dataKey: "department" },
        { header: "Semester", dataKey: "semester" },
        { header: "Blood Group", dataKey: "bloodGroup" },
      ];

      const rows = students.map((student, index) => ({
        slNo: index + 1,
        id: student.id || "N/A",
        name: student.name || "N/A",
        email: student.email || "N/A",
        contactNo: student.contactNo || "N/A",
        gender: student.gender
          ? student.gender.charAt(0).toUpperCase() + student.gender.slice(1)
          : "N/A",
        department: student.academicDepartment?.name || "N/A",
        semester: student.academicSemester
          ? `${student.academicSemester.name} ${student.academicSemester.year}`
          : "N/A",
        bloodGroup: student.bloodGroup || "N/A",
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

      // --- WATERMARK ---
      // doc.setFont("helvetica", "bold");
      // doc.setFontSize(45);
      // doc.setTextColor(230, 230, 230);
      // doc.text("State University of bangladesh", 148.5, 110, {
      //   align: "center",
      //   angle: 45,
      // });

      const fileName = `Student_List_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(fileName);

      toast.success("Student list downloaded successfully!");
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
                Manage Students
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              </h1>
              <Button
                onClick={downloadStudentList}
                className="my-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700   hover:to-green-500"
              >
                Download Student List
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
                    <TableHead>Semester</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Actions</TableHead>
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
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.contactNo}</TableCell>
                      <TableCell className="capitalize">
                        {student.gender}
                      </TableCell>
                      <TableCell>{student.bloodGroup}</TableCell>
                      <TableCell>{student.academicDepartment.name}</TableCell>
                      <TableCell>{`${student.academicSemester.name} ${student.academicSemester.year}`}</TableCell>
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
                        >
                          <Eye />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ManageStudent;
