import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./components/Services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  admin: [/^\/admin(\/|$)/],
   user: [/^\/user(\/|$)/, /^\/get-admit(\/|$)/],
  student: [/^\/student(\/|$)/],
  advisor: [/^\/advisor(\/|$)/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `https://university-management-client.vercel.app/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/user",
    "/get-admit",
    "/student",
    "/admin",
    "/user/:path*",
    "/student/:path*",
    "/admin/:path*",
  ],
};
