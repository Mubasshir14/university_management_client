import UpdateStudent from "@/components/DashboardComponents/UpdateStudent";
import { getSinglStudent } from "@/components/Services/Student";
import React from "react";

const UpdateStudentPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { data: student } = await getSinglStudent(id);
  return (
    <div>
      <UpdateStudent student={student} />
    </div>
  );
};

export default UpdateStudentPage;
