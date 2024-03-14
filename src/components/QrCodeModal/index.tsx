"use client";
import { Dialog, Transition } from "@headlessui/react";
import { isEmpty } from "lodash";
import Image from "next/image";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";

import { QrCodeContext } from "@/context";
import { useTime } from "@/hooks";
import { useWpp } from "@/hooks/useWpp";
import { QrCodeModalInterface } from "@/types";

import { Button } from "..";
import { QrCode } from "./qrCode";

export const QrCodeModal: React.FC<QrCodeModalInterface> = (props) => {
  const { isOpen = false, session, onClose = () => null } = props;

  const { getQrCode } = useWpp();

  const { setIsOpenModalQrCode } = useContext(QrCodeContext);
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { countdown, countdownEnded } = useTime();

  const generateQrCode = useCallback(async () => {
    if (isEmpty(session?.token)) return;

    setIsLoading(true);
    try {
      const res = await getQrCode({ token: session.token });

      if (res.whatsapp_session_active) {
        toast.success("Você já está autenticado!");
      }

      if (res.qr_code) {
        setQrCode(res.qr_code);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyConection = useCallback(async () => {
    if (isEmpty(session?.token)) return;

    const res = await getQrCode({ token: session.token });

    if (res.whatsapp_session_active) {
      toast.success("Você ESTÁ conectado no WhatsApp!");
      setIsOpenModalQrCode(false);
    } else {
      toast(
        () => {
          return (
            <button className="flex items-center">
              <IoIosWarning className="text-fontsColor-900" size="30" />
              <span className="text-fontsColor-900 text-sm">Você ainda NÃO está conectado no WhatsApp!</span>
            </button>
          );
        },
        { style: { backgroundColor: "#EAB308" } },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    generateQrCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-4/6 rounded-2xl bg-white p-10 transition-all">
                <Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-fontsColor-900 mb-4">
                  Use o WhatsApp para comunicar seu clientes!
                </Dialog.Title>
                <div className="flex w-full justify-between items-center gap-8">
                  <Image
                    src="/wpp_steps.jpeg"
                    alt="passo a passo de como conectar o WhatsApp"
                    className="w-[auto] h-[180px]"
                    width={700}
                    height={700}
                    quality={100}
                  />
                  <QrCode qrCode={qrCode} isLoading={isLoading} />
                </div>
                <div className="flex justify-between gap-4 mt-4">
                  <Button
                    variant="button"
                    className="text-white bg-ternary-400 w-fit px-2 text-nowrap"
                    disabled={isLoading}
                    onClick={verifyConection}
                  >
                    Quero verificar minha autenticação no WhatsApp
                  </Button>
                  {countdownEnded ? (
                    <Button
                      variant="button"
                      className="text-white bg-ternary-400 w-full max-w-[256px] px-2"
                      onClick={generateQrCode}
                      disabled={isLoading}
                    >
                      gerar novo <span className="underline">QrCode</span>
                    </Button>
                  ) : (
                    <Dialog.Description className="pt-2 w-full max-w-[256px]">
                      Em {countdown} você pode atualizar seu QrCode.
                    </Dialog.Description>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
