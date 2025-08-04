"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const programs = [
  { title: "Computer Science", faculty: "Engineering", icon: "💻", description: "Innovative programs in AI and software engineering.", link: "/programs/computer-science" },
  { title: "Mechanical Engineering", faculty: "Engineering", icon: "⚙️", description: "Hands-on learning with cutting-edge labs.", link: "/programs/mechanical-engineering" },
  { title: "English Literature", faculty: "Arts & Sciences", icon: "📚", description: "Explore classic and modern works.", link: "/programs/english-literature" },
  { title: "Business Administration", faculty: "Business", icon: "💼", description: "Accredited MBA with global focus.", link: "/programs/business-administration" },
  { title: "Physics", faculty: "Arts & Sciences", icon: "⚛️", description: "Research-driven programs in quantum mechanics.", link: "/programs/physics" },
];

const faculties = ["All", "Engineering", "Arts & Sciences", "Business"];

export const AcademicPrograms = () => {
  const [filter, setFilter] = useState("All");

  const filteredPrograms = filter === "All" ? programs : programs.filter((program) => program.faculty === filter);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-600/10 to-purple-600/10 relative font-sansita">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10%" cy="10%" r="100" fill="url(#pattern1)" />
          <circle cx="90%" cy="90%" r="150" fill="url(#pattern2)" />
          <defs>
            <radialGradient id="pattern1" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="pattern2" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 drop-shadow-lg relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 80 }}
        >
          Academic Programs
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full" />
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 text-lg sm:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Explore our diverse range of academic offerings
        </motion.p>
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {faculties.map((faculty) => (
              <Button
                key={faculty}
                variant={filter === faculty ? "default" : "outline"}
                className={`${
                  filter === faculty
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "text-gray-600 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
                } px-4 py-2 rounded-full transition-all duration-300`}
                onClick={() => setFilter(faculty)}
              >
                {faculty}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut", type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="group"
            >
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/50 backdrop-blur-sm border  rounded-2xl shadow-xl group-hover:ring-2 group-hover:ring-blue-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <span className="text-4xl mb-4 block">{program.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-800">{program.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{program.description}</p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="mt-4"
                  >
                    <Button
                      variant="outline"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                      asChild
                    >
                      <a href={program.link}>Explore Program</a>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-8 text-center"
        >
          <Button
            variant="outline"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-full"
            asChild
          >
            <a href="/programs">View All Programs</a>
          </Button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default AcademicPrograms;