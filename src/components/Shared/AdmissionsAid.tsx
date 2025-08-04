"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Mail, Phone, MapPin } from "lucide-react";

const steps = [
  {
    title: "Explore Programs",
    description: "Browse our diverse academic offerings to find your fit.",
    link: "/programs",
    icon: "📚",
    details: "Discover undergraduate, graduate, and professional programs tailored to your goals.",
  },
  {
    title: "Submit Application",
    description: "Complete our online application form by the deadline.",
    link: "/apply",
    icon: "📝",
    details: "Apply by December 15, 2025, for priority consideration.",
  },
  {
    title: "Apply for Aid",
    description: "Explore scholarships and financial aid options.",
    link: "/financial-aid",
    icon: "💰",
    details: "Scholarships available for 90% of students.",
  },
  {
    title: "Visit Campus",
    description: "Schedule a physical or virtual tour.",
    link: "/visit",
    icon: "🏛️",
    details: "Experience our vibrant campus through guided tours.",
  },
];

export const AdmissionsAid = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const today = new Date("2025-07-18");
  const startDate = new Date("2025-06-01");
  const endDate = new Date("2025-09-15");
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const daysPassed = (today.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const progress = Math.min((daysPassed / totalDays) * 100, 100);

  return (
    <section className="py-20 bg-gradient-to-b from-purple-600/10 to-blue-600/10 relative font-sansita">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 100C200 50, 400 150, 600 100S800 50, 1000 100s400 150, 600 100V600H0Z"
            fill="url(#wave)"
          />
          <defs>
            <linearGradient id="wave" x1="0" y1="0" x2="0" y2="600">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-4 drop-shadow-lg relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 80 }}
        >
          Admissions & Aid
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          {/* <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full" />
          <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full" /> */}
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 text-lg sm:text-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Your Journey to Excellence Starts Here
        </motion.p>
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut", type: "spring", stiffness: 100 }}
              className={`relative flex ${index % 2 === 0 ? "justify-start" : "justify-end"} mb-8`}
            >
              <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/50  backdrop-blur-sm border rounded-2xl shadow-xl group-hover:ring-2 group-hover:ring-blue-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.span
                          className="text-2xl font-bold text-blue-600  rounded-full w-12 h-12 flex items-center justify-center shadow-md animate-pulse-slow"
                          whileHover={{ scale: 1.2 }}
                          title={step.title}
                        >
                          {step.icon}
                        </motion.span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                          {expanded === index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.3 }}
                              className="text-gray-600 text-sm mt-2"
                            >
                              {step.details}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setExpanded(expanded === index ? null : index)}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          {expanded === index ? <ChevronUp /> : <ChevronDown />}
                        </Button>
                        {/* <Button
                          variant="outline"
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                          asChild
                        >
                          <a href={step.link}>Learn More</a>
                        </Button> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 + 0.2, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 text-center">Application Season Progress</h3>
            <div className="w-full  rounded-full h-[15px] border-2 border-blue-500/50 mt-2 ">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-center text-gray-600 text-sm mt-2">Deadline: December 15, 2025</p>
          </div>
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/50 backdrop-blur-sm border  rounded-2xl shadow-xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Contact Admissions</h3>
              <div className="mt-4 space-y-2 text-gray-600 text-sm">
                <p className="flex items-center justify-center"><Mail className="mr-2" /> admissions@university.edu</p>
                <p className="flex items-center justify-center"><Phone className="mr-2" /> +1 (123) 456-7890</p>
                <p className="flex items-center justify-center"><MapPin className="mr-2" /> 123 University Ave, City, Country</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
          className="mt-8 text-center"
        >
          <Button
            variant="outline"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-full animate-pulse-slow"
            asChild
          >
            <a href="/apply">Apply Now</a>
          </Button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default AdmissionsAid;