import { formatPhone } from "@/helpers";
import { ListContentRegistrationPointsInterface } from "@/types";

export const ListContentRegistrationPoints: React.FC<ListContentRegistrationPointsInterface> = (props) => {
  const { phone_number, status } = props;

  return (
    <div className="flex flex-col w-full">
      <p>Pedido com telefone: {formatPhone(phone_number)}</p>

      <div className="flex text-fontsColor-700 font-medium pt-1">
        <span>{status === "APPROVED" ? "APROVADO" : "PENDENTE"}</span>
      </div>
    </div>
  );
};
