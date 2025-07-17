"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative  text-white py-24 md:py-36 lg:py-48 overflow-hidden font-sansita">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: "url('https://i.ibb.co/ymkgQWg4/campus.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            type: "spring",
            stiffness: 80,
          }}
        >
          Discover UniversityHub
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto font-light drop-shadow-md"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: "easeOut",
            type: "spring",
            stiffness: 80,
          }}
        >
          Transforming education with seamless tools for students, faculty, and
          administrators.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.6,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
        >
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-10 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg"
            asChild
            disabled
          >
            <a href="/dashboard">Explore Now</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
