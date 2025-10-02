/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addStudentID, getAllStudentID } from "../Services/StudentID";

export default function ManageStudentID() {
  const router = useRouter();
  const [studentIDs, setStudentIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      student_id: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const fetchStudentIDs = async () => {
    try {
      setLoading(true);
      const res = await getAllStudentID();
      if (res.success) {
        setStudentIDs(res.data.map((item: any) => item.student_id));
      } else {
        toast.error(res.message || "Failed to fetch student IDs");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch student IDs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentIDs();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "creating";
    try {

      const res = await addStudentID(data);
      if (res.success) {
        toast.success(res.message, { id: toastId });
        form.reset(); 
        fetchStudentIDs(); 
      } else {
        toast.error(res.message || "Failed to add ID", { id: toastId });
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message || "Failed to add ID. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <section className="py-10 bg-gradient-to-b from-blue-600/10 to-purple-600/10 font-sansita">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border-2 border-gray-200/20 bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl"
        >
          <h1 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Manage Student ID
          </h1>

          {/* Form to add new Student ID */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        Student ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Student ID(000000)"
                          className="bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg"
                >
                  {isSubmitting ? "Adding ID..." : "Add ID"}
                </Button>
              </motion.div>
            </form>
          </Form>

          {/* List of all Student IDs */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              All Student IDs
            </h2>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : studentIDs.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {studentIDs.map((id) => (
                  <li key={id} className="text-blue-900">
                    {id}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No Student IDs found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
