"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { getAllDepartment } from "../Services/Department";

import { BloodGroup, Gender } from "../Types/student";
import { updateImformationByAdmin } from "../Services/Student";
import { useRouter } from "next/navigation";
import { getAllsession } from "../Services/Session";

interface Department {
  _id: string;
  name: string;
  shortName?: string;
  image?: string;
  faculty?: { $id: string }[];
}

interface AcademicSesion {
  _id: string;
  name: string;
  year: string;
  startMonth?: string;
  endMonth?: string;
}

const UpdateStudent = ({ student }: { student: any }) => {
  const studentData = student.student || student;
  const [departments, setDepartments] = useState<Department[]>([]);
  const [sessions, setSessions] = useState<AcademicSesion[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: studentData.firstName || "",
    lastName: studentData.lastName || "",
    contactNo: studentData.contactNo || "",
    bloodGroup: studentData.bloodGroup || "",
    gender: studentData.gender || "",
    academicDepartment: studentData.academicDepartment?._id || "",
    academicSession: studentData.academicSession?._id || "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [deptRes, semRes] = await Promise.all([
          getAllDepartment(),
          getAllsession(),
        ]);
        if (deptRes.success) {
          setDepartments(deptRes.data);
        } else {
          toast.error(deptRes.message || "Failed to fetch departments");
        }
        if (semRes.success) {
          setSessions(semRes.data);
        } else {
          toast.error(semRes.message || "Failed to fetch sessions");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const submitData = {
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactNo: formData.contactNo,
      bloodGroup: formData.bloodGroup,
      gender: formData.gender,
      academicDepartment: formData.academicDepartment,
      academicSession: formData.academicSession,
    };

    const toastId = "updating";
    try {
      const res = await updateImformationByAdmin(studentData._id, submitData);
      if (res.success) {
        toast.success(res.message || "Student updated successfully", {
          id: toastId,
        });
        router.push("/admin/dashboard/manage-student");
      } else {
        toast.error(res.message || "Failed to update student", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update student", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Current Data Section */}
      <div>
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
                  Current Student Information
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
                      {studentData?.name}
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
                      {studentData.academicDepartment?.name || "N/A"}
                    </div>
                  </div>
                  <div>
                    <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                      Session:
                    </Label>
                    <div className="bg-white/5 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-gray-600 rounded-lg p-2">
                      {`${studentData.academicSession?.name || "N/A"} ${
                        studentData.academicSession?.year || ""
                      }`}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Update Student Section */}
      <div>
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
                  Update Student Information
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                </h1>
                {loading ? (
                  <div className="text-center text-gray-200">Loading...</div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                      <div>
                        <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          First Name
                        </Label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                          placeholder="e.g., John"
                        />
                      </div>
                      <div>
                        <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Last Name
                        </Label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                          placeholder="e.g., Doe"
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                        Contact Number
                      </Label>
                      <Input
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                        placeholder="e.g., +1234567890"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                    >
                      <div>
                        <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Blood Group
                        </Label>
                        <Select
                          onValueChange={(val) =>
                            handleSelectChange("bloodGroup", val)
                          }
                          value={formData.bloodGroup}
                        >
                          <SelectTrigger className="bg-white/5 border-gray-600 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            <SelectValue placeholder="Select Blood Group" />
                          </SelectTrigger>
                          <SelectContent>
                            {BloodGroup.map((bg) => (
                              <SelectItem key={bg} value={bg}>
                                {bg}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Gender
                        </Label>
                        <Select
                          onValueChange={(val) =>
                            handleSelectChange("gender", val)
                          }
                          value={formData.gender}
                        >
                          <SelectTrigger className="bg-white/5 border-gray-600 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {Gender.map((g) => (
                              <SelectItem key={g} value={g}>
                                {g.charAt(0).toUpperCase() + g.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Academic Session
                        </Label>
                        <Select
                          onValueChange={(val) =>
                            handleSelectChange("academicSession", val)
                          }
                          value={formData.academicSession}
                        >
                          <SelectTrigger className="bg-white/5 border-gray-600 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            <SelectValue placeholder="Select Session" />
                          </SelectTrigger>
                          <SelectContent>
                            {sessions.map((sem: AcademicSesion) => (
                              <SelectItem key={sem._id} value={sem._id}>
                                {sem.name} - {sem.year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                        Academic Department
                      </Label>
                      <Select
                        onValueChange={(val) =>
                          handleSelectChange("academicDepartment", val)
                        }
                        value={formData.academicDepartment}
                      >
                        <SelectTrigger className="bg-white/5 border-gray-600 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept: Department) => (
                            <SelectItem
                              disabled
                              key={dept._id}
                              value={dept._id}
                            >
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg animate-pulse-slow"
                        disabled={loading}
                      >
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {loading ? "Updating..." : "Update"}
                        </motion.button>
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdateStudent;
