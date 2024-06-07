import { formatPhone } from "@/helpers";
import { ListContentRegistrationPointsInterface } from "@/types";

export const ListContentRegistrationPoints: React.FC<ListContentRegistrationPointsInterface> = (props) => {
  const { phone_number, status, customer } = props;

  const fullName = !!customer.user?.full_name ? customer.user?.full_name : "Não informado";

  return (
    <div className="flex flex-col w-full">
      <p>Pedido com telefone: {formatPhone(phone_number)}</p>
      <p>Usuário: {fullName}</p>

      <div className="flex text-fontsColor-700 font-medium pt-1">
        <span>{status === "APPROVED" ? "APROVADO" : "PENDENTE"}</span>
      </div>
    </div>
  );
};
