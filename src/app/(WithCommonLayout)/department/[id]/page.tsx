// import { getSingleDepartment } from "@/components/Services/Department";
// import DepartmentDetail from "@/components/Shared/DepartmentDetail";
// import React from "react";

// const DepartmentDetailsPage = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   const { id } = await params;
//   const { data: department } = await getSingleDepartment(id);

//   return (
//     <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
//         <DepartmentDetail department={department} />
//       </div>
//     </section>
//   );
// };

// export default DepartmentDetailsPage;

import { getSingleDepartment } from "@/components/Services/Department";
import DepartmentDetail from "@/components/Shared/DepartmentDetail";
import React from "react";

interface DepartmentDetailsPageProps {
  params: Promise<{ id: string }>;
}

const DepartmentDetailsPage: React.FC<DepartmentDetailsPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  let department = null;

  try {
    const { data } = await getSingleDepartment(id);
    department = data;
  } catch (error) {
    console.error(`Failed to fetch department with ID ${id}:`, error);
    // Optionally render a fallback UI here, e.g., <NotFound /> or error boundary
  }

  if (!department) {
    // Render a loading or error state
    return (
      <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="text-center text-gray-500">Department not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <DepartmentDetail department={department} />
      </div>
    </section>
  );
};

export default DepartmentDetailsPage;