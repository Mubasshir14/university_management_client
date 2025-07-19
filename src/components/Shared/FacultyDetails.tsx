import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Faculty {
  id: string;
  designation: string;
  image?: string;
  name: string;
  gender: string;
  email: string;
  contactNo: string;
  bloodGroup: string;
  academicDepartment: {
    name: string;
  };
}

const FacultyDetails = ({ faculty }: { faculty: Faculty }) => {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-blue-600/10 to-purple-600/10 font-sansita ">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="bg-white/10 backdrop-blur-sm border border-gray-200/20 rounded-2xl shadow-2xl">
          <CardHeader className="flex flex-col items-center p-8 border-b border-gray-300/20">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-blue-600">
              <Image
                src={faculty.image || "/placeholder-avatar.png"}
                alt={faculty.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              {faculty.name}
            </h2>
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-bold text-sm mt-1">{faculty.designation}</p>
          </CardHeader>

          <CardContent className="p-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600space-y-4 text-sm sm:text-base">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-bold">
              <div>
                <strong className="">Faculty ID:</strong>{" "}
                {faculty.id}
              </div>
              <div>
                <strong className="">Email:</strong>{" "}
                {faculty.email}
              </div>
              <div>
                <strong className="">Contact No:</strong>{" "}
                {faculty.contactNo}
              </div>
              <div>
                <strong className="">Blood Group:</strong>{" "}
                {faculty.bloodGroup}
              </div>
              <div>
                <strong className=" capitalize">Gender:</strong>{" "}
                {faculty.gender}
              </div>
              <div>
                <strong className="">Department:</strong>{" "}
                {faculty.academicDepartment?.name || "N/A"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FacultyDetails;
