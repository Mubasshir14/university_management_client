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

export const getAllStudentResults = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/result`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },

      next: {
        tags: ["RESULT"],
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getMyResult = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/result/my-result`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({ id }),
        next: {
          tags: ["RESULT"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
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
        next: {
          tags: ["RESULT"],
        },
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
