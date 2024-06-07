import { NextResponse } from "next/server";
import { NextAuthMiddlewareOptions, NextRequestWithAuth, withAuth } from "next-auth/middleware";

const collaboratorPages = ["/p/dashboard", "/p/gotched-points", "/ranking", "/p/register-points"];

const middleware = (request: NextRequestWithAuth) => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const allowedForAuthenticatedUsers = request.nextUrl.pathname.startsWith("/p");
  const allowedForAdmin = request.nextUrl.pathname.startsWith("/p/a");
  const notAllowedForAdmin = collaboratorPages
    .map((path) => {
      return request.nextUrl.pathname.startsWith(path);
    })
    .some((v) => v);

  const isAdmin = request.nextauth.token?.role === "ADMIN";

  if (isAdmin && allowedForAuthenticatedUsers) {
    if (notAllowedForAdmin) {
      return NextResponse.rewrite(new URL("/p/a/registration-points-req", request.url));
    }

    if (allowedForAdmin) {
      return NextResponse.next();
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = {
  matcher: ["/p/:path*"],
};
