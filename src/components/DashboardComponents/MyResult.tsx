/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getMeAsStudentData } from "../Services/Student";
import { getMyResult } from "../Services/result";
import { toast } from "sonner";
import {
  Loader2,
  User,
  Book,
  Building,
  Download,
  CheckCircle,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyResult = () => {
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultInfo = async () => {
      try {
        setLoading(true);
        const studentRes = await getMeAsStudentData();
        if (!studentRes.success) {
          toast.error(studentRes.message || "Failed to get student data");
          return;
        }

        const studentId = studentRes.data._id;
        const resultRes = await getMyResult(studentId);

        if (resultRes?.success === false) {
          toast.error(resultRes.message || "Result not found");
          return;
        }
        console.log(resultRes.data);
        setResult(resultRes.data);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchResultInfo();
  }, []);

  const loadImageAsBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/jpeg"));
        } else {
          reject(new Error("Failed to get canvas context"));
        }
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    });
  };

  const downloadPDF = async () => {
    try {
      if (!result || !result.student || !result.coursesMarks) {
        toast.error("Incomplete result data. Cannot generate PDF.");
        return;
      }

      const doc = new jsPDF();
      autoTable(doc, {});

      const logoUrl =
        "/public/university-education-logo-design-template-free-vector.jpg";
      let logoBase64;
      try {
        logoBase64 = await loadImageAsBase64(logoUrl);

        doc.setGState(doc.GState({ opacity: 0.4 }));
        doc.addImage(logoBase64, "JPEG", 50, 50, 100, 100);
        doc.setGState(doc.GState({ opacity: 1 }));
        doc.addImage(logoBase64, "JPEG", 85, 10, 40, 12);
      } catch (error) {
        console.warn("Failed to load logo, skipping image:", error);
      }

      // Set elegant fonts
      doc.setFont("times", "bold");
      doc.setFontSize(22);
      doc.setTextColor(0, 51, 102); // Dark blue for header
      doc.text("Academic Transcript", 105, 35, { align: "center" });

      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("XYZ University", 105, 45, { align: "center" });
      doc.text("123 University Ave, City, Country", 105, 51, {
        align: "center",
      });

      // Decorative line under header
      doc.setDrawColor(0, 51, 102);
      doc.setLineWidth(0.5);
      doc.line(20, 55, 190, 55);

      // Student Information
      doc.setFont("times", "bold");
      doc.setFontSize(14);
      doc.text("Student Information", 20, 65);
      doc.setFont("times", "normal");
      doc.setFontSize(10);
      doc.text(
        `Name: ${result.student.firstName} ${result.student.lastName}`,
        20,
        75
      );
      doc.text(`Student ID: ${result.student_id || result.student.id}`, 20, 81);
      doc.text(
        `Department: ${result.registration.academicDepartment?.name || "N/A"}`,
        20,
        87
      );
      doc.text(
        `Semester: ${result.registration.academicSemester?.name || "N/A"} - ${
          result.registration.academicSemester?.year || "N/A"
        }`,
        20,
        93
      );

      // Course Marks Table
      autoTable(doc, {
        startY: 100,
        head: [["Course Code", "Course Name", "Credits", "Marks", "Grade"]],
        body: result.coursesMarks.map((course: any) => [
          course.courseId?.courseCode || "N/A",
          course.courseId?.name || "N/A",
          course.courseId?.credits || 0,
          course.total || 0,
          course.total >= 0 && course.total <= 19
            ? "F"
            : course.total >= 20 && course.total <= 39
            ? "D"
            : course.total >= 40 && course.total <= 59
            ? "C"
            : course.total >= 60 && course.total <= 79
            ? "B"
            : course.total >= 80 && course.total <= 100
            ? "A"
            : "N/A",
        ]),
        theme: "grid",
        styles: { font: "times", fontSize: 10, cellPadding: 3 },
        headStyles: {
          fillColor: [0, 51, 102],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        bodyStyles: { textColor: [0, 0, 0] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { left: 20, right: 20 },
      });

      // Summary
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.setFont("times", "bold");
      doc.setFontSize(12);
      doc.text("Summary", 20, finalY);
      doc.setFont("times", "normal");
      doc.setFontSize(10);
      doc.text(
        `Average Marks: ${result.averageMarks || "N/A"}`,
        20,
        finalY + 8
      );
      doc.text(`Average Grade: ${result.avgGrade || "N/A"}`, 20, finalY + 14);
      doc.text(
        `Average Grade Points: ${result.avgGradePoints || "N/A"}`,
        20,
        finalY + 20
      );

      // Footer
      doc.setFont("times", "italic");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 280);
      doc.text("XYZ University - Official Transcript", 105, 280, {
        align: "center",
      });

      // Save the PDF
      doc.save(`Transcript_${result.student_id || result.student.id}.pdf`);
    } catch (error: any) {
      toast.error("Failed to generate PDF: " + error.message);
      console.error("PDF generation error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading result info...</span>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center text-red-500 mt-6 p-4 bg-red-100 rounded-lg">
        YOU HAVE NO RESULT YET!
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto mt-10 p-8 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 font-sansita">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center gap-2">
          <Book className="h-8 w-8" /> Academic Transcript
        </h2>
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-5 w-5" /> Download PDF
        </button>
      </div>

      <div className="grid gap-6">
        {/* Student Info */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Student Details
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Name:
              </span>{" "}
              {result.student.firstName} {result.student.lastName}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Student ID:
              </span>{" "}
              {result.student.id}
            </p>
          </div>
        </div>

        {/* Academic Info */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Building className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Academic Details
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Department:
              </span>{" "}
              {result.registration.academicDepartment?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Semester:
              </span>{" "}
              {`${result.registration.academicSemester?.name || "N/A"} -
              ${result.registration.academicSemester?.year || "N/A"}`}
            </p>
          </div>
        </div>

        {/* Courses Marks Table */}
        <div className="p-6 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Book className="h-6 w-6 text-pink-600" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Course Results
            </h3>
          </div>
          {result.coursesMarks?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-blue-100 dark:bg-gray-700">
                    <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                      Course Code
                    </th>
                    <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                      Course Name
                    </th>
                    <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                      Credits
                    </th>
                    <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                      Mid1
                    </th>
                    <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                      Mid2
                    </th>
                    <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                      Final
                    </th>
                    <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                      Marks
                    </th>
                    <th className="p-3 font-semibold text-gray-800 dark:text-gray-100">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.coursesMarks.map((course: any, idx: number) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 dark:border-gray-600 hover:bg-white/50 dark:hover:bg-gray-900/50 transition-colors"
                    >
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {course.courseId.courseCode}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {course.courseId.name}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {course.courseId.credits}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {course.midTerm1}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {course.midTerm2}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {course.finalTerm}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {course.total}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {course.total >= 0 && course.total <= 19
                          ? "F"
                          : course.total >= 20 && course.total <= 39
                          ? "D"
                          : course.total >= 40 && course.total <= 59
                          ? "C"
                          : course.total >= 60 && course.total <= 79
                          ? "B"
                          : course.total >= 80 && course.total <= 100
                          ? "A"
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No courses registered.
            </p>
          )}
        </div>

        {/* Summary */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Summary
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Average Marks:
              </span>{" "}
              {result.averageMarks}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Average Grade:
              </span>{" "}
              {result.avgGrade}
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Grade Points:
              </span>{" "}
              {result.avgGradePoints}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyResult;
