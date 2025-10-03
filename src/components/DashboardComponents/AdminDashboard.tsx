/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  dashboradDepBasedStudent,
  dashboradSemBasedStudent,
  getAAllStudent,
  getApprovedStudent,
  getNotApprovedStudent,
} from "../Services/Student";
import { getAllDepartment } from "../Services/Department";
import { getAllSemester } from "../Services/Semester";
import { getAllCourse } from "../Services/Course";
import { getAllFaculty } from "../Services/Faculty";
import {
  getApprovedRegisteredStudent,
  getNotApprovedRegisteredStudent,
} from "../Services/Registration";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const AdminDashboard: React.FC = () => {
  const [courseData, setCourseData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [departmentData, setDepartmentData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [facultyData, setFacultyData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [semesterData, setSemesterData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [allStudentData, setAllStudentData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [studentByDeptData, setStudentByDeptData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [studentBySemData, setStudentBySemData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [studentApprovalData, setStudentApprovalData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [registrationApprovalData, setRegistrationApprovalData] =
    useState<ChartData>({
      labels: [],
      datasets: [],
    });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "" },
    },
  };

  const fetchData = async () => {
    const { data: courses } = await getAllCourse();
    setCourseData({
      labels: courses.map((course: any) => course.shortName),
      datasets: [
        {
          label: "Courses",
          data: courses.map((course: any) => course.credits),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });

    const { data: departments } = await getAllDepartment();
    setDepartmentData({
      labels: departments.map((dept: any) => dept.shortName),
      datasets: [
        {
          label: "Departments",
          data: departments.map((dept: any) => dept.faculty.length),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });

    const { data: faculty } = await getAllFaculty();
    setFacultyData({
      labels: faculty.map((fac: any) => fac.name),
      datasets: [
        {
          label: "Faculty",
          data: faculty.map(() => 1),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });

    const { data: semesters } = await getAllSemester();
    setSemesterData({
      labels: semesters.map((sem: any) => `${sem.name} ${sem.year}`),
      datasets: [
        {
          label: "Session",
          data: semesters.map(() => 1),
          backgroundColor: "rgba(255, 206, 86, 0.5)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ],
    });

    const { data: allStudents } = await getAAllStudent();
    const maleCount = allStudents.filter(
      (s:any) => s.gender?.toLowerCase() === "male"
    ).length;
    const femaleCount = allStudents.filter(
      (s:any) => s.gender?.toLowerCase() === "female"
    ).length;

    setAllStudentData({
      labels: ["All Students"],
      datasets: [
        {
          label: "Total Students",
          data: [allStudents.length],
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
                {
          label: "Male",
          data: [maleCount],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Female",
          data: [femaleCount],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });

    const { data: studentsByDept } = await dashboradDepBasedStudent();
    setStudentByDeptData({
      labels: studentsByDept.map((dept: any) => dept.shortName),
      datasets: [
        {
          label: "Students by Department",
          data: studentsByDept.map((dept: any) => dept.totalStudents),
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    });

    const { data: studentsBySem } = await dashboradSemBasedStudent();
    setStudentBySemData({
      labels: studentsBySem.map(
        (sem: any) => `${sem.semesterName}-${sem.year}`
      ),
      datasets: [
        {
          label: "Students by Session",
          data: studentsBySem.map((sem: any) => sem.totalStudents),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });

    const { data: notApproved } = await getNotApprovedStudent();
    const { data: approved } = await getApprovedStudent();
    setStudentApprovalData({
      labels: ["Student Approval Status"],
      datasets: [
        {
          label: "Approved Students",
          data: [approved.length],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Not Approved Students",
          data: [notApproved.length],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });

    const { data: notApprovedRegistered } =
      await getNotApprovedRegisteredStudent();
    const { data: approvedRegistered } = await getApprovedRegisteredStudent();
    setRegistrationApprovalData({
      labels: ["Registration Approval Status"],
      datasets: [
        {
          label: "Not Approved",
          data: [notApprovedRegistered.length],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Approved ",
          data: [approvedRegistered.length],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 font-sansita">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 font-sansita">Courses</h2>
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Course Credits",
                },
              },
            }}
            data={courseData}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 font-sansita">
            Departments
          </h2>
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Faculty per Department",
                },
              },
            }}
            data={departmentData}
          />
        </div>
        {/* Have to worl later */}
        {/* <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 font-sansita">Faculty</h2>
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: { ...chartOptions.plugins.title, text: "Faculty Count" },
              },
            }}
            data={facultyData}
          />
        </div> */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 font-sansita">Semesters</h2>
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Semester Count",
                },
              },
            }}
            data={semesterData}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 font-sansita">
            All Students
          </h2>
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Total Students",
                },
              },
            }}
            data={allStudentData}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 font-sansita">
            Students by Department
          </h2>
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Students by Department",
                },
              },
            }}
            data={studentByDeptData}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 font-sansita">
            Students by Session
          </h2>
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Students by Session",
                },
              },
            }}
            data={studentBySemData}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 font-sansita">
            Student Approval Status
          </h2>
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Approved vs Not Approved Students",
                },
              },
            }}
            data={studentApprovalData}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 font-sansita">
            Registration Status
          </h2>
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Approved Registratin vs Not Approved Registration",
                },
              },
            }}
            data={registrationApprovalData}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
