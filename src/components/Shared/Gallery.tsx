"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";

const images = [
  {
    src: "https://i.ibb.co/ymkgQWg4/campus.jpg",
    alt: "Campus Main Building",
    location: "Main Campus",
    description: "The heart of our university, where innovation begins.",
    width: 450,
    height: 300,
  },
  {
    src: "https://i.ibb.co/ymkgQWg4/campus.jpg",
    alt: "Library",
    location: "Central Library",
    description: "A hub for knowledge and research.",
    width: 300,
    height: 450,
  },
  {
    src: "https://i.ibb.co/ymkgQWg4/campus.jpg",
    alt: "Lecture Hall",
    location: "Academic Block",
    description: "State-of-the-art facilities for learning.",
    width: 450,
    height: 250,
  },
  {
    src: "https://i.ibb.co/ymkgQWg4/campus.jpg",
    alt: "Student Lounge",
    location: "Student Center",
    description: "A vibrant space for student collaboration.",
    width: 350,
    height: 350,
  },
  {
    src: "https://i.ibb.co/ymkgQWg4/campus.jpg",
    alt: "Sports Field",
    location: "Athletic Complex",
    description: "Where champions train and compete.",
    width: 450,
    height: 200,
  },
  {
    src: "https://i.ibb.co/ymkgQWg4/campus.jpg",
    alt: "Student Lounge",
    location: "Student Center",
    description: "A vibrant space for student collaboration.",
    width: 350,
    height: 350,
  },
  {
    src: "https://i.ibb.co/ymkgQWg4/campus.jpg",
    alt: "Sports Field",
    location: "Athletic Complex",
    description: "Where champions train and compete.",
    width: 450,
    height: 200,
  },

];

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export const Gallery = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-600/10 to-purple-600/10 font-sansita">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-12 drop-shadow-lg relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 80 }}
        >
          Campus Life
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </motion.h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-6"
          columnClassName="pl-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut", type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              className="group relative mb-6"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full object-cover rounded-2xl shadow-xl group-hover:ring-2 group-hover:ring-blue-500/50 transition-all duration-300"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPkQvV3wAAAABJRU5ErkJggg=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md text-white p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold drop-shadow-md">{image.location}</h3>
                <p className="text-sm drop-shadow-md">{image.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default Gallery;