"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllFaculty = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/faculty`, {
      method: "GET",
      next: {
        tags: ["FACULTY"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleFaculty = async (facultyId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/faculty/${facultyId}`,
      {
        method: "GET",
        next: {
          tags: ["FACULTY"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const addFaculty = async (deptData: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/faculty/create-faculty`,
      {
        method: "POST",
        body: deptData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("FACULTY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};