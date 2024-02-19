"use client";
import { isValidPhone } from "@brazilian-utils/brazilian-utils";
import { isEmpty, uniqueId } from "lodash";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMinus } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { GrRevert } from "react-icons/gr";
import { ImConfused } from "react-icons/im";
import { twMerge } from "tailwind-merge";

import { Button, Container, FilterInputForPhoneNumber, GenericModal, List, LoadingPage } from "@/components";
import { formatPhone } from "@/helpers";
import { useRedeemAdminRequests, useSearchAdminRequests } from "@/hooks";
import {
  GetRedeemPointsInterface,
  GetSearchRedeemRequestInterface,
  HandleRedeemPointModalInformationInterface,
  RedeemPointsRequestsInterface,
  RedeemPointsStateModalType,
} from "@/types";

export const ClientPage: React.FC<RedeemPointsRequestsInterface> = (props) => {
  const { registrations, token } = props;
  const { onDeleteRedeemPoint, getRedeemPoints, onChangeRedeemPoint } = useRedeemAdminRequests();
  const { onSearchRedeemPoints } = useSearchAdminRequests();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientRegistrations, setClientRegistrations] = useState<GetRedeemPointsInterface[]>(registrations);
  const [searchPhoneNumber, setSearchPhoneNumber] = useState<string>("");
  const [stateModal, setStateModal] = useState<RedeemPointsStateModalType>({
    isOpen: false,
    description: "",
    title: "",
    id: "",
    requestType: "APPROVE",
  });

  const handleSearch = async (phone_number: string) => {
    setIsLoading(true);
    const res: GetSearchRedeemRequestInterface = await onSearchRedeemPoints({ phone_number, token });
    setClientRegistrations(res.results);
    setIsLoading(false);
  };

  const handleClose = () => setStateModal((s) => ({ ...s, isOpen: false }));

  const refreshRedeemRequests = async () => {
    setClientRegistrations(await getRedeemPoints({ token }));
    setSearchPhoneNumber("");
  };

  const handleModalInformation = (values: HandleRedeemPointModalInformationInterface) => {
    const {
      id,
      customer: {
        user: { full_name },
      },
      requestType,
    } = values;

    if (requestType === "COMEBACK") {
      setStateModal((s) => ({
        ...s,
        description: `O pedido com id ${id} será cancelado e os pontos da conta de ${full_name} serão ressarcidos. Deseja continuar?`,
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
      title: `Pedido de ${full_name}`,
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
        promise = onDeleteRedeemPoint({ requestId: id, token });
      } else {
        promise = onChangeRedeemPoint({ requestId: id, token });
      }

      await toast.promise(promise, {
        loading: "Processando...",
        error: "Ocorreu um problema!",
        success: "Ação efetuada com sucesso!",
      });

      await refreshRedeemRequests();

      return setIsLoading(false);
    } catch (error) {
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
          <h1 className="text-2xl text-center lg:text-start font-extrabold text-fontsColor-800 my-4 lg:mb-0">Resgate de Pontos</h1>

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
              onClick={refreshRedeemRequests}
            >
              <FaArrowRotateLeft size="10" />
            </Button>
          </div>
        </div>

        {!isEmpty(clientRegistrations) && (
          <List.Root className={twMerge(clientRegistrations.length > 4 && "overflow-y-scroll pr-2 hide-scrollbar")}>
            {!isLoading &&
              clientRegistrations.map((reg) => {
                let { id, status, points } = reg;
                const isPending = status === "PENDING";

                return (
                  <List.Item key={`${id}-${uniqueId()}`}>
                    <List.LeftSign className={twMerge(!isPending && "border-green-600")} />
                    <List.Point>{points} pts</List.Point>
                    <List.ContentRedeemPointsRegistration {...reg} />

                    <List.IconButtonRoot>
                      <List.IconButton
                        disabled={false}
                        icon={BiDislike}
                        isLoading={isLoading}
                        onClick={() => handleModalInformation({ ...reg, requestType: "DELETE" })}
                        className={twMerge("bg-red-500", isPending && "hover:bg-red-800")}
                        iconClassName="text-white"
                      />
                      <List.IconButton
                        disabled={false}
                        icon={GrRevert}
                        isLoading={isLoading}
                        onClick={() => handleModalInformation({ ...reg, requestType: "COMEBACK" })}
                        className={twMerge("bg-sky-700", false && "hover:bg-sky-900")}
                        iconClassName="text-white"
                      />
                    </List.IconButtonRoot>
                    <List.Animation icon={AiOutlineMinus} show={isPending} />
                  </List.Item>
                );
              })}
          </List.Root>
        )}

        {isEmpty(clientRegistrations) && (
          <div className="flex flex-col justify-center items-center gap-1">
            <span className="text-lg font-semibold">Nenhum resgate encontrado!</span>
            <ImConfused size="30px" className="text-ternary-500 animate-pulse" />
          </div>
        )}

        {isLoading && <LoadingPage />}
      </Container>
    </Fragment>
  );
};
