import { isEmpty } from "lodash";
import { getServerSession, NextAuthOptions, Session } from "next-auth";

import { authOptions } from "@/authOptions";
import { UseServerSessionInterface } from "@/types";

export const useServerSession = async (): Promise<UseServerSessionInterface> => {
  const session = await getServerSession<NextAuthOptions, Session>(authOptions);

  if (!isEmpty(session)) {
    return {
      user: session?.user,
    };
  }

  return {};
};
