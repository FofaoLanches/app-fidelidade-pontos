import { GetProductsInterface, TokenProp } from "@/types";

export interface ProductsClientPageInterface extends TokenProp {
  products: GetProductsInterface[];
}

export interface EditProductIdPageInterface {
  params: { productId: string };
  searchParams: { productId: string };
}

export interface EditProductIdClientPageInterface extends TokenProp {
  product: GetProductsInterface | undefined;
}
