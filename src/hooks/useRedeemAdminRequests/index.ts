import { AdminRequestFunctionProps, ErrorResponseEndpointInterface, GetRedeemPointsInterface, TokenProp } from "@/types";

export function useRedeemAdminRequests() {
  const onDeleteRedeemPoint = async (values: AdminRequestFunctionProps): Promise<ErrorResponseEndpointInterface> => {
    const req = await fetch(`/api/redeem-points`, {
      method: "DELETE",
      body: JSON.stringify(values),
    });
    const res = await req.json();

    return res;
  };

  const getRedeemPoints = async (values: TokenProp): Promise<GetRedeemPointsInterface[]> => {
    const { token } = values;

    const req = await fetch(`/api/redeem-points`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    const res: GetRedeemPointsInterface[] = await req.json();
    return res;
  };

  const onChangeRedeemPoint = async (values: AdminRequestFunctionProps): Promise<ErrorResponseEndpointInterface> => {
    const req = await fetch(`/api/redeem-points`, {
      method: "PUT",
      body: JSON.stringify(values),
    });

    const res = await req.json();

    return res;
  };

  return {
    onDeleteRedeemPoint,
    getRedeemPoints,
    onChangeRedeemPoint,
  };
}
