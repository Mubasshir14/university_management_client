// import UpdateCourse from "@/components/DashboardComponents/UpdateCourse";
// import { getSingleCourse } from "@/components/Services/Course";
// import React from "react";

// const UpdateCoursePage = async ({ params }: { params: { id: string } }) => {
//   const { id } = await params;
//   const { data: course } = await getSingleCourse(id);
//   return (
//     <div>
//       <UpdateCourse course={course} />
//     </div>
//   );
// };

// export default UpdateCoursePage;

import UpdateCourse from "@/components/DashboardComponents/UpdateCourse";
import { getSingleCourse } from "@/components/Services/Course";
import React from "react";

interface UpdateCoursePageProps {
  params: Promise<{ id: string }>;
}

const UpdateCoursePage: React.FC<UpdateCoursePageProps> = async ({
  params,
}) => {
  const { id } = await params;
  let course = null;

  try {
    const { data } = await getSingleCourse(id);
    course = data;
  } catch (error) {
    console.error(`Failed to fetch course with ID ${id}:`, error);
    // Optionally render a fallback UI here, e.g., <NotFound /> or error boundary
  }

  if (!course) {
    // Render a loading or error state
    return (
      <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="text-center text-gray-500">Course not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <UpdateCourse course={course} />
      </div>
    </section>
  );
};

export default UpdateCoursePage;