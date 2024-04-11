"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

import { Button, Textfield } from "@/components";
import { formatTime } from "@/helpers";
import { RedeemProductsModalInterface } from "@/types";

export const RedeemProductsModal: React.FC<RedeemProductsModalInterface> = (props) => {
  const { isOpen = false, onClose = () => null, inputsValues } = props;
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    valueMode,
    valueTime,
    errorMessageMode,
    errorMessageTime,
    isInvalidMode,
    isInvalidTime,
    setFieldValue,
  } = inputsValues;

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
          <div className="flex min-h-full items-center justify-center">
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
                  Informações do pedido:
                </Dialog.Title>
                <div className="flex flex-col">
                  <div>
                    <label htmlFor="redeem_mode" className="text-md block font-normal mb-1">
                      Como será o resgate:
                    </label>
                    <select
                      disabled={isSubmitting}
                      value={valueMode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="redeem_mode"
                      className={twMerge(
                        "w-full h-[40px] bg-white rounded text-fontsColor-900 px-4 border appearance-none focus:outline-none focus:ring focus:ring-ternary-100",
                        isInvalidMode && "style-focus-error",
                      )}
                    >
                      {["TAKEAWAY", "DINE_IN"].map((i) => (
                        <option key={i} value={i}>
                          {i === "DINE_IN" ? "Comer no local" : "Retirada"}
                        </option>
                      ))}
                    </select>
                    <p className="style-text-error">{isInvalidMode && errorMessageMode}</p>
                  </div>

                  <Textfield
                    id="redeem_time"
                    message={errorMessageTime}
                    placeholder="Horário"
                    label="Para quando será o pedido:"
                    value={valueTime}
                    onChange={(e) => setFieldValue("redeem_time", formatTime(e.target.value))}
                    onBlur={handleBlur}
                    maxLength={5}
                    isInvalid={isInvalidTime}
                    isLoading={isSubmitting}
                  />
                </div>
                <Button variant="button" onClick={() => handleSubmit()} className="text-white bg-ternary-400 px-2" isLoading={isSubmitting}>
                  Fazer pedido
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
