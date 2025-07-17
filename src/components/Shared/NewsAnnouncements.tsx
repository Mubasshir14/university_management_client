"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const newsItems = [
  {
    title: "CSE Team Wins Hackathon",
    date: "July 10, 2025",
    category: "Student Achievement",
    excerpt: "Our CS students won first place at the National Hackathon 2025!",
    // link: "/news/hackathon",
    image: "https://i.ibb.co/ymkgQWg4/campus.jpg",
  },
  {
    title: "New Research Center Opens",
    date: "June 20, 2025",
    category: "Faculty Research",
    excerpt: "A state-of-the-art AI research center was inaugurated this month.",
    // link: "/news/research-center",
    image: "https://i.ibb.co/ymkgQWg4/campus.jpg",
  },
  {
    title: "Spring Admission Deadline",
    date: "December 15, 2025",
    category: "Announcement",
    excerpt: "Apply by December 15 for priority consideration.",
    // link: "/apply",
    image: "https://i.ibb.co/ymkgQWg4/campus.jpg",
  },
  {
    title: "Cultural Fest 2025 Announced",
    date: "September 5, 2025",
    category: "Event",
    excerpt: "Join us for a vibrant celebration of diversity!",
    // link: "/events/cultural-fest",
    image: "https://i.ibb.co/ymkgQWg4/campus.jpg",
  },
];

export const NewsAnnouncements = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % newsItems.length);
  const prevSlide = () => setCurrent((current - 1 + newsItems.length) % newsItems.length);

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
          News & Announcements
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full" />
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 text-lg sm:text-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Stay Updated with Our Latest Achievements
        </motion.p>
        {/* Desktop and Tablet: Grid Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut", type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden group-hover:ring-2 group-hover:ring-blue-500/50 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image height={192} width={450} src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{item.date}</span>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{item.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.excerpt}</p>
                    {/* <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        asChild
                      >
                        <a href={item.link}>Read More</a>
                      </Button>
                    </motion.div> */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Mobile: Carousel */}
        <div className="sm:hidden relative max-w-md mx-auto font-sansita">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut", type: "spring", stiffness: 100 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image height={192} width={450} src={newsItems[current].image} alt={newsItems[current].title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{newsItems[current].date}</span>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{newsItems[current].category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{newsItems[current].title}</h3>
                    <p className="text-gray-600 text-sm">{newsItems[current].excerpt}</p>
                    {/* <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        asChild
                      >
                        <a href={newsItems[current].link}>Read More</a>
                      </Button>
                    </motion.div> */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 left-0 transform -translate-y-1/2"
          >
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:from-blue-600 hover:to-purple-600"
              onClick={prevSlide}
            >
              ←
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 right-0 transform -translate-y-1/2"
          >
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:from-blue-600 hover:to-purple-600"
              onClick={nextSlide}
            >
              →
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsAnnouncements;