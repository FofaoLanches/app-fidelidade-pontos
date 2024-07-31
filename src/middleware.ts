import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextAuthMiddlewareOptions, NextRequestWithAuth, withAuth } from "next-auth/middleware";

const collaboratorPages = ["/p/dashboard", "/p/gotched-points", "/ranking", "/p/register-points"];

const middleware = async (request: NextRequestWithAuth) => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const allowedForAuthenticatedUsers = request.nextUrl.pathname.startsWith("/p");
  const notAllowedForCustomer = request.nextUrl.pathname.startsWith("/p/a");
  const notAllowedForAdminMapp = collaboratorPages.map((path) => {
    return request.nextUrl.pathname.startsWith(path);
  });
  const notAllowedForAdmin = notAllowedForAdminMapp.some((v) => v);

  const nextSession = await getToken({
    req: request,
  });

  if (nextSession?.token) {
    const auxSession = nextSession?.token as string;

    const token = jwtDecode(auxSession);

    const expirationDate = new Date(Number(token.exp) * 1000);
    const expirationDateTime = expirationDate.getTime();
    const validationDate = expirationDateTime - 3600000;

    const now = new Date().getTime();
    const teste = new Date(validationDate).getTime();

    if (teste - now < 0) {
      return NextResponse.rewrite(new URL("/logout", request.url));
    }
  }

  const isAdmin = request.nextauth.token?.role === "ADMIN";

  if (allowedForAuthenticatedUsers) {
    if (isAdmin && notAllowedForAdmin) {
      return NextResponse.rewrite(new URL("/p/a/registration-points-req", request.url));
    }

    if (!isAdmin && notAllowedForCustomer) {
      return NextResponse.rewrite(new URL("/p/dashboard", request.url));
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
