import { useServerRedirect } from "@/hooks/useServerRedirect";

import { ClientPage } from "./clientPage";

export default async function LoginPage() {
  await useServerRedirect();
  return <ClientPage />;
}
