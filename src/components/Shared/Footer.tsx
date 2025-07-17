
"use client";

import { motion, type Variants } from "framer-motion"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import Image from "next/image";


const MotionButton = motion(Button);

export const Footer = () => {
  const ref = useRef(null);


  const containerVariants: Variants = { 
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Explicitly type itemVariants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", 
        stiffness: 100,
        damping: 10,
        
      },
    },
  };

  const linkVariants: Variants = { 
    hover: { x: 5, color: "#a5b4fc", transition: { duration: 0.2, ease: "easeOut" } },
  };

  const iconVariants: Variants = {
    hover: { scale: 1.2, rotate: 10, color: "#60a5fa", transition: { duration: 0.3, type: "spring", stiffness: 300 } },
    initial: { scale: 1, rotate: 0, color: "#cbd5e0" },
  };

  return (
    <footer
      className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white py-16 relative overflow-hidden font-sansita"
      ref={ref}
    >

      <div className="absolute inset-0 opacity-15">
        <svg
          className="w-full h-full animate-wave-motion"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 100C200 50, 400 150, 600 100S800 50, 1000 100s400 150, 600 100V600H0Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="600">
              <stop offset="0%" stopColor="rgba(100, 116, 139, 0.4)" />
              <stop offset="100%" stopColor="rgba(109, 40, 217, 0.4)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >

          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <Image
                height={64}
                width={128}
                src="https://i.ibb.co/KxkvgbT6/university-education-logo-design-template-free-vector.jpg"
                alt="University Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Empowering minds, fostering innovation, and shaping leaders for a brighter tomorrow.
            </p>
            <div className="flex space-x-4 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Icon className="w-7 h-7" />
                </motion.a>
              ))}
            </div>
          </motion.div>


          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-gray-100 mb-6 border-b-2 border-indigo-500 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 text-base">
              {[
                { name: "Academics", link: "/academics" },
                { name: "Admissions", link: "/admissions" },
                { name: "Research", link: "/research" },
                { name: "Campus Life", link: "/campus-life" },
                { name: "Alumni", link: "/alumni" },
                { name: "About Us", link: "/about" },
              ].map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={item.link}
                    className="text-gray-300 hover:text-indigo-300 transition-colors duration-200 flex items-center"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <svg className="w-3 h-3 mr-2 inline-block text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>


          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-gray-100 mb-6 border-b-2 border-indigo-500 pb-2 inline-block">
              Get in Touch
            </h3>
            <Card className="bg-white/10 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg">
              <CardContent className="p-6 text-gray-200 text-base space-y-4">
                <p className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-blue-300 flex-shrink-0" />
                  <span>123 University Avenue, Knowledge City, State, 12345, Bangladesh</span>
                </p>
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-blue-300" /> +880 (123) 456-7890
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-300" /> info@university.edu
                </p>
                <MotionButton
                  variant="default"
                  className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-blue-950 font-bold border-none hover:from-teal-500 hover:to-cyan-600 transition-all duration-300 mt-6 shadow-md hover:shadow-xl rounded-full py-3"
                  whileTap={{ scale: 0.95 }}
                  asChild
                >
                  <a href="/contact">Visit Our Campus</a>
                </MotionButton>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-gray-100 mb-6 border-b-2 border-indigo-500 pb-2 inline-block">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-base mb-4">
              Get the latest news, events, and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-full bg-white/15 text-white placeholder-gray-400 border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
              />
              <MotionButton
                variant="default"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 py-3 px-6 shadow-md hover:shadow-xl"
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </MotionButton>
            </div>
          </motion.div>
        </motion.div>


        <motion.div
          className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm opacity-80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          &copy; {new Date().getFullYear()} Modern University. All rights reserved.
          <span className="block mt-1">Designed with passion in Bangladesh.</span>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes wave-motion {
          0% {
            transform: scale(1) translateX(0);
          }
          50% {
            transform: scale(1.03) translateX(5px);
          }
          100% {
            transform: scale(1) translateX(0);
          }
        }
        .animate-wave-motion {
          animation: wave-motion 15s infinite ease-in-out;
        }

        /* Responsive shadow for the card on hover */
        .shadow-3xl {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .group-hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </footer>
  );
};

export default Footer;