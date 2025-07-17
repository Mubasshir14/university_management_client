"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const features = [
  { title: "Student Portal", description: "Access grades, schedules, and resources effortlessly.", icon: "📚", link: "/student" },
  { title: "Faculty Dashboard", description: "Manage courses and monitor student progress.", icon: "👩‍🏫", link: "/faculty" },
  { title: "Admin Tools", description: "Streamline university operations with ease.", icon: "⚙️", link: "/admin" },
];

export const FeatureCards = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-600/10 to-purple-600/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 font-sansita">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-12 drop-shadow-lg relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 80 }}
        >
          Our Core Features
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 font-sansita">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut", type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              className="group font-sansita"
            >
              <Card className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl transition-all duration-300 overflow-hidden group-hover:ring-2 group-hover:ring-blue-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader>
                  <motion.div
                    className="text-5xl mb-4 text-blue-600 group-hover:text-purple-600 transition-colors duration-300"
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{feature.description}</p>
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
                      <a href={feature.link}>Learn More</a>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;