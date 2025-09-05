import UpdateDepartment from "@/components/DashboardComponents/UpdateDepartment";
import { getSingleDepartment } from "@/components/Services/Department";
import React from "react";

const UpdateDepartmentPage = async ({ params }: { params: { id: string } }) => {
      const { id } = await params;
      const { data: department } = await getSingleDepartment(id);
  return (
    <div>
      <UpdateDepartment department={department} />
    </div>
  );
};

export default UpdateDepartmentPage;
