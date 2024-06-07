import Link from "next/link";

import { Container, GoBack } from "@/components";
import { getEndpointBaseUrlClient } from "@/helpers";
import { useServerSession } from "@/hooks";
import { GetCustomerInterface, GetProductsInterface } from "@/types";

import { ClientPage } from "./clientPage";

export default async function Page() {
  const session = await useServerSession();

  let customer = {} as GetCustomerInterface;
  let products = [] as GetProductsInterface[];

  if (session.user?.token) {
    const req_customer = fetch(`${getEndpointBaseUrlClient()}/api/customer?customer_id=${session.user?.id}`, {
      method: "GET",
      headers: {
        Authorization: `${session.user?.token}`,
      },
    });
    const req_products = fetch(`${getEndpointBaseUrlClient()}/api/products`, {
      method: "GET",
      headers: {
        Authorization: `${session.user?.token}`,
      },
    });

    const requests = await Promise.all([req_customer, req_products]);
    const responses = await Promise.all(requests.map(async (a) => await a.json()));

    customer = responses[0];
    products = responses[1];
  }

  return (
    <Container className="gap-2 pb-[10%]">
      <div className="p-6">
        <GoBack />
      </div>
      <div className="flex flex-col items-center justify-center gap-1 h-full lg:px-[10%]">
        <div className="flex justify-center items-center w-[125px] h-[125px] rounded-[50%] bg-ternary-200">
          <h3 className="text-5xl font-bold text-fontsColor-100">{customer.amount_points}</h3>
        </div>
        <h3 className="text-xl font-extrabold text-fontsColor-800 mb-6">
          {customer.amount_points > 0 ? "Seus Pontos" : "Você não possui pontos"}
        </h3>
        {customer.amount_points === 0 && (
          <Link className="bg-ternary-900 p-2 rounded-md text-fontsColor-100 mb-6" href="/p/register-points">
            Cadastrar agora
          </Link>
        )}
        <ClientPage products={products} token={session.user?.token} />
      </div>
    </Container>
  );
}
