// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { X } from "lucide-react";
// import { getAllDepartment } from "../Services/Department";
// import { addFaculty } from "../Services/Faculty";
// import Image from "next/image";
// import { BloodGroup, Designation, Gender } from "../Types/faculty";

// interface AcademicDepartment {
//   _id: string;
//   name: string;
// }

// export default function AddFaculty() {
//   const router = useRouter();
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [departments, setDepartments] = useState<AcademicDepartment[]>([]);

//   const form = useForm({
//     defaultValues: {
//       id: "",
//       designation: "",
//       name: "",
//       gender: "",
//       email: "",
//       contactNo: "",
//       bloodGroup: "",
//       academicDepartment: "",
//     },
//   });

//   const {
//     formState: { isSubmitting },
//   } = form;

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const res = await getAllDepartment();
//         if (res.success) {
//           setDepartments(res.data);
//         } else {
//           toast.error(res.message || "Failed to fetch departments");
//         }
//       } catch (err: any) {
//         toast.error(err.message || "Failed to fetch departments");
//       }
//     };
//     fetchDepartments();
//   }, []);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleRemoveImage = () => {
//     setImageFile(null);
//     setImagePreview(null);
//   };

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const toastId = "creating";
//     try {
//       const formData = new FormData();
//       formData.append("data", JSON.stringify(data));
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }
//       const res = await addFaculty(formData);
//       if (res.success) {
//         toast.success(res.message || "Faculty added successfully", {
//           id: toastId,
//         });
//         router.push("/admin/dashboard/manage-advisor");
//       } else {
//         toast.error(res.message || "Failed to add faculty", { id: toastId });
//       }
//     } catch (err: any) {
//       console.error(err.message);
//       toast.error(err.message || "Failed to add faculty. Please try again.", {
//         id: toastId,
//       });
//     }
//   };

//   return (
//     <section className="py-10 bg-gradient-to-b from-blue-600/10 to-purple-600/10 relative font-sansita">
//       <div className="absolute inset-0 opacity-10">
//         <svg
//           className="w-full h-full"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M0 100C200 50, 400 150, 600 100S800 50, 1000 100s400 150, 600 100V600H0Z"
//             fill="url(#wave)"
//           />
//           <motion.circle
//             cx="10%"
//             cy="20%"
//             r="50"
//             fill="url(#node1)"
//             initial={{ scale: 0.8, opacity: 0.5 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{
//               duration: 2.5,
//               repeat: Infinity,
//               repeatType: "reverse",
//               ease: "easeInOut",
//             }}
//           />
//           <motion.circle
//             cx="90%"
//             cy="80%"
//             r="70"
//             fill="url(#node2)"
//             initial={{ scale: 0.8, opacity: 0.5 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{
//               duration: 2.5,
//               repeat: Infinity,
//               repeatType: "reverse",
//               ease: "easeInOut",
//               delay: 0.5,
//             }}
//           />
//           <defs>
//             <linearGradient id="wave" x1="0" y1="0" x2="0" y2="600">
//               <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
//               <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
//             </linearGradient>
//             <radialGradient id="node1" cx="0" cy="0" r="1">
//               <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
//               <stop offset="100%" stopColor="transparent" />
//             </radialGradient>
//             <radialGradient id="node2" cx="0" cy="0" r="1">
//               <stop offset="0%" stopColor="rgba(147, 51, 234, 0.5)" />
//               <stop offset="100%" stopColor="transparent" />
//             </radialGradient>
//           </defs>
//         </svg>
//       </div>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-lg">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.8,
//             ease: "easeOut",
//             type: "spring",
//             stiffness: 100,
//           }}
//         >
//           <div className="border-2 border-gray-200/20 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow duration-300">
//             <h1 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 relative">
//               Add Advisor
//               <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
//               {/* <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-600 to-teal-600 rounded-full" /> */}
//             </h1>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-6"
//               >
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.4 }}
//                   className="grid grid-cols-1 gap-4 sm:grid-cols-2"
//                 >
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
//                           Name
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="e.g., John Doe"
//                             className="bg-white/5 border-gray-600  placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <FormMessage className="text-red-400 text-sm" />
//                         </motion.div>
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
//                           Email
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             type="email"
//                             placeholder="e.g., john.doe@example.com"
//                             className="bg-white/5 border-gray-600  placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg text-blue-700"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <FormMessage className="text-red-400 text-sm" />
//                         </motion.div>
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="designation"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
//                           Designation
//                         </FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
//                               <SelectValue placeholder="Select Designation" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-gray-800 border-gray-600 text-white">
//                             {Designation.map((designation) => (
//                               <SelectItem
//                                 key={designation}
//                                 value={designation}
//                                 className="hover:bg-blue-600/50 hover:text-white "
//                               >
//                                 {designation}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <FormMessage className="text-red-400 text-sm" />
//                         </motion.div>
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="gender"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
//                           Gender
//                         </FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
//                               <SelectValue placeholder="Select Gender" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-gray-800 border-gray-600 text-white">
//                             {Gender.map((gender) => (
//                               <SelectItem
//                                 key={gender}
//                                 value={gender}
//                                 className="hover:bg-blue-600/50 hover:text-white capitalize"
//                               >
//                                 {gender}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <FormMessage className="text-red-400 text-sm" />
//                         </motion.div>
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="contactNo"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
//                           Contact Number
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="e.g., +1234567890"
//                             className="bg-white/5  border-gray-600  placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <FormMessage className="text-red-400 text-sm" />
//                         </motion.div>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="bloodGroup"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
//                           Blood Group
//                         </FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger className="bg-white/5 border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
//                               <SelectValue placeholder="Select Blood Group" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-gray-800 border-gray-600 text-white">
//                             {BloodGroup.map((group) => (
//                               <SelectItem
//                                 key={group}
//                                 value={group}
//                                 className="hover:bg-blue-600/50 hover:text-white"
//                               >
//                                 {group}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <FormMessage className="text-red-400 text-sm" />
//                         </motion.div>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="academicDepartment"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
//                           Academic Department
//                         </FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger className="bg-white/5 border-gray-600  placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
//                               <SelectValue placeholder="Select Department" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent className="bg-gray-800 border-gray-600 text-white">
//                             {departments.map((dept) => (
//                               <SelectItem
//                                 key={dept._id}
//                                 value={dept._id}
//                                 className="hover:bg-blue-600/50 hover:text-white"
//                               >
//                                 {dept.name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <FormMessage className="text-red-400 text-sm" />
//                         </motion.div>
//                       </FormItem>
//                     )}
//                   />
//                 </motion.div>
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <FormItem>
//                     <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
//                       Faculty Image
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="file"
//                         accept="image/*"
//                         className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg file:bg-blue-600 file:text-white file:border-none file:rounded-lg file:px-4 file:py-2 hover:file:bg-blue-700"
//                         onChange={handleImageChange}
//                       />
//                     </FormControl>
//                     {imagePreview && (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.3 }}
//                         className="mt-4 relative"
//                       >
//                         <Image
//                           height={144}
//                           width={144}
//                           src={imagePreview}
//                           alt="Preview"
//                           className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200/20 shadow-md"
//                         />
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="absolute top-1 right-1 bg-gray-800/50 text-red-400 hover:bg-red-600/50 hover:text-red-300"
//                           onClick={handleRemoveImage}
//                         >
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </motion.div>
//                     )}
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <FormMessage className="text-red-400 text-sm" />
//                     </motion.div>
//                   </FormItem>
//                 </motion.div>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: 0.2 }}
//                 >
//                   <Button
//                     asChild
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg animate-pulse-slow"
//                     disabled={isSubmitting}
//                   >
//                     <motion.button
//                       whileTap={{ scale: 0.95 }}
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       {isSubmitting ? "Adding Advisor..." : "Add Advisor"}
//                     </motion.button>
//                   </Button>
//                 </motion.div>
//               </form>
//             </Form>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { X, User, Mail, Phone, CreditCard, IdCard } from "lucide-react";
import { getAllDepartment } from "../Services/Department";
import { addFaculty } from "../Services/Faculty";
import Image from "next/image";
import { BloodGroup, Designation, Gender } from "../Types/faculty";

