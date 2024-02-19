import { getEndpointBaseUrlClient } from "@/helpers";
import { useServerSession } from "@/hooks";
import { GetCustomerInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function Page() {
  const session = await useServerSession();

  let customer = {} as GetCustomerInterface;

  if (session.user?.token) {
    const req = await fetch(`${getEndpointBaseUrlClient()}/api/customer?customer_id=${session.user?.id}`, {
      method: "GET",
      headers: {
        Authorization: `${session.user?.token}`,
      },
    });

    customer = await req.json();
  }

  return <ClientPage session={session} customer={customer} />;
}
