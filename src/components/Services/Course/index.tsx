"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllCourse = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/course`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["COURSE"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllCoursesAccordingToStudentAcademicSession = async (id:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/course/student/${id}`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["COURSE"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const addCourse = async (courseData: any): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/course/create-course`,
      {
        method: "POST",
        body: JSON.stringify(courseData),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("COURSE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCourse = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/course/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    revalidateTag("COURSE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleCourse = async (id:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/course/${id}`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["COURSE"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateCourse = async (id: string, courseData: any): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/course/update-course/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(courseData),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("COURSE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};