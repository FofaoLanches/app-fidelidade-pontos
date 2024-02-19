import { isEmpty } from "lodash";

import { LoadingPage, NotFound } from "@/components";
import { getEndpointBaseUrlClient } from "@/helpers";
import { useServerSession } from "@/hooks";
import { GetRedeemPointsInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function Page() {
  const session = await useServerSession();

  if (session.user?.token) {
    const req = await fetch(`${getEndpointBaseUrlClient()}/api/redeem-points`, {
      method: "GET",
      headers: {
        Authorization: `${session.user?.token}`,
      },
    });

    const res: GetRedeemPointsInterface[] = await req.json();

    if (!isEmpty(res)) {
      return <ClientPage registrations={res} token={session.user?.token} />;
    }

    return <NotFound content="Não há resgates neste momento!" />;
  }

  return <LoadingPage />;
}
