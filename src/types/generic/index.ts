import { Session as NextSession } from "next-auth";
import { ReactNode } from "react";

export type AdminOrCustomerRoleType = "ADMIN" | "CUSTOMER";
export type PendindgOrApproveStatusType = "PENDING" | "APPROVED";
export type DeleteOrApproveRequestType = "DELETE" | "APPROVE" | "COMEBACK";
export type TokenProp = { token?: string };
export interface SomeChildInterface {
  children: ReactNode;
}

export interface Session {
  user: UserType;
}

export interface NextLayoutComponentInterface extends SomeChildInterface {
  session: NextSession;
}

export interface NextPageComponentInterface {
  params: unknown;
  searchParams: undefined;
}

export type UserType = TokenProp & {
  id: string;
  full_name: string;
  email: string;
  role: AdminOrCustomerRoleType;
  created_at: string;
  Admin?: {
    user_id: string;
    phone_number: string;
    city: string;
  };
};

export interface ErrorResponseEndpointInterface {
  success?: boolean;
  message?: string;
}
