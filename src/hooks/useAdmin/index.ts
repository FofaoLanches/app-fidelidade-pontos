import { AdminRequestFunctionProps, ErrorResponseEndpointInterface, GetRegistrationPointsInterface, TokenProp } from "@/types";

export function useRegistrationAdminRequest() {
  const onChangeRegistrationPoint = async (values: AdminRequestFunctionProps): Promise<ErrorResponseEndpointInterface> => {
    const req = await fetch(`/api/registration-points`, {
      method: "PUT",
      body: JSON.stringify(values),
    });

    const res = await req.json();

    return res;
  };

  const onDeleteRegistrationPoint = async (values: AdminRequestFunctionProps): Promise<ErrorResponseEndpointInterface> => {
    const req = await fetch(`/api/registration-points`, {
      method: "DELETE",
      body: JSON.stringify(values),
    });
    const res = await req.json();

    return res;
  };

  const getRegistrationPoints = async (values: TokenProp): Promise<GetRegistrationPointsInterface[]> => {
    const { token } = values;

    const req = await fetch(`/api/registration-points`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    const res: GetRegistrationPointsInterface[] = await req.json();

    return res;
  };

  return {
    onChangeRegistrationPoint,
    onDeleteRegistrationPoint,
    getRegistrationPoints,
  };
}
