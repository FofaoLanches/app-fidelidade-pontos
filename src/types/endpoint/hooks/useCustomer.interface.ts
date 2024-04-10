import { InitialValuesListProductsInterface, TokenProp, UserType } from "@/types";

export interface GetCustomerInterface {
  id: string;
  phone_number: string;
  amount_points: number;
  user_id: string;
  user: UserType;
}

export interface RedeemPointPostRequestInterface extends InitialValuesListProductsInterface, TokenProp {}

export interface SendPhoneVerificationCodeRequestInterface {
  phone_number: string;
}
