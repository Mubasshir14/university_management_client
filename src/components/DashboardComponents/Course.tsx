/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { getAllCourse } from "../Services/Course";


const Course = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await getAllCourse();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 font-sansita">
      {courses?.map((cor: any) => (
        <motion.div
          key={cor._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            type="button"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
            onClick={() => onSelect(cor._id)}
          >
            {`${cor.name}- ${cor.credits} Credit`}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default Course;
