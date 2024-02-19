import { GetProductsInterface } from "@/types";

export interface NewProductsInitialValuesInterface extends Omit<GetProductsInterface, "image_url" | "id"> {
  image: string;
}
