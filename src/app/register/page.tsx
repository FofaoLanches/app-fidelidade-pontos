import { redirect } from "next/navigation";

import { useServerSession } from "@/hooks";

import { ClientPage } from "./clientPage";

export default async function Page() {
  const session = await useServerSession();

  if (session.user?.role === "ADMIN") {
    return redirect("/p/a/registration-points-req");
  } else if (session.user?.role === "CUSTOMER") {
    return redirect("/p/dashboard");
  }

  return <ClientPage />;
}
