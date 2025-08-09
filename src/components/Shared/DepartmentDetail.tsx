"use client";

import Image from "next/image";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FacultyMember {
  _id: string;
  name: string;
  designation: string;
  image?: string;
}

interface Department {
  _id: string;
  name: string;
  shortName: string;
  image: string;
  faculty: FacultyMember[];
  createdAt: string;
  updatedAt: string;
}

const DepartmentDetail = ({ department }: { department: Department }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg overflow-hidden font-sansita">
      <CardHeader className="relative h-64">
        <Image
          src={department?.image || "/fallback-department.jpg"}
          alt={department?.name}
          fill
          className="object-cover object-center"
        />
      </CardHeader>

      <CardContent className="p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            {department?.name}
          </h1>
          <h2 className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 pl-4 mt-1">{department?.shortName}</h2>
        </div>

        <div className="border-t border-gray-600/30 pt-6 space-y-4">
          <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Faculty Members</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {department?.faculty && department?.faculty?.length > 0 ? (
              department?.faculty.map((fac) => (
                <div
                  key={fac._id}
                  className="flex items-center bg-white/5 backdrop-blur-md p-4 rounded-lg shadow-inner border-2 border-blue-400/50"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/50 mr-4">
                    <Image
                      src={fac?.image || "/placeholder-avatar.png"}
                      alt={fac?.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-medium">{fac.name}</p>
                    <Badge className="mt-1 bg-blue-600/80 text-xs">
                      {fac?.designation || "Faculty"}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No faculty data available.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentDetail;
