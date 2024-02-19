import { isEmpty } from "lodash";
import { redirect } from "next/navigation";

import { useServerSession } from "@/hooks";

import { ClientPage } from "./clientPage";

export default async function Page() {
  const session = await useServerSession();

  if (!isEmpty(session)) {
    return redirect("/p/dashboard");
  }

  return <ClientPage />;
}
