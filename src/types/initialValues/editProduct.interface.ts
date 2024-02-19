import { GetProductsInterface } from "@/types";

export interface EditProductsInitialValuesInterface extends Omit<GetProductsInterface, "image_url"> {
  image: string;
}
