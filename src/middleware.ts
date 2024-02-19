import { NextResponse } from "next/server";
import { NextAuthMiddlewareOptions, NextRequestWithAuth, withAuth } from "next-auth/middleware";

const middleware = (request: NextRequestWithAuth) => {
  const isPrivateAdminRoutes = request.nextUrl.pathname.startsWith("/p/a");
  const isAdminUser = request.nextauth.token?.role === "ADMIN";

  if (isPrivateAdminRoutes && !isAdminUser) {
    return NextResponse.rewrite(new URL("/p/dashboard", request.url));
  }

  if (isAdminUser && !isPrivateAdminRoutes) {
    return NextResponse.rewrite(new URL("/p/a/registration-points-req", request.url));
  }
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = {
  matcher: ["/p/:path*"],
};
