export type RedeemModeType = "TAKEAWAY" | "DINE_IN";
export interface InitialValuesListProductsInterface {
  redeem_time: string;
  redeem_mode: RedeemModeType;
  product_ids: string[];
}
