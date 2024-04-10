import { InitialValuesListProductsInterface, PendindgOrApproveStatusType } from "@/types";

interface Product {
  id: string;
  display_name: string;
}

interface User {
  full_name: string;
  email: string;
}
interface Customer {
  phone_number: string;
  user: User;
}

type CutInitialValuesListProductsInterface = Pick<InitialValuesListProductsInterface, "redeem_mode" | "redeem_time">;
export interface GetRedeemPointsInterface extends Partial<CutInitialValuesListProductsInterface> {
  id: string;
  points: number;
  status: PendindgOrApproveStatusType;
  approved_at: string;
  created_at: string;
  customer_id: string;
  products: Product[];
  quantity_of_products: number;
  customer: Customer;
}

export interface GetSearchRedeemRequestInterface {
  total: number;
  results: GetRedeemPointsInterface[];
}
