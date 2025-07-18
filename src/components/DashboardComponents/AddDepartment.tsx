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
import { X } from "lucide-react";
import Select from "react-select";
import { addDepartment } from "../Services/Department";
import Image from "next/image";
import { getAllFaculty } from "../Services/Faculty";

export default function AddDepartment() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [loadingFaculty, setLoadingFaculty] = useState(true);

  const form = useForm({
    defaultValues: {
      name: "",
      shortName: "",
      faculty: [] as string[],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await getAllFaculty();
        setFaculties(res?.data || []);
      } catch (err) {
        toast.error("Failed to load faculties.");
      } finally {
        setLoadingFaculty(false);
      }
    };
    fetchFaculties();
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
    const toastId = "creating";
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const res = await addDepartment(formData);
      if (res.success) {
        toast.success(res.message || "Department added successfully", {
          id: toastId,
        });
        router.push("/admin/dashboard/manage-department");
      } else {
        toast.error(res.message || "Failed to add department", { id: toastId });
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(
        err.message || "Failed to add department. Please try again.",
        { id: toastId }
      );
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
            Add Department
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        Department Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Computer Science"
                          className="bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />

                {/* Short Name */}
                <FormField
                  control={form.control}
                  name="shortName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        Short Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., CSE"
                          className="bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="faculty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                      Faculty
                    </FormLabel>
                    <FormControl className="bg-gradient-to-b from-blue-600/10 to-purple-600/10">
                      <Select
                        isMulti
                        options={faculties.map((f) => ({
                          value: f._id,
                          label: f.name,
                        }))}
                        value={faculties
                          .filter((f) => field.value.includes(f._id))
                          .map((f) => ({ value: f._id, label: f.name }))}
                        onChange={(selected) =>
                          field.onChange(selected.map((s) => s.value))
                        }
                        className="text-blue-500 bg-gradient-to-b from-blue-600/10 to-purple-600/10"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <FormItem>
                <FormLabel className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Department Image
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-white/5 border-gray-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 rounded-lg file:bg-blue-600 file:text-white file:border-none file:rounded-lg file:px-4 file:py-2 hover:file:bg-blue-700"
                  />
                </FormControl>

                {imagePreview && (
                  <div className="mt-4 relative w-fit">
                    <Image
                      height={144}
                      width={144}
                      src={imagePreview}
                      alt="Preview"
                      className="h-36 w-36 object-cover rounded-xl border-2 border-blue-500 shadow-lg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 bg-red-600/70 text-white hover:bg-red-700 rounded-full"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </FormItem>

              {/* Submit */}
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
                  {isSubmitting ? "Adding Department..." : "Add Department"}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
