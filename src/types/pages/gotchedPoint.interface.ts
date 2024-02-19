import { GetProductsInterface, UserType } from "@/types";

export interface GotchedPointClientPageInterface extends Partial<Pick<UserType, "token">> {
  products: GetProductsInterface[];
}
