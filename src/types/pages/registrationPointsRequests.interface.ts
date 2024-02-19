import { DeleteOrApproveRequestType, GetRegistrationPointsInterface, UserType } from "@/types";

export interface HandleRegistryPointModalInformationInterface extends GetRegistrationPointsInterface {
  requestType: DeleteOrApproveRequestType;
}

export type RegistrationPointsStateModalType = {
  isOpen: boolean;
  description: string;
  title: string;
  id: string;
  requestType: DeleteOrApproveRequestType;
};

export interface HandleApproveOrDeleteFuntionInterface {
  id: string;
  phone_number: string;
  setState: React.Dispatch<React.SetStateAction<RegistrationPointsStateModalType>>;
}

export interface RegistrationPointsRequestsInterface extends Partial<Pick<UserType, "token">> {
  registrations: GetRegistrationPointsInterface[];
}
