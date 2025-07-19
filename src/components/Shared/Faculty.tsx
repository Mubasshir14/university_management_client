/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";
import { getAllFaculty } from "../Services/Faculty";

interface Faculty {
  _id: string;
  name: string;
  designation: string;
  email: string;
  image?: string;
  academicDepartment: {
    _id: string;
    name: string;
  };
}

const Faculty = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await getAllFaculty();
        console.log(res.data);
        if (res.success && Array.isArray(res.data)) {
          setFaculties(res.data);
        } else {
          toast.error("Failed to fetch faculty data.");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  return (
    <section className="py-20 pt-32 bg-gradient-to-b from-blue-50/10 to-purple-50/10 font-sansita">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-10"
        >
          Our Honorable Faculties
        </motion.h1>

        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculties.map((faculty, index) => (
              <motion.div
                key={faculty._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border border-gray-200/20 hover:border-blue-600/60 shadow-xl hover:shadow-blue-500/30 rounded-xl transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative w-[220px] h-[220px] rounded-t-xl overflow-hidden group flex items-center justify-center">
                      <Image
                        src={faculty.image || "/placeholder-avatar.png"}
                        alt={faculty.name}
                        fill
                        className="object-cover flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 rounded-t-xl" />
                    </div>
                  </CardHeader>

                  <CardContent className="p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 space-y-2">
                    <h2 className="text-xl font-semibold">{faculty.name}</h2>
                    <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600">
                      {faculty.designation}
                    </p>
                    <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600">
                      Email: {faculty.email}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600">
                        Department:
                      </span>{" "}
                      {faculty.academicDepartment.name}
                    </p>
                  </CardContent>
                  <CardFooter className="p-2">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg"
                    >
                      <Link href={`/faculty/${faculty._id}`}>See Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Faculty;
