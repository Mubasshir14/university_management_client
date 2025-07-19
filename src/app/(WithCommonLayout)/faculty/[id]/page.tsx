import { getSingleFaculty } from "@/components/Services/Faculty";
import FacultyDetails from "@/components/Shared/FacultyDetails";
import React from "react";

const FacultyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: faculty } = await getSingleFaculty(id);
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <FacultyDetails faculty={faculty} />
      </div>
    </section>
  );
};

export default FacultyDetailsPage;
