import UpdateIndividualCourseByAdmin from '@/components/DashboardComponents/UpdateIndividualCourseByAdmin';
import { getSingleRegistration } from '@/components/Services/Registration';
import React from 'react';

const CourseDropByAdminPageDetails = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  const { data: registration } = await getSingleRegistration(id);

  return (
    <section className="bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <UpdateIndividualCourseByAdmin registration={registration} />
      </div>
    </section>
  );
};
export default CourseDropByAdminPageDetails;