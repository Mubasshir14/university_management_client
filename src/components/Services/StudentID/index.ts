/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllStudentID = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/studentId`, {
      method: "GET",

      next: {
        tags: ["StudentID"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleStudentID = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/studentID/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["StudentID"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const addStudentID = async (studentData: any): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/studentID`,
      {
        method: "POST",
        body: JSON.stringify(studentData),   
        headers: {
          "Content-Type": "application/json", 
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("StudentID");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
