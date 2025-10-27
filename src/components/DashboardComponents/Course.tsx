

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { getAllCourse } from "../Services/Course";

// const Course = ({ onSelect }: { onSelect: (id: string) => void }) => {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [selectedValue, setSelectedValue] = useState("");

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const { data } = await getAllCourse();
//       setCourses(data);
//     };
//     fetchCourses();
//   }, []);

//   return (
//     <div className="py-10 px-4 font-sansita">
//       <Select value={selectedValue} onValueChange={(value) => {
//         setSelectedValue(value);
//         onSelect(value);
//       }}>
//         <SelectTrigger className="w-[280px]">
//           <SelectValue placeholder="Select a Course" className="placeholder:text-white"/>
//         </SelectTrigger>
//         <SelectContent className="bg-white">
//           {courses?.map((cor: any) => (
//             <SelectItem key={cor._id} value={cor._id}>
//               {`${cor.name} - ${cor.credits} Credit`}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

// export default Course;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCourse } from "../Services/Course";

const Course = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await getAllCourse();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="py-10 px-4 font-sansita">
      <Select value={selectedValue} onValueChange={(value) => {
        setSelectedValue(value);
        onSelect(value);
      }}>
        <SelectTrigger className="w-[320px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-none rounded-xl shadow-lg hover:shadow-xl focus:shadow-xl focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 group">
          <SelectValue placeholder="Select a Course" className="text-white font-medium" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-2xl p-1 mt-1">
          {courses?.map((cor: any) => (
            <SelectItem 
              key={cor._id} 
              value={cor._id}
              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-800 font-medium cursor-pointer rounded-lg transition-colors duration-200 p-3"
            >
              {`${cor.name} - ${cor.credits} Credit`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Course;