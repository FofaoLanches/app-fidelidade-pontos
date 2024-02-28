import { ErrorResponseEndpointInterface } from "..";

export interface GetProductsInterface {
  id: string;
  display_name: string;
  description: string;
  image_url: string;
  amount_points: number;
}
export interface ReqProductWithUploadFieldInterface extends ErrorResponseEndpointInterface {
  data: {
    image_upload_url: string;
  };
}
