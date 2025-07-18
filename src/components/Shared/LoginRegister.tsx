// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, FormEvent } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Mail, Lock, User, Phone, MapPin } from "lucide-react";

// const MotionButton = motion(Button);

// export const LoginRegister = () => {

//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [registerData, setRegisterData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     phone: "",
//   });
//   const [errors, setErrors] = useState({ login: {}, register: {} });

//   const handleLoginSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const newErrors: any = {};
//     if (!loginData.email) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(loginData.email))
//       newErrors.email = "Invalid email format";
//     if (!loginData.password) newErrors.password = "Password is required";
//     setErrors((prev) => ({ ...prev, login: newErrors }));
//     if (Object.keys(newErrors).length === 0) {
//       console.log("Login Data:", loginData);
//       // Add backend API call here
//     }
//   };

//   const handleRegisterSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const newErrors: any = {};
//     if (!registerData.name) newErrors.name = "Name is required";
//     if (!registerData.email) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(registerData.email))
//       newErrors.email = "Invalid email format";
//     if (!registerData.password) newErrors.password = "Password is required";
//     if (!registerData.address) newErrors.address = "Address is required";
//     if (!registerData.phone) newErrors.phone = "Phone number is required";
//     setErrors((prev) => ({ ...prev, register: newErrors }));
//     if (Object.keys(newErrors).length === 0) {
//       console.log("Register Data:", registerData);
//       // Add backend API call here
//     }
//   };

//   const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//     setErrors((prev) => ({
//       ...prev,
//       login: { ...prev.login, [e.target.name]: "" },
//     }));
//   };

//   const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setRegisterData({ ...registerData, [e.target.name]: e.target.value });
//     setErrors((prev) => ({
//       ...prev,
//       register: { ...prev.register, [e.target.name]: "" },
//     }));
//   };

//   return (
//     <section className="py-20 bg-gradient-to-b from-blue-600/10 to-purple-600/10 relative">
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
//               duration: 2,
//               repeat: Infinity,
//               repeatType: "reverse",
//               ease: "easeInOut",
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
//           </defs>
//         </svg>
//       </div>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-md">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.8,
//             ease: "easeOut",
//             type: "spring",
//             stiffness: 80,
//           }}
//         >
//           <Card className="bg-white/10 backdrop-blur-sm border border-gray-200/20 rounded-2xl shadow-xl font-sansita">
//             <CardHeader>
//               <CardTitle className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
//                 Welcome
//                 <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
//                 {/* <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-600 to-teal-600 rounded-full" /> */}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Tabs defaultValue="login" className="w-full">
//                 <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
//                   <TabsTrigger
//                     value="login"
//                     className="text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
//                   >
//                     Login
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="register"
//                     className="text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
//                   >
//                     Register
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="login">
//                   <motion.form
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4 }}
//                     onSubmit={handleLoginSubmit}
//                     className="space-y-4 mt-4"
//                   >
//                     <div>
//                       <Label htmlFor="email" className="text-gray-200">
//                         Email
//                       </Label>
//                       <div className="relative">
//                         <Mail
//                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                           size={20}
//                         />
//                         <Input
//                           id="email"
//                           name="email"
//                           type="email"
//                           placeholder="Enter your email"
//                           value={loginData.email}
//                           onChange={handleLoginChange}
//                           className="pl-10 bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="password" className="text-gray-200">
//                         Password
//                       </Label>
//                       <div className="relative">
//                         <Lock
//                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                           size={20}
//                         />
//                         <Input
//                           id="password"
//                           name="password"
//                           type="password"
//                           placeholder="Enter your password"
//                           value={loginData.password}
//                           onChange={handleLoginChange}
//                           className="pl-10 bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
//                         />
//                       </div>
//                     </div>
//                     <MotionButton
//                       type="submit"
//                       variant="outline"
//                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Login
//                     </MotionButton>
//                   </motion.form>
//                 </TabsContent>
//                 <TabsContent value="register">
//                   <motion.form
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4 }}
//                     onSubmit={handleRegisterSubmit}
//                     className="space-y-4 mt-4"
//                   >
//                     <div>
//                       <Label htmlFor="name" className="text-gray-200">
//                         Name
//                       </Label>
//                       <div className="relative">
//                         <User
//                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                           size={20}
//                         />
//                         <Input
//                           id="name"
//                           name="name"
//                           type="text"
//                           placeholder="Enter your name"
//                           value={registerData.name}
//                           onChange={handleRegisterChange}
//                           className="pl-10 bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="email" className="text-gray-200">
//                         Email
//                       </Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <Input
//                           id="email"
//                           name="email"
//                           type="email"
//                           placeholder="Enter your email"
//                           value={registerData.email}
//                           onChange={handleRegisterChange}
//                           className="pl-10 bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="password" className="text-gray-200">
//                         Password
//                       </Label>
//                       <div className="relative">
//                         <Lock
//                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                           size={20}
//                         />
//                         <Input
//                           id="password"
//                           name="password"
//                           type="password"
//                           placeholder="Enter your password"
//                           value={registerData.password}
//                           onChange={handleRegisterChange}
//                           className="pl-10 bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="address" className="text-gray-200">
//                         Address
//                       </Label>
//                       <div className="relative">
//                         <MapPin
//                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                           size={20}
//                         />
//                         <Input
//                           id="address"
//                           name="address"
//                           type="text"
//                           placeholder="Enter your address"
//                           value={registerData.address}
//                           onChange={handleRegisterChange}
//                           className="pl-10 bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="phone" className="text-gray-200">
//                         Phone
//                       </Label>
//                       <div className="relative">
//                         <Phone
//                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                           size={20}
//                         />
//                         <Input
//                           id="phone"
//                           name="phone"
//                           type="tel"
//                           placeholder="Enter your phone number"
//                           value={registerData.phone}
//                           onChange={handleRegisterChange}
//                           className="pl-10 bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600"
//                         />
//                       </div>
//                     </div>
//                     <MotionButton
//                       type="submit"
//                       variant="outline"
//                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Register
//                     </MotionButton>
//                   </motion.form>
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default LoginRegister;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { User, Mail, Lock, KeyRound, Phone, Map } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/context/UserContext";
import Link from "next/link";
import { loginUser, registerUser } from "../Services/AuthService";

