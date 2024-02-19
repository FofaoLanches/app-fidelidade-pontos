"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { formatPhone } from "@/helpers";
import { VerificationModalInterface } from "@/types";

import { OTPField } from "./otpField";

export const VerificationModal: React.FC<VerificationModalInterface> = (props) => {
  const { isOpen = false, phoneNumber = "", hasError, isLoading, handleSubmit = () => null } = props;

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));

  const handleSubmitFormatedCode = () => {
    const joinedOtpCode = otp.join("");
    handleSubmit(joinedOtpCode);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-fontsColor-900 mb-4">
                  Verificação de conta
                </Dialog.Title>
                <Dialog.Description className="text-center text-sm text-fontsColor-700">
                  {`Digite o código de verificação que foi enviado por SMS para o telefone ${formatPhone(phoneNumber)} `}
                </Dialog.Description>
                <OTPField
                  state={otp}
                  seState={setOtp}
                  handleDinamicSubmit={handleSubmitFormatedCode}
                  hasError={hasError}
                  isLoading={isLoading}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
