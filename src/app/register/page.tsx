import { useServerRedirect } from "@/hooks/useServerRedirect";

import { ClientPage } from "./clientPage";

export default async function Page() {
  await useServerRedirect();
  return <ClientPage />;
}
