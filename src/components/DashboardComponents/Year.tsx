/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

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
const Year = ({ onSelect }: { onSelect: (id: string) => void }) => {
  return (
    <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 font-sansita">
      {academicYear?.map((sem: any) => (
        <motion.div
          key={sem.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            type="button"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
            onClick={() => onSelect(sem.key)}
          >
            {sem.value}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default Year;
