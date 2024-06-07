import { getEndpointBaseUrlClient } from "@/helpers";
import { useServerSession } from "@/hooks";
import { useServerRedirect } from "@/hooks/useServerRedirect";
import { GetCustomerInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function RegisterPage() {
  const session = await useServerSession();
  await useServerRedirect();

  let customer = {} as GetCustomerInterface;

  const req = await fetch(`${getEndpointBaseUrlClient()}/api/customer?customer_id=${session.user?.id}`, {
    method: "GET",
    headers: {
      Authorization: `${session.user?.token}`,
    },
  });

  customer = await req.json();

  return <ClientPage session={session} customer={customer} />;
}
