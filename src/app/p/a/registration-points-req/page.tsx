import { isEmpty } from "lodash";

import { NotFound } from "@/components";
import { getEndpointBaseUrlClient } from "@/helpers";
import { useServerSession } from "@/hooks";
import { GetRegistrationPointsInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function Page() {
  const session = await useServerSession();

  const req = await fetch(`${getEndpointBaseUrlClient()}/api/registration-points`, {
    method: "GET",
    headers: {
      Authorization: `${session.user?.token}`,
    },
  });

  const registrations: GetRegistrationPointsInterface[] = await req.json();

  if (!isEmpty(registrations)) {
    return <ClientPage registrations={registrations} token={session.user?.token} />;
  }
  return <NotFound content="Não há cadastros neste momento!" />;
}
