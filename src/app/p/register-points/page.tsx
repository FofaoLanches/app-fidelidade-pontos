import { useServerSession } from "@/hooks";

import { ClientPage } from "./clientPage";

export default async function RegisterPage() {
  const session = await useServerSession();

  return <ClientPage session={session} />;
}
