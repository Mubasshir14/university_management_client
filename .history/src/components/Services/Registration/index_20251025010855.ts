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

export const createRegistration = async (regData: any): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/create-registration`,
      {
        method: "POST",
        body: JSON.stringify(regData),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("REGISTRATION");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateAndDropCourseByStudent = async (regData: {
  studentId: string;
  academicSessionId: string;
  academicDepartmentId: string;
  courseIdsToDrop: string[];
}): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/drop-and-update-course-by-student`,
      {
        method: "PATCH",
        body: JSON.stringify(regData),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("REGISTRATION");
    return res.json();
  } catch (error: any) {
    console.log(error.message);
    return Error(error.message);
  }
};

export const updateAndDropCourseByAdmin = async (regData: {
  studentId: string;
  academicSessionId: string;
  academicDepartmentId: string;
  courseIdsToDrop: string[];
}): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/drop-and-update-course-by-admin`,
      {
        method: "PATCH",
        body: JSON.stringify(regData),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("REGISTRATION");
    return res.json();
  } catch (error: any) {
    console.log(error.message);
    return Error(error.message);
  }
};

export const getMyRegistrationInfo = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/my-registration-info`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({ id }),
        next: {
          tags: ["REGISTRATION"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleRegistration = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["REGISTRATION"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getStudentByCourse = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/get-student-according-to-course`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({ id }),
        next: {
          tags: ["REGISTRATION"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getNotApprovedRegisteredStudent = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/not-approved-registration`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["REGISTRATION"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getApprovedRegisteredStudent = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/approved-registration`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["REGISTRATION"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const makeRegistrationApproval = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/make-approval/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["REGISTRATION"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const makeManyRegistrationApproval = async (ids: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/registration/make-approval-many`,
      {
        method: "PATCH",
        body: JSON.stringify(ids),

        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["REGISTRATION"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
