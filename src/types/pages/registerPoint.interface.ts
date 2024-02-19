import { GetCustomerInterface, UseServerSessionInterface } from "@/types";

export interface RegisterPointsInterface {
  customer?: GetCustomerInterface;
  session: UseServerSessionInterface;
}
