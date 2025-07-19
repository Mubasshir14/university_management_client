"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAAllStudent = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/student`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["STUDENT"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getNotApprovedStudent = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/student/not-approved-student`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["STUDENT"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getApprovedStudent = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/student/approved-student`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["STUDENT"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSinglStudent = async (studentId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/student/${studentId}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["STUDENT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getMeAsStudentData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/student/get-me-as-a-student`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["STUDENT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const addStudent = async (stuData: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/create-student`,
      {
        method: "POST",
        body: stuData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("STUDENT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};