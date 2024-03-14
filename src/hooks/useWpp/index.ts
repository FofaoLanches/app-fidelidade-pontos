import { TokenProp } from "@/types";

export const useWpp = () => {
  async function getQrCode(value: TokenProp) {
    const { token } = value;
    const req = await fetch(`/api/whatsapp`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    const res = await req.json();
    return res;
  }

  return {
    getQrCode,
  };
};
