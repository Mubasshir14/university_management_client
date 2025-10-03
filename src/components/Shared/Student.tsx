/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getAllDepartment } from "../Services/Department";
import { getAllSemester } from "../Services/Semester";
import { addStudent } from "../Services/Student";
import { BloodGroup, Gender } from "../Types/student";
import Image from "next/image";
import { useUser } from "../context/UserContext";
import { logout } from "../Services/AuthService";
import { useRouter } from "next/navigation";

export interface Department {
  _id: string;
  name: string;
  shortName?: string;
  image?: string;
  faculty?: { $id: string }[];
}

export interface AcademicSemester {
  _id: string;
  name: string;
  year: string;
  startMonth?: string;
  endMonth?: string;
}

export const academicYear = [
  { key: "1st Year 1st Semester", value: "1st Year 1st Semester" },
  { key: "1st Year 2nd Semester", value: "1st Year 2nd Semester" },
  { key: "2nd Year 1st Semester", value: "2nd Year 1st Semester" },
  { key: "2nd Year 2nd Semester", value: "2nd Year 2nd Semester" },
  { key: "3rd Year 1st Semester", value: "3rd Year 1st Semester" },
  { key: "3rd Year 2nd Semester", value: "3rd Year 2nd Semester" },
  { key: "4th Year 1st Semester", value: "4th Year 1st Semester" },
  { key: "4th Year 2nd Semester", value: "4th Year 2nd Semester" },
];

export default function Student() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [semesters, setSemesters] = useState<AcademicSemester[]>([]);
  const [year, setYears] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image: null as File | null,
    firstName: "",
    lastName: "",
    gender: "",
    email: user?.email || "",
    contactNo: user?.phone || "",
    bloodGroup: "",
    academicDepartment: "",
    academicSemester: "",
    year: "",
    isApproved: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [deptRes, semRes] = await Promise.all([
          getAllDepartment(),
          getAllSemester(),
        ]);
        if (deptRes.success) {
          setDepartments(deptRes.data);
        } else {
          toast.error(deptRes.message || "Failed to fetch departments");
        }
        if (semRes.success) {
          setSemesters(semRes.data);
        } else {
          toast.error(semRes.message || "Failed to fetch semesters");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
        contactNo: user.phone || "",
      }));
    }
  }, [user?.email]);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file" && files[0]) {
      setFormData({ ...formData, image: files[0] });
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(files[0]);
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submitData = new FormData();
    const dataPayload = {
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      email: formData.email,
      contactNo: formData.contactNo,
      bloodGroup: formData.bloodGroup,
      academicDepartment: formData.academicDepartment,
      academicSemester: formData.academicSemester,
      year: formData.year,
      isApproved: formData.isApproved,
    };
    submitData.append("data", JSON.stringify(dataPayload));
    if (formData.image) {
      submitData.append("image", formData.image);
    }
    console.log(submitData);
    const toastId = "submitting";
    try {
      const res = await addStudent(submitData);
      if (res.success) {
        toast.success(res.message || "Student added successfully", {
          id: toastId,
        });

        setFormData({
          image: null,
          firstName: "",
          lastName: "",
          gender: "",
          email: user?.email || "",
          contactNo: user?.phone || "",
          bloodGroup: "",
          academicDepartment: "",
          academicSemester: "",
          year: "",
          isApproved: false,
        });
        setImagePreview(null);
        logout();
        setUser(null);
        router.push("/");
      } else {
        toast.error(res.message || "Failed to add student", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add student. Please try again.", {
        id: toastId,
      });
    }
  };

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
              Student Registration Form
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            </h1>
            {loading ? (
              <div className="text-center text-gray-200">Loading...</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                    Image
                  </Label>
                  <Input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="bg-white/5 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg "
                  />
                  {imagePreview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <Image
                        height={128}
                        width={128}
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-blue-600/50"
                      />
                    </motion.div>
                  )}
                </motion.div>
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
                      className="bg-white/5 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg "
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
                    Email
                  </Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                    className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                    placeholder="e.g., john.doe@example.com"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                    Contact Number
                  </Label>
                  <Input
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                    disabled
                    className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg text-blue-800"
                    placeholder="e.g., +1234567890"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
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
                      onValueChange={(val) => handleSelectChange("gender", val)}
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
                        handleSelectChange("academicSemester", val)
                      }
                      value={formData.academicSemester}
                    >
                      <SelectTrigger className="bg-white/5 border-gray-600 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map((sem: AcademicSemester) => (
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
                  transition={{ duration: 0.4, delay: 0.5 }}
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
                        <SelectItem key={dept._id} value={dept._id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Label className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                    Academic Semester
                  </Label>
                  <Select
                    onValueChange={(val) => handleSelectChange("year", val)}
                    value={formData.year}
                  >
                    <SelectTrigger className="bg-white/5 border-gray-600 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {academicYear.map((year: any) => (
                        <SelectItem key={year.key} value={year.value}>
                          {year.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
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
                      {loading ? "Submitting..." : "Submit"}
                    </motion.button>
                  </Button>
                  {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                    {" "}
                    <small>
                      Please Login Agin After Submitted Successfully
                    </small>{" "}
                  </span> */}
                </motion.div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
