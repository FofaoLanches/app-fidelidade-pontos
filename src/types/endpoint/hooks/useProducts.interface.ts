import { EditProductsInitialValuesInterface, NewProductsInitialValuesInterface, TokenProp } from "@/types";

export interface EditProductPostRequestInterface extends EditProductsInitialValuesInterface, TokenProp {}

export interface RegisterProductPostRequestInterface extends NewProductsInitialValuesInterface, TokenProp {}
