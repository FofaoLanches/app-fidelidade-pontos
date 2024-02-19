import { DeleteOrApproveRequestType, GetRedeemPointsInterface, UserType } from "@/types";

export interface HandleRedeemPointModalInformationInterface extends GetRedeemPointsInterface {
  requestType: DeleteOrApproveRequestType;
}

export type RedeemPointsStateModalType = {
  isOpen: boolean;
  description: string;
  title: string;
  id: string;
  requestType: DeleteOrApproveRequestType;
};

export interface RedeemPointsHandleApproveOrDeleteFuntionInterface {
  id: string;
  full_name: string;
  setState: React.Dispatch<React.SetStateAction<RedeemPointsStateModalType>>;
}

export interface RedeemPointsRequestsInterface extends Partial<Pick<UserType, "token">> {
  registrations: GetRedeemPointsInterface[];
}
