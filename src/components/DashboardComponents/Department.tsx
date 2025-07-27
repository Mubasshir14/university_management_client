/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getAllDepartment } from "../Services/Department";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const Department = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const { data } = await getAllDepartment();
      setDepartments(data);
    };
    fetchDepartments();
  }, []);

  return (
    <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 font-sansita">
      {departments?.map((dep: any) => (
        <motion.div
          key={dep._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            type="button"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
            title={dep.name}
            onClick={() => onSelect(dep._id)}
          >
            {dep.shortName}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default Department;
