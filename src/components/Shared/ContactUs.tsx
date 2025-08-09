/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; 
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image"; 
import { toast } from "sonner";

export const ContactUs = () => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.6, ease: "easeOut" } },
  };

  const infoItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success("Your message has been sent!");
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 font-sansita">
     
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://i.ibb.co/KxkvgbT6/university-education-logo-design-template-free-vector.jpg" 
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          className="z-0 animate-pulse-slow" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-purple-100/30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 drop-shadow-md">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We're here to help! Whether you have questions about admissions, programs, or just want to say hello, feel free to reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className="space-y-8 lg:pr-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 space-y-6">
                <motion.div variants={infoItemVariants} className="flex items-center text-gray-700 text-lg">
                  <MapPin className="w-7 h-7 mr-4 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-1">Our Location</h3>
                    <p>123 University Ave, Knowledge City, State, 12345, Bangladesh</p>
                  </div>
                </motion.div>
                <motion.div variants={infoItemVariants} className="flex items-center text-gray-700 text-lg">
                  <Phone className="w-7 h-7 mr-4 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-1">Call Us</h3>
                    <p>+880 (123) 456-7890</p>
                    <p className="text-sm text-gray-500">Mon - Fri, 9:00 AM - 5:00 PM (BDST)</p>
                  </div>
                </motion.div>
                <motion.div variants={infoItemVariants} className="flex items-center text-gray-700 text-lg">
                  <Mail className="w-7 h-7 mr-4 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800 mb-1">Email Us</h3>
                    <p>admissions@university.edu</p>
                    <p className="text-sm text-gray-500">Expect a reply within 24-48 hours</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
            <motion.div
              className="w-full h-80 rounded-xl overflow-hidden shadow-lg border border-gray-200"
              variants={infoItemVariants}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.837340058525!2d90.36952865!3d23.791530599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c2f6d0f51%3A0xc32a8a5b2e5a7b6!2sUniversity%20of%20Dhaka!5e0!3m2!1sen!2sbd!4v1721250000000!5m2!1sen!2sbd" 
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="University Location"
              ></iframe>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:pl-8"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">Your Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-gray-700 font-semibold mb-2 block">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Inquiry about admissions"
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-semibold mb-2 block">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    rows={5}
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.25;
          }
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ContactUs;