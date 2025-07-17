/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"; 
import {
  BookOpen,
  Lightbulb,
  Users,
  Award,
  ChevronRight,
} from "lucide-react"; 

export const AboutUs = () => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden font-sansita">
      <div className="absolute inset-0 opacity-15">
        <Image
          src="https://i.ibb.co/KxkvgbT6/university-education-logo-design-template-free-vector.jpg" 
          alt="Abstract Background"
          layout="fill"
          objectFit="cover"
          className="z-0 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-purple-100/30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
       
        <motion.div
          className="text-center mb-16 lg:mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold  leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 drop-shadow-lg">
            Our Legacy of Excellence
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Discover the journey of Modern University, where innovation meets tradition, and future leaders are forged.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-4 border-blue-500 pb-3 inline-block">
              Our Inspiring Story
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Founded in 1930, Modern University began with a vision to revolutionize education and empower generations. What started as a modest institution has grown into a beacon of knowledge, research, and community engagement.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Over the decades, we've consistently adapted to the evolving educational landscape, embracing cutting-edge methodologies and fostering a vibrant learning environment. Our commitment to academic rigor, groundbreaking research, and holistic student development remains unwavering.
            </p>
            <motion.a
              href="/history" 
              className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 group"
              whileHover={{ x: 5 }}
            >
              Learn More About Our History
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
          <motion.div
            className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl border border-gray-200 group-hover:shadow-2xl"
            variants={itemVariants}
          >
            <Image
              src="https://i.ibb.co/ymkgQWg4/campus.jpg" 
              alt="University Historic Building"
              width={700}
              height={500}
              layout="responsive"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </motion.div>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20 lg:mb-28"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <Lightbulb className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be a globally recognized institution of higher learning, renowned for academic excellence, pioneering research, and transformative societal impact. We aspire to cultivate critical thinkers and compassionate leaders who drive positive change worldwide.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="h-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To provide an exceptional educational experience that fosters intellectual curiosity, encourages interdisciplinary collaboration, and equips students with the skills to address complex global challenges. We are committed to generating and disseminating knowledge that benefits humanity.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mb-16 lg:mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-purple-500 pb-3 inline-block">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "Excellence", description: "Pursuing the highest standards in academics, research, and all endeavors." },
              { icon: Lightbulb, title: "Innovation", description: "Fostering creativity, critical thinking, and groundbreaking solutions." },
              { icon: Users, title: "Community", description: "Building an inclusive and supportive environment for all." },
              { icon: Award, title: "Integrity", description: "Upholding honesty, ethical conduct, and accountability." },
            ].map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <value.icon className="w-10 h-10 text-indigo-500 mb-4 mx-auto" />
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>


        <motion.div
          className="text-center mb-20 lg:mb-28"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-teal-500 pb-3 inline-block">
            Our Leadership
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Meet the dedicated individuals who guide Modern University towards its strategic goals and embody its values.
          </p>
          <motion.a
            href="/leadership" 
            className="inline-flex items-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Leadership Team
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>

        <motion.div
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-2xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Journey?</h3>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Explore our programs, connect with admissions, or schedule a campus visit.
          </p>
          <motion.a
            href="/admissions" 
            className="inline-flex items-center bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:text-blue-800 transition-all duration-300 transform hover:scale-105 mr-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.a>
          <motion.a
            href="/contact" 
            className="inline-flex items-center bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-white hover:text-purple-700 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.15;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;