import { LoadingPage } from "@/components";
import { getEndpointBaseUrlClient } from "@/helpers";
import { useServerSession } from "@/hooks";
import { GetProductsInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function Page() {
  const session = await useServerSession();

  if (session.user?.token) {
    try {
      const req = await fetch(`${getEndpointBaseUrlClient()}/api/products`, {
        method: "GET",
        headers: {
          Authorization: `${session.user?.token}`,
        },
      });

      const res: GetProductsInterface[] = await req.json();

      return <ClientPage products={res} token={session.user?.token} />;
    } catch (error) {
      console.log("🚀 ~ Page ~ error:", error);
    }
  }

  return <LoadingPage />;
}
