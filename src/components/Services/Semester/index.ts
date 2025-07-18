/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addSemester = async (semesterData: any): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/academic-semester/create-academic-semester`,
      {
        method: "POST",
        body: JSON.stringify(semesterData),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("SEMESTER");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
