// import UpdateIndividualCourseByAdmin from '@/components/DashboardComponents/UpdateIndividualCourseByAdmin';
// import { getSingleRegistration } from '@/components/Services/Registration';
// import React from 'react';

// const CourseDropByAdminPageDetails = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   const { id } = await params;
//   const { data: registration } = await getSingleRegistration(id);

//   return (
//     <section className="bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
//         <UpdateIndividualCourseByAdmin registration={registration} />
//       </div>
//     </section>
//   );
// };
// export default CourseDropByAdminPageDetails;
import UpdateIndividualCourseByAdmin from '@/components/DashboardComponents/UpdateIndividualCourseByAdmin';
import { getSingleRegistration } from '@/components/Services/Registration';
import React from 'react';

interface CourseDropByAdminPageDetailsProps {
  params: Promise<{ id: string }>;
}

const CourseDropByAdminPageDetails: React.FC<CourseDropByAdminPageDetailsProps> = async ({
  params,
}) => {
  const { id } = await params;
  let registration = null;

  try {
    const { data } = await getSingleRegistration(id);
    registration = data;
  } catch (error) {
    console.error(`Failed to fetch registration with ID ${id}:`, error);
    // Optionally render a fallback UI here, e.g., <NotFound /> or error boundary
  }

  if (!registration) {
    // Render a loading or error state
    return (
      <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="text-center text-gray-500">Registration not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <UpdateIndividualCourseByAdmin registration={registration} />
      </div>
    </section>
  );
};

export default CourseDropByAdminPageDetails;