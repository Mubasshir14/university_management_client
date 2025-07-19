import { getSingleDepartment } from "@/components/Services/Department";
import DepartmentDetail from "@/components/Shared/DepartmentDetail";
import React from "react";

const DepartmentDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const { data: department } = await getSingleDepartment(id);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <DepartmentDetail department={department} />
      </div>
    </section>
  );
};

export default DepartmentDetailsPage;
