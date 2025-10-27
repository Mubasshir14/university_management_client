// import UpdateStudent from "@/components/DashboardComponents/UpdateStudent";
// import { getSinglStudent } from "@/components/Services/Student";
// import React from "react";

// const UpdateStudentPage = async ({ params }: { params: { id: string } }) => {
//   const { id } = await params;
//   const { data: student } = await getSinglStudent(id);
//   return (
//     <div>
//       <UpdateStudent student={student} />
//     </div>
//   );
// };

// export default UpdateStudentPage;

import UpdateStudent from "@/components/DashboardComponents/UpdateStudent";
import { getSinglStudent } from "@/components/Services/Student";

interface UpdateStudentPageProps {
  params: Promise<{ id: string }>;
}

const UpdateStudentPage: React.FC<UpdateStudentPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  console.log(id);
  let student = null;

  try {
    const { data } = await getSinglStudent(id);
    student = data;
    console.log(student);
  } catch (error) {
    console.error(`Failed to fetch student with ID ${id}:`, error);

  }

  if (!student) {
    return (
      <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="text-center text-gray-500">Student not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <UpdateStudent student={student} />
      </div>
    </section>
  );
};

export default UpdateStudentPage;