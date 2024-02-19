import {
  AdminRequestFunctionProps,
  EditProductPostRequestInterface,
  ErrorResponseEndpointInterface,
  RegisterProductPostRequestInterface,
} from "@/types";

export const useProducts = () => {
  const onRegisterProduct = async (values: RegisterProductPostRequestInterface): Promise<ErrorResponseEndpointInterface> => {
    const { amount_points, description, display_name, image, token } = values;
    const formData = new FormData();

    formData.append("display_name", display_name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("amount_points", `${amount_points}`);

    const req = await fetch("/api/products", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: formData,
    });

    const res = await req.json();

    return res;
  };

  const onDeleteProduct = async (values: AdminRequestFunctionProps): Promise<ErrorResponseEndpointInterface> => {
    const req = await fetch(`/api/products`, {
      method: "DELETE",
      body: JSON.stringify(values),
    });
    const res = await req.json();

    return res;
  };

  const onEditProduct = async (values: EditProductPostRequestInterface): Promise<ErrorResponseEndpointInterface> => {
    const { amount_points, description, display_name, image, token, id } = values;
    const formData = new FormData();

    formData.append("id", id);
    formData.append("display_name", display_name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("amount_points", `${amount_points}`);

    const req = await fetch("/api/products", {
      method: "PUT",
      headers: {
        Authorization: `${token}`,
      },
      body: formData,
    });

    const res = await req.json();

    return res;
  };

  return {
    onRegisterProduct,
    onDeleteProduct,
    onEditProduct,
  };
};
