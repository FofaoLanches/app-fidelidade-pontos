import { uniqueId } from "lodash";
import { Fragment } from "react";

import { formatPhone } from "@/helpers";
import { ListContentRedeemPointsRegistrationInterface } from "@/types";

export const ListContentRedeemPointsRegistration: React.FC<ListContentRedeemPointsRegistrationInterface> = (props) => {
  const {
    id,
    customer: {
      user: { full_name },
      phone_number,
    },
    quantity_of_products,
    products,
  } = props;
  const productsLength = products.length;

  return (
    <div className="flex flex-col w-full">
      <p>Cliente: {full_name}</p>
      <p>Pedido com telefone: {formatPhone(phone_number)}</p>

      {productsLength === quantity_of_products && (
        <ul className="flex">
          <p className="mr-1">{`${productsLength === 1 ? "Produto" : "Produtos"}:`}</p>
          {products.map((product, index) => {
            const isLastIndex = index === productsLength - 1;

            return (
              <Fragment key={`${product.id}-${uniqueId()}`}>
                <li>{`${product.display_name}`}</li>
                {isLastIndex ? null : <span className="mr-1">,</span>}
              </Fragment>
            );
          })}
        </ul>
      )}
    </div>
  );
};
