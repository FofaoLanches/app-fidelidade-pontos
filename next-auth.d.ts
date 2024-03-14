import NextAuth from "next-auth";

declare module "next-auth" {
  type AdminOrCustomerRoleType = "ADMIN" | "CUSTOMER";
  interface Session {
    user: {
      id: string;
      full_name: string;
      email: string;
      role: AdminOrCustomerRoleType;
      token: string;
      city?: string;
      whatsapp_session_active?: boolean;
    };
  }
}
