"use client";
import { isValidPhone } from "@brazilian-utils/brazilian-utils";
import { isEmpty } from "lodash";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMinus } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { GrRevert } from "react-icons/gr";
import { ImConfused } from "react-icons/im";
import { twMerge } from "tailwind-merge";

import { Button, Container, FilterInputForPhoneNumber, GenericModal, List, LoadingPage } from "@/components";
import { formatPhone } from "@/helpers";
import { useRegistrationAdminRequest, useSearchAdminRequests } from "@/hooks";
import {
  GetRegistrationPointsInterface,
  GetSearchRegistrationRequestInterface,
  HandleRegistryPointModalInformationInterface,
  RegistrationPointsRequestsInterface,
  RegistrationPointsStateModalType,
} from "@/types";

export const ClientPage: React.FC<RegistrationPointsRequestsInterface> = (props) => {
  const { registrations, token } = props;
  const { onChangeRegistrationPoint, onDeleteRegistrationPoint, getRegistrationPoints } = useRegistrationAdminRequest();
  const { onSearchRegistrationPoints } = useSearchAdminRequests();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientRegistrations, setClientRegistrations] = useState<GetRegistrationPointsInterface[]>(registrations);

  const [searchPhoneNumber, setSearchPhoneNumber] = useState<string>("");
  const [stateModal, setStateModal] = useState<RegistrationPointsStateModalType>({
    isOpen: false,
    description: "",
    title: "",
    id: "",
    requestType: "APPROVE",
  });

  const handleSearch = async (phone_number: string) => {
    setIsLoading(true);
    const res: GetSearchRegistrationRequestInterface = await onSearchRegistrationPoints({ phone_number, token });
    setClientRegistrations(res.results);
    setIsLoading(false);
  };

  const handleClose = () => setStateModal((s) => ({ ...s, isOpen: false }));

  const refreshRegistrationRequests = async () => {
    setClientRegistrations(await getRegistrationPoints({ token }));
    setSearchPhoneNumber("");
  };

  const handleModalInformation = (values: HandleRegistryPointModalInformationInterface) => {
    const { id, phone_number, requestType } = values;

    if (requestType === "APPROVE") {
      setStateModal((s) => ({
        ...s,
        description: `Deseja aprovar o pedido ${id}?`,
      }));
    }
    if (requestType === "COMEBACK") {
      setStateModal((s) => ({
        ...s,
        description: `O pedido com id ${id} será revertido os pontos da conta do cliente ${phone_number} serão anulados. Deseja continuar?`,
      }));
    }
    if (requestType === "DELETE") {
      setStateModal((s) => ({
        ...s,
        description: `O pedido com id ${id} será excluido. Deseja continuar?`,
      }));
    }

    setStateModal((s) => ({
      ...s,
      isOpen: true,
      requestType,
      title: `Pedido do telefone ${formatPhone(phone_number)}`,
      id,
    }));
  };

  const handlePointRequest = async () => {
    try {
      setIsLoading(true);
      const { id, requestType } = stateModal;
      const isDeleteClick = requestType === "DELETE";
      let promise = null;

      if (isDeleteClick) {
        promise = onDeleteRegistrationPoint({ requestId: id, token });
      } else {
        promise = onChangeRegistrationPoint({ requestId: id, token });
      }

      await toast.promise(promise, {
        loading: "Processando...",
        error: "Ocorreu um problema!",
        success: "Ação efetuada com sucesso!",
      });

      await refreshRegistrationRequests();

      return setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();

      return setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <GenericModal
        isOpen={stateModal.isOpen}
        handleClose={handleClose}
        title={stateModal.title}
        description={stateModal.description}
        icon={<FaQuestion size="30" />}
        handleClickButtonLeft={handlePointRequest}
        handleClickButtonRight={handleClose}
        messageButtonLeft="SIM"
        messageButtonRight="NÃO"
      />

      <Container className="overflow-y-hidden px-[2%] lg:px-[10%] lg:pt-10">
        <div className="flex flex-col lg:flex-row gap-2 justify-between w-full">
          <h1 className="text-2xl text-center lg:text-start font-extrabold text-fontsColor-800 my-4 lg:mb-0">Cadastro de Pontos</h1>
          <div className="flex items-end gap-2">
            <FilterInputForPhoneNumber
              value={searchPhoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                setSearchPhoneNumber(formatPhone(value));

                if (!value) setClientRegistrations(registrations);

                if (isValidPhone(value)) handleSearch(value);
              }}
            />
            <Button
              variant="button"
              hasType={false}
              className="self-end bg-transparent border border-black shadow-none max-w-[50px]"
              onClick={refreshRegistrationRequests}
            >
              <FaArrowRotateLeft size="10" />
            </Button>
          </div>
        </div>

        {!isEmpty(clientRegistrations) && (
          <List.Root className={twMerge(clientRegistrations.length > 4 && "overflow-y-scroll pr-2 hide-scrollbar")}>
            {!isLoading &&
              clientRegistrations.map((reg) => {
                let { id, phone_number, status, value_spent } = reg;
                const isPending = status === "PENDING";

                return (
                  <List.Item key={`${id}-${phone_number}`}>
                    <List.LeftSign className={twMerge(isPending ? "border-yellow-600" : "border-green-600")} />
                    <List.Point>{value_spent} pts</List.Point>
                    <List.ContentRegistrationPoints {...reg} />

                    <List.IconButtonRoot>
                      <List.IconButton
                        isVisible={isPending}
                        icon={BiLike}
                        iconClassName="text-white"
                        isLoading={isLoading}
                        onClick={() => handleModalInformation({ ...reg, requestType: "APPROVE" })}
                        className={twMerge("bg-green-700", isPending && "hover:bg-green-800")}
                      />
                      <List.IconButton
                        isVisible={!isPending}
                        icon={GrRevert}
                        iconClassName="text-white"
                        isLoading={isLoading}
                        onClick={() => handleModalInformation({ ...reg, requestType: "COMEBACK" })}
                        className={twMerge("bg-sky-700", false && "hover:bg-sky-800")}
                      />
                      <List.IconButton
                        isVisible={isPending}
                        icon={BiDislike}
                        iconClassName="text-white"
                        isLoading={isLoading}
                        onClick={() => handleModalInformation({ ...reg, requestType: "DELETE" })}
                        className={twMerge("bg-red-500", isPending && "hover:bg-red-800")}
                      />
                    </List.IconButtonRoot>
                    <List.Animation show={isPending} icon={AiOutlineMinus} />
                  </List.Item>
                );
              })}
          </List.Root>
        )}
        {isEmpty(clientRegistrations) && (
          <div className="flex flex-col justify-center items-center gap-1">
            <span className="text-lg font-semibold">Nenhum registro encontrado!</span>
            <ImConfused size="30px" className="text-ternary-500 animate-pulse" />
          </div>
        )}

        {isLoading && <LoadingPage />}
      </Container>
    </Fragment>
  );
};
