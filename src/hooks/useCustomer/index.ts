import {
  ErrorResponseEndpointInterface,
  RedeemPointPostRequestInterface,
  RegisterPointsInitialValuesInterface,
  RegisterUserInitialValuesInterface,
  SendPhoneVerificationCodeRequestInterface,
} from "@/types";

export function useCustomer() {
  const sendPhoneVerificationCode = async (values: SendPhoneVerificationCodeRequestInterface): Promise<ErrorResponseEndpointInterface> => {
    const req = await fetch("/api/send-phone-verification-code", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const res = await req.json();

    return res;
  };

  const onRegister = async (
    values: Omit<RegisterUserInitialValuesInterface, "confirm_password">,
  ): Promise<ErrorResponseEndpointInterface> => {
    const req = await fetch("/api/register-customer", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const res = await req.json();

    return res;
  };

  const onRedeemPoint = async (value: RedeemPointPostRequestInterface): Promise<ErrorResponseEndpointInterface> => {
    const { token, ...rest } = value;

    const req = await fetch("/api/redeem-points", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: JSON.stringify(rest),
    });

    const res = await req.json();

    return res;
  };

  const onRegistrationPoint = async (value: RegisterPointsInitialValuesInterface): Promise<ErrorResponseEndpointInterface> => {
    const req = await fetch("/api/registration-points", {
      method: "POST",
      body: JSON.stringify(value),
    });

    const res = await req.json();

    return res;
  };

  return {
    onRegister,
    onRedeemPoint,
    onRegistrationPoint,
    sendPhoneVerificationCode,
  };
}
