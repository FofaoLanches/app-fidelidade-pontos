import { AdminOrCustomerRoleType } from "next-auth";

export interface UserInterface {
  id: string;
  full_name: string;
  email: string;
  role: AdminOrCustomerRoleType;
  token: string;
}

export interface UseServerSessionInterface {
  user?: UserInterface | undefined;
}
