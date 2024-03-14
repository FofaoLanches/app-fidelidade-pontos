import { ErrorResponseEndpointInterface, UserType } from "@/types";

export interface ResponseLoginInterface extends ErrorResponseEndpointInterface {
  user?: UserType;
  token?: string;
  whatsapp_session_active?: boolean;
}
