/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "../ui/label";
import { getMeAsStudentData } from "../Services/Student";

const MyInformation = () => {
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMeAsStudentData();
        if (data.data) {
          setStudentData(data.data);
          console.log(studentData);
        }
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-200">Loading...</div>;
  }

  if (!studentData) {
    return <div className="text-center text-gray-200">No data available</div>;
  }

  return (
    <section className="py-10 pt-32 bg-gradient-to-b from-blue-600/10 to-purple-600/10 relative font-sansita">
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
              My Student Information
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            </h1>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <div className="flex justify-center">
                <Image
                  src={studentData.image}
                  alt={`${studentData.firstName} ${studentData.lastName}`}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-lg border-2 border-blue-600/50"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                  Student ID:
                </Label>
                <div className="bg-white/5 border-gray-600 rounded-lg p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {studentData.id}
                </div>
              </div>
              <div>
                <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                  Full Name:
                </Label>
                <div className="bg-white/5 border-gray-600 rounded-lg p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {studentData.name}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                  Email:
                </Label>
                <div className="bg-white/5 border-gray-600 rounded-lg p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {studentData.email}
                </div>
              </div>
              <div>
                <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                  Contact No:
                </Label>
                <div className="bg-white/5 border-gray-600 rounded-lg p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {studentData.contactNo}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                  Gender:
                </Label>
                <div className="bg-white/5 border-gray-600 rounded-lg p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 capitalize">
                  {studentData.gender}
                </div>
              </div>
              <div>
                <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                  Blood Group:
                </Label>
                <div className="bg-white/5 border-gray-600 rounded-lg p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {studentData.bloodGroup}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                  Department:
                </Label>
                <div className="bg-white/5 border-gray-600 rounded-lg p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  {studentData.academicDepartment.name}
                </div>
              </div>
              <div>
                <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                  Semester:
                </Label>
                <div className="bg-white/5 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-gray-600 rounded-lg p-2 ">
                  {`${studentData.academicSemester.name} ${studentData.academicSemester.year}`}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-6"
            >
              <Button
                type="button"
                className="w-full text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg animate-pulse-slow"
                disabled={!studentData.isApproved}
                title={
                  !studentData.isApproved
                    ? "You have not been approved as a student"
                    : ""
                }
                onClick={() =>
                  (window.location.href = "/student/dashboard/registration")
                }
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Make Registration
                </motion.button>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyInformation;
