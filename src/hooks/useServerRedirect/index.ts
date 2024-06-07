import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession, NextAuthOptions, Session } from "next-auth";

import { authOptions } from "@/authOptions";

export const useServerRedirect = async () => {
  "use server";
  const headersList = headers();
  const header_url = headersList.get("x-url") || null;
  const pathname = headersList.get("next-url") || null;
  const referer = process.env.NODE_ENV === "development" ? process.env.BASEURL_API_DEV_CLIENT : process.env.BASEURL_API_PRD_CLIENT;
  const dashBoardPath = header_url?.split(referer)[1];

  const session = await getServerSession<NextAuthOptions, Session>(authOptions);

  if (session !== null) {
    const isAdmin = session?.user.role === "ADMIN";
    const notAllowedForAuthenticated = pathname === "/" || pathname === "/register";
    const notAllowedForAdmin = pathname === "/register-points" || pathname === "/p/dashboard" || dashBoardPath === "/p/dashboard";

    if (notAllowedForAuthenticated) {
      if (isAdmin) {
        return redirect("/p/a/registration-points-req");
      }

      return redirect("/p/dashboard");
    } else if (isAdmin && notAllowedForAdmin) {
      return redirect("/p/a/registration-points-req");
    }
  }
};
