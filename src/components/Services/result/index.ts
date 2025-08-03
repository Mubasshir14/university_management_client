/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";


type CourseMarks = {
  courseId: string;
  midTerm1: number;
  midTerm2: number;
  finalTerm: number;
  total: number;
};

type StudentResult = {
  registration: string;
  student: any;
  coursesMarks: CourseMarks[];
  averageMarks: number;
  avgGrade: string;
  avgGradePoints: number;
};

export const generateStudentResult = async (
  registrationId: string,
  coursesMarks: any
): Promise<StudentResult> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("Authentication token not found. Please log in.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/result/generate/${registrationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(coursesMarks),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to generate result");
    }

    return data;
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while generating the result"
    );
  }
};