const MotionButton = motion(Button);

export const LoginRegister = () => {
  const loginForm = useForm<FieldValues>();
  const registerForm = useForm<FieldValues>();
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();
  const { setIsLoading } = useUser();

  const password = registerForm.watch("password");
  const passwordConfirm = registerForm.watch("passwordConfirm");

  // login
  const onLoginSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const errors: any = {};
      if (!data.email) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(data.email))
        errors.email = "Invalid email format";
      if (!data.password) errors.password = "Password is required";
      loginForm.setError("email", { message: errors.email });
      loginForm.setError("password", { message: errors.password });
      if (Object.keys(errors).length === 0) {
        try {
          setIsLoading(true);
          const res = await loginUser(data);
          if (res?.success) {
            toast.success(res?.message);
            router.push("/");
          } else {
            toast.error(res?.message);
          }
        } catch (err: any) {
          console.error(err);
          toast.error("Login failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  // register
  const onRegisterSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await registerUser(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-600/10 to-purple-600/10 relative font-sansita">
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
          <Card className="bg-white/10 backdrop-blur-sm border border-gray-200/20 rounded-2xl shadow-xl hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
                Welcome
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                {/* <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-600 to-teal-600 rounded-full" /> */}
              </CardTitle>
              <p className="text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-sm mt-2">
                Access Your Academic Journey
              </p>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 rounded-lg">
                  <TabsTrigger
                    value="login"
                    className="text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-medium"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Form {...loginForm}>
                      <form
                        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                        className="space-y-5 mt-4"
                      >
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                                Email Address
                              </FormLabel>
                              <div className="relative group">
                                <Mail
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-transform duration-200"
                                  size={24}
                                />
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-12 bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 rounded-lg transition-all duration-200"
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400 text-sm mt-1" />
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                                Password
                              </FormLabel>
                              <div className="relative group">
                                <Lock
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-transform duration-200"
                                  size={24}
                                />
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 rounded-lg transition-all duration-200"
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400 text-sm mt-1" />
                              </div>
                            </FormItem>
                          )}
                        />
                        <MotionButton
                          type="submit"
                          variant="outline"
                          disabled={loginForm.formState.isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg animate-pulse-slow"
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {loginForm.formState.isSubmitting
                            ? "Logging in..."
                            : "Login"}
                        </MotionButton>
                        <div className="text-center mt-4 space-y-2">
                          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            Don’t have an account?{" "}
                            <button
                              type="button"
                              className="font-medium text-blue-400 hover:text-blue-500 transition-colors duration-200"
                              onClick={() => setActiveTab("register")}
                            >
                              Register
                            </button>
                          </p>
                          <p className="text-sm text-gray-300">
                            <Link
                              href="/forgot-password"
                              className="font-medium text-blue-400 hover:text-blue-500 transition-colors duration-200"
                            >
                              Forgot Password?
                            </Link>
                          </p>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                </TabsContent>
                <TabsContent value="register">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Form {...registerForm}>
                      <form
                        onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                        className="space-y-5 mt-4"
                      >
                        <FormField
                          control={registerForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                                Full Name
                              </FormLabel>
                              <div className="relative group">
                                <User
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200 hover:rotate-5"
                                  size={24}
                                />
                                <FormControl>
                                  <Input
                                    placeholder="John Doe"
                                    className="pl-12 bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 rounded-lg transition-all duration-200"
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <FormMessage className="text-red-400 text-sm mt-1" />
                                </motion.div>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                                Email Address
                              </FormLabel>
                              <div className="relative group">
                                <Mail
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200 hover:rotate-5"
                                  size={24}
                                />
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-12 bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 rounded-lg transition-all duration-200"
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <FormMessage className="text-red-400 text-sm mt-1" />
                                </motion.div>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                                Password
                              </FormLabel>
                              <div className="relative group">
                                <Lock
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200 hover:rotate-5"
                                  size={24}
                                />
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 rounded-lg transition-all duration-200"
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <FormMessage className="text-red-400 text-sm mt-1" />
                                </motion.div>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="passwordConfirm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                                Confirm Password
                              </FormLabel>
                              <div className="relative group">
                                <KeyRound
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200 hover:rotate-5"
                                  size={24}
                                />
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 rounded-lg transition-all duration-200"
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {passwordConfirm &&
                                    password !== passwordConfirm && (
                                      <FormMessage className="text-red-400 text-sm">
                                        Passwords do not match
                                      </FormMessage>
                                    )}
                                  <FormMessage className="text-red-400 text-sm mt-1" />
                                </motion.div>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                                Address
                              </FormLabel>
                              <div className="relative group">
                                <Map
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200 hover:rotate-5"
                                  size={24}
                                />
                                <FormControl>
                                  <Input
                                    placeholder="Your Address"
                                    className="pl-12 bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 rounded-lg transition-all duration-200"
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <FormMessage className="text-red-400 text-sm mt-1" />
                                </motion.div>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">
                                Phone
                              </FormLabel>
                              <div className="relative group">
                                <Phone
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-transform duration-200 hover:rotate-5"
                                  size={24}
                                />
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="01XXXXXXXXXXX"
                                    className="pl-12 bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 rounded-lg transition-all duration-200"
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <FormMessage className="text-red-400 text-sm mt-1" />
                                </motion.div>
                              </div>
                            </FormItem>
                          )}
                        />
                        <MotionButton
                          type="submit"
                          variant="outline"
                          disabled={
                            registerForm.formState.isSubmitting ||
                            (passwordConfirm && password !== passwordConfirm)
                          }
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg animate-pulse-slow"
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {registerForm.formState.isSubmitting
                            ? "Creating account..."
                            : "Create Account"}
                        </MotionButton>
                        <div className="text-center mt-4">
                          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            Already have an account?{" "}
                            <button
                              type="button"
                              className="font-medium text-blue-400 hover:text-blue-500 transition-colors duration-200"
                              onClick={() => setActiveTab("login")}
                            >
                              Login
                            </button>
                          </p>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default LoginRegister;
