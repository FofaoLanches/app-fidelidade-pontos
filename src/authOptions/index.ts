import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { getEndpointBaseUrlAPIS } from "@/helpers";
import { ResponseLoginInterface, UserType } from "@/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) throw new Error("Dados de Login necessarios");

        const req = await fetch(`${getEndpointBaseUrlAPIS()}/auth/login`, {
          method: "POST",
          headers: {
            "api-key": process.env.API_KEY,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const res: ResponseLoginInterface = await req.json();

        if (res.token) {
          const user = { ...res.user, token: res.token };
          return user;
        }

        const hasInputInfo = credentials?.email && credentials?.password;

        if (hasInputInfo && res.token) {
          throw new Error("Erro ao logar!");
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt(data) {
      const { token, user } = data;
      const customUser = user as unknown as UserType;

      if (user) {
        return { ...customUser };
      }

      return token;
    },
    async session(data) {
      const { session, token } = data;

      session.user = token as any;
      const aux = token as any;

      return {
        ...session,
        error: token.error,
        user: {
          full_name: token.full_name,
          email: token.email,
          id: token.id,
          role: token.role,
          token: token.token,
          city: !!aux.Admin ? aux.Admin.city : "",
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