interface AcademicDepartment {
  _id: string;
  name: string;
}

export default function AddFaculty() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [departments, setDepartments] = useState<AcademicDepartment[]>([]);

  const form = useForm({
    defaultValues: {
      id: "",
      nid: "",
      designation: "",
      name: "",
      gender: "",
      email: "",
      contactNo: "",
      bloodGroup: "",
      academicDepartment: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getAllDepartment();
        if (res.success) {
          setDepartments(res.data);
        } else {
          toast.error(res.message || "Failed to fetch departments");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch departments");
      }
    };
    fetchDepartments();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Validation
    const errors: any = {};

    // ID validation: Starts with F followed by 6 digits
    if (!data.id) {
      errors.id = "Faculty ID is required";
    } else if (!/^F\d{6}$/.test(data.id)) {
      errors.id = "Faculty ID must start with F followed by 6 digits (e.g., F123456)";
    }

    // NID validation
    if (!data.nid) {
      errors.nid = "NID is required";
    } else if (!/^\d{10}$|^\d{13}$|^\d{17}$/.test(data.nid)) {
      errors.nid = "NID must be 10, 13, or 17 digits";
    }

    // Email validation
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/^[\w-\.]+@(gmail\.com|yahoo\.com)$/.test(data.email)) {
      errors.email = "Only Gmail or Yahoo emails are allowed";
    }

    // Phone validation
    if (!data.contactNo) {
      errors.contactNo = "Phone is required";
    } else if (!/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/.test(data.contactNo)) {
      errors.contactNo = "Invalid Bangladeshi phone number";
    }

    // Set errors if any
    Object.keys(errors).forEach((key) =>
      form.setError(key as any, { message: errors[key] })
    );

    // If there are errors, stop submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    const toastId = "creating";
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const res = await addFaculty(formData);
      if (res.success) {
        toast.success(res.message || "Faculty added successfully", {
          id: toastId,
        });
        router.push("/admin/dashboard/manage-advisor");
      } else {
        toast.error(res.message || "Failed to add faculty", { id: toastId });
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message || "Failed to add faculty. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <section className="py-10 bg-gradient-to-b from-blue-600/10 to-purple-600/10 relative font-sansita">
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 100C200 50, 400 150, 600 100S800 50, 1000 100s400 150, 600 100V600H0Z"
            fill="url(#wave)"
          />
          <motion.circle
            cx="10%"
            cy="20%"
            r="50"
            fill="url(#node1)"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="90%"
            cy="80%"
            r="70"
            fill="url(#node2)"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <defs>
            <linearGradient id="wave" x1="0" y1="0" x2="0" y2="600">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
            </linearGradient>
            <radialGradient id="node1" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="node2" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
        >
          <div className="border-2 border-gray-200/20 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow duration-300">
            <h1 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 relative">
              Add Advisor
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Faculty ID
                        </FormLabel>
                        <div className="relative group">
                          <IdCard
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200"
                            size={20}
                          />
                          <FormControl>
                            <Input
                              placeholder="e.g., F123456"
                              className="pl-10 bg-white/5 border-gray-600 text-blue-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormMessage className="text-red-400 text-sm" />
                        </motion.div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          NID
                        </FormLabel>
                        <div className="relative group">
                          <CreditCard
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200"
                            size={20}
                          />
                          <FormControl>
                            <Input
                              placeholder="NID number"
                              className="pl-10 bg-white/5 border-gray-600 text-blue-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormMessage className="text-red-400 text-sm" />
                        </motion.div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Name
                        </FormLabel>
                        <div className="relative group">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200"
                            size={20}
                          />
                          <FormControl>
                            <Input
                              placeholder="e.g., John Doe"
                              className="pl-10 bg-white/5 border-gray-600 text-blue-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormMessage className="text-red-400 text-sm" />
                        </motion.div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Email
                        </FormLabel>
                        <div className="relative group">
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200"
                            size={20}
                          />
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="e.g., john@gmail.com"
                              className="pl-10 bg-white/5 border-gray-600 text-blue-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormMessage className="text-red-400 text-sm" />
                        </motion.div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Contact Number
                        </FormLabel>
                        <div className="relative group">
                          <Phone
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200"
                            size={20}
                          />
                          <FormControl>
                            <Input
                              placeholder="e.g., 01XXXXXXXXX"
                              className="pl-10 bg-white/5 border-gray-600 text-blue-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormMessage className="text-red-400 text-sm" />
                        </motion.div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Designation
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-gray-600 text-blue-800 focus:ring-2 focus:ring-blue-600 rounded-lg">
                              <SelectValue placeholder="Select Designation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-600 text-white">
                            {Designation.map((designation) => (
                              <SelectItem
                                key={designation}
                                value={designation}
                                className="hover:bg-blue-600/50 hover:text-white"
                              >
                                {designation}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormMessage className="text-red-400 text-sm" />
                        </motion.div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Gender
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-gray-600 text-blue-800 focus:ring-2 focus:ring-blue-600 rounded-lg">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-600 text-white">
                            {Gender.map((gender) => (
                              <SelectItem
                                key={gender}
                                value={gender}
                                className="hover:bg-blue-600/50 hover:text-white capitalize"
                              >
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormMessage className="text-red-400 text-sm" />
                        </motion.div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Blood Group
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-gray-600 text-blue-800 focus:ring-2 focus:ring-blue-600 rounded-lg">
                              <SelectValue placeholder="Select Blood Group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-600 text-white">
                            {BloodGroup.map((group) => (
                              <SelectItem
                                key={group}
                                value={group}
                                className="hover:bg-blue-600/50 hover:text-white"
                              >
                                {group}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormMessage className="text-red-400 text-sm" />
                        </motion.div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="academicDepartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                          Academic Department
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-gray-600 text-blue-800 focus:ring-2 focus:ring-blue-600 rounded-lg">
                              <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-600 text-white">
                            {departments.map((dept) => (
                              <SelectItem
                                key={dept._id}
                                value={dept._id}
                                className="hover:bg-blue-600/50 hover:text-white"
                              >
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormMessage className="text-red-400 text-sm" />
                        </motion.div>
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <FormItem>
                    <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                      Faculty Image
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg file:bg-blue-600 file:text-white file:border-none file:rounded-lg file:px-4 file:py-2 hover:file:bg-blue-700"
                        onChange={handleImageChange}
                      />
                    </FormControl>
                    {imagePreview && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 relative"
                      >
                        <Image
                          height={144}
                          width={144}
                          src={imagePreview}
                          alt="Preview"
                          className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200/20 shadow-md"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 bg-gray-800/50 text-red-400 hover:bg-red-600/50 hover:text-red-300"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormMessage className="text-red-400 text-sm" />
                    </motion.div>
                  </FormItem>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Button
                    asChild
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg animate-pulse-slow"
                    disabled={isSubmitting}
                  >
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {isSubmitting ? "Adding Advisor..." : "Add Advisor"}
                    </motion.button>
                  </Button>
                </motion.div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}