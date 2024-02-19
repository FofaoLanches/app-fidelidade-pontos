import { getEndpointBaseUrlClient } from "@/helpers";
import { useServerSession } from "@/hooks";
import { GetRankingInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function Page() {
  const session = await useServerSession();

  const req = await fetch(`${getEndpointBaseUrlClient()}/api/ranking?period=weekly`, {
    method: "GET",
  });

  const res: GetRankingInterface[] = await req.json();

  return <ClientPage session={session} users={res} />;
}
