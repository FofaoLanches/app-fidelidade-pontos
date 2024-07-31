import { isEmpty } from "lodash";

import { NotFound } from "@/components";
import { getEndpointBaseUrlClient } from "@/helpers";
import { useServerSession } from "@/hooks";
import { GetRedeemPointsInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function Page() {
  const session = await useServerSession();

  try {
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
  } catch (error) {
    console.log(error);
  }

  return <NotFound content="Não há resgates neste momento!" />;
}
