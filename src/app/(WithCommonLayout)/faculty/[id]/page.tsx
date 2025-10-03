// import { getSingleFaculty } from "@/components/Services/Faculty";
// import FacultyDetails from "@/components/Shared/FacultyDetails";
// import React from "react";

// const FacultyDetailsPage = async ({ params }: { params: { id: string } }) => {
//   const { id } = await params;
//   const { data: faculty } = await getSingleFaculty(id);
//   return (
//     <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
//         <FacultyDetails faculty={faculty} />
//       </div>
//     </section>
//   );
// };

// export default FacultyDetailsPage;

import { getSingleFaculty } from "@/components/Services/Faculty";
import FacultyDetails from "@/components/Shared/FacultyDetails";
import React from "react";

interface FacultyDetailsPageProps {
  params: Promise<{ id: string }>;
}

const FacultyDetailsPage: React.FC<FacultyDetailsPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  let faculty = null;

  try {
    const { data } = await getSingleFaculty(id);
    faculty = data;
  } catch (error) {
    console.error(`Failed to fetch faculty with ID ${id}:`, error);
    // Optionally render a fallback UI here, e.g., <NotFound /> or error boundary
  }

  if (!faculty) {
    // Render a loading or error state
    return (
      <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="text-center text-gray-500">Faculty not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/10 to-purple-50/05 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <FacultyDetails faculty={faculty} />
      </div>
    </section>
  );
};

export default FacultyDetailsPage;