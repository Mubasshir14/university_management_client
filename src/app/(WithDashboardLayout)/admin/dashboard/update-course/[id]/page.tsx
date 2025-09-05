import UpdateCourse from "@/components/DashboardComponents/UpdateCourse";
import { getSingleCourse } from "@/components/Services/Course";
import React from "react";

const UpdateCoursePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { data: course } = await getSingleCourse(id);
  return (
    <div>
      <UpdateCourse course={course} />
    </div>
  );
};

export default UpdateCoursePage;
