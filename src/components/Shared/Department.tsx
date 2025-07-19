/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { getAllDepartment } from "../Services/Department";

interface Department {
  _id: string;
  name: string;
  shortName: string;
  image: string;
  faculty: { _id: string }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Department() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await getAllDepartment();
        if (res.success && Array.isArray(res.data)) {
          setDepartments(res.data);
        } else {
          setDepartments([]);
          toast.error(res.message || "Failed to fetch departments");
        }
      } catch (err: any) {
        setDepartments([]);
        toast.error(err.message || "Failed to fetch departments");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  return (
    // <section className="py-10 pt-40 bg-gradient-to-b from-blue-600/10 to-purple-600/10 relative font-sansita">
    //   <div className="absolute inset-0 opacity-10">
    //     <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <path
    //         d="M0 100C200 50, 400 150, 600 100S800 50, 1000 100s400 150, 600 100V600H0Z"
    //         fill="url(#wave)"
    //       />
    //       <motion.circle
    //         cx="10%"
    //         cy="20%"
    //         r="50"
    //         fill="url(#node1)"
    //         initial={{ scale: 0.8, opacity: 0.5 }}
    //         animate={{ scale: 1, opacity: 1 }}
    //         transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    //       />
    //       <motion.circle
    //         cx="90%"
    //         cy="80%"
    //         r="70"
    //         fill="url(#node2)"
    //         initial={{ scale: 0.8, opacity: 0.5 }}
    //         animate={{ scale: 1, opacity: 1 }}
    //         transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
    //       />
    //       <defs>
    //         <linearGradient id="wave" x1="0" y1="0" x2="0" y2="600">
    //           <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
    //           <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
    //         </linearGradient>
    //         <radialGradient id="node1" cx="0" cy="0" r="1">
    //           <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
    //           <stop offset="100%" stopColor="transparent" />
    //         </radialGradient>
    //         <radialGradient id="node2" cx="0" cy="0" r="1">
    //           <stop offset="0%" stopColor="rgba(147, 51, 234, 0.5)" />
    //           <stop offset="100%" stopColor="transparent" />
    //         </radialGradient>
    //       </defs>
    //     </svg>
    //   </div>
    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
    //     <motion.div
    //       initial={{ opacity: 0, y: 50 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }}
    //     >
    //       <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-center mb-8 relative">
    //         Departments
    //         <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />

    //       </h1>
    //       {loading ? (
    //         <div className="text-center text-gray-200">Loading...</div>
    //       ) : departments.length === 0 ? (
    //         <div className="text-center text-gray-200">No departments found.</div>
    //       ) : (
    //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //           {departments.map((department, index) => (
    //             <motion.div
    //               key={department._id}
    //               initial={{ opacity: 0, y: 20 }}
    //               animate={{ opacity: 1, y: 0 }}
    //               transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
    //             >
    //               <Card className="bg-white/10 backdrop-blur-sm border-gray-200/20 hover:border-blue-600/50 transition-all duration-300 rounded-xl shadow-xl hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
    //                 <CardHeader className="">
    //                   <div className="relative h-56 w-full">
    //                     <Image
    //                       src={department.image || "/placeholder.jpg"}
    //                       alt={department.name}
    //                       fill
    //                       className="object-cover rounded-t-xl"
    //                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    //                     />
    //                   </div>
    //                 </CardHeader>
    //                 <CardContent className="p-4">
    //                   <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
    //                     {department.name || "N/A"}
    //                   </h2>
    //                   <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-2">
    //                     Faculty Count: {department.faculty?.length || 0}
    //                   </p>
    //                 </CardContent>
    //                 <CardFooter className="p-2">
    //                   <Button
    //                     asChild
    //                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg"
    //                   >
    //                     <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
    //                       <Link href={`/department/${department._id}`}>
    //                         View Details
    //                       </Link>
    //                     </motion.div>
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //             </motion.div>
    //           ))}
    //         </div>
    //       )}
    //     </motion.div>
    //   </div>
    // </section>

    <section className="py-20 bg-gradient-to-b from-blue-50/20 to-purple-50/10 font-sansita">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
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
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-14 relative">
            Departments
            <span className="block mx-auto mt-3 w-28 h-1 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full"></span>
          </h1>

          {loading ? (
            <div className="text-center text-gray-400 text-lg">
              Loading departments...
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center text-gray-400 text-lg">
              No departments available right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((department, index) => (
                <motion.div
                  key={department._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 120,
                  }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border border-white/10 hover:border-purple-500/60 transition-all duration-300 rounded-2xl shadow-lg overflow-hidden hover:shadow-purple-300/30">
                    <div className="relative h-56 w-full">
                      <Image
                        src={department.image || "/fallback-department.jpg"}
                        alt={department.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        {department.name || "Unnamed Department"}
                      </h2>
                      <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-1">
                        Short Name:{" "}
                        <span className="font-medium">
                          {department.shortName || "N/A"}
                        </span>
                      </p>
                      <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-1">
                        Faculty Members:{" "}
                        <span className="font-medium">
                          {department.faculty?.length || 0}
                        </span>
                      </p>
                    </CardContent>
                    <CardFooter className="px-5 pb-5">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 rounded-md transition-all duration-200"
                      >
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Link href={`/department/${department._id}`}>
                            View Details
                          </Link>
                        </motion.div>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
