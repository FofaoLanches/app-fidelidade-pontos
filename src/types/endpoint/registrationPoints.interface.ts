import { PendindgOrApproveStatusType } from "@/types";

export interface GetRegistrationPointsInterface {
  id: string;
  phone_number: string;
  value_spent: number;
  status: PendindgOrApproveStatusType;
  approved_at: string;
  created_at: string;
  customer_id: string;
  customer: {
    user: {
      full_name: string | null;
    };
  };
}

export interface GetSearchRegistrationRequestInterface {
  total: number;
  results: GetRegistrationPointsInterface[];
}
