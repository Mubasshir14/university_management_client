"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  { title: "Convocation 2025", date: "July 25, 2025", image: "https://i.ibb.co/ymkgQWg4/campus.jpg", link: "/events/convocation" },
  { title: "Tech Fest 2025", date: "August 10, 2025", image: "https://i.ibb.co/ymkgQWg4/campus.jpg", link: "/events/tech-fest" },
  { title: "Cultural Night", date: "September 5, 2025", image: "https://i.ibb.co/ymkgQWg4/campus.jpg", link: "/events/cultural-night" },
  { title: "Career Fair", date: "October 15, 2025", image: "https://i.ibb.co/ymkgQWg4/campus.jpg", link: "/events/career-fair" },
];

export const EventCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % events.length);
  const prevSlide = () => setCurrent((current - 1 + events.length) % events.length);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-600/10 to-purple-600/10 font-sansita">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 font-sansita">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-12 drop-shadow-lg relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 80 }}
        >
          Upcoming Events
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </motion.h2>
        {/* Desktop and Tablet: Grid Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title + index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut", type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="group"
            >
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/50 rounded-2xl shadow-xl overflow-hidden group-hover:ring-2 group-hover:ring-blue-500/50 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.05 }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 drop-shadow-md">{event.title}</h3>
                    <p className="text-gray-600 text-sm">{event.date}</p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        asChild
                      >
                        <a href={event.link}>View Details</a>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Mobile: Single Card Carousel */}
        <div className="sm:hidden relative max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut", type: "spring", stiffness: 100 }}
              className="flex justify-center"
            >
              <Card className="w-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <motion.img
                      src={events[current].image}
                      alt={events[current].title}
                      className="w-full h-48 object-cover"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.05 }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 drop-shadow-md">{events[current].title}</h3>
                    <p className="text-gray-600 text-sm">{events[current].date}</p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        asChild
                        disabled
                      >
                        <a href={events[current].link}>View Details</a>
                      </Button>
                    </motion.div>
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

export default EventCarousel;