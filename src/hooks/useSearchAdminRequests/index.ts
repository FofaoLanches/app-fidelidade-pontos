import { AdminRequestSearchFunctionProps, GetSearchRedeemRequestInterface, GetSearchRegistrationRequestInterface } from "@/types";

export function useSearchAdminRequests() {
  const onSearchRegistrationPoints = async (values: AdminRequestSearchFunctionProps): Promise<GetSearchRegistrationRequestInterface> => {
    const { phone_number, token } = values;

    const req = await fetch(`/api/search-registration?phone_number=${phone_number}`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });
    const res: GetSearchRegistrationRequestInterface = await req.json();

    return res;
  };

  const onSearchRedeemPoints = async (values: AdminRequestSearchFunctionProps): Promise<GetSearchRedeemRequestInterface> => {
    const { phone_number, token } = values;

    const req = await fetch(`/api/search-redeem?phone_number=${phone_number}`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });
    const res: GetSearchRedeemRequestInterface = await req.json();

    return res;
  };

  return {
    onSearchRegistrationPoints,
    onSearchRedeemPoints,
  };
}
