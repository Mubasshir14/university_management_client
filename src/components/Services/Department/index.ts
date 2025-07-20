/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllDepartment = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/department`,
      {
        method: "GET",
        // headers: {
        //   Authorization: (await cookies()).get("accessToken")!.value,
        // },
        next: {
          tags: ["DEPARTMENT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleDepartment = async (departmentId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/department/${departmentId}`,
      {
        method: "GET",
        // headers: {
        //   Authorization: (await cookies()).get("accessToken")!.value,
        // },
        next: {
          tags: ["DEPARTMENT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};


export const addDepartment = async (deptData: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/department/create-academic-department`,
      {
        method: "POST",
        body: deptData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("DEPARTMENT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
