"use client";
import { Dialog, Transition } from "@headlessui/react";
import { isEmpty } from "lodash";
import { Fragment } from "react";

import { GenericModalInterface } from "@/types";

export const GenericModal: React.FC<GenericModalInterface> = (props) => {
  const {
    isOpen = false,
    title = "",
    description,
    icon,
    messageButtonLeft = "",
    messageButtonRight = "",
    hasButtonLeft = true,
    hasButtonRight = true,
    handleClose = () => null,
    handleClickButtonLeft = () => null,
    handleClickButtonRight = () => null,
  } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                {!isEmpty(icon) && <div className="flex items-center justify-center pb-4">{icon}</div>}
                <Dialog.Title as="h3" className="text-center text-lg font-semibold leading-6 text-fontsColor-900">
                  {title}
                </Dialog.Title>
                {!isEmpty(description) && (
                  <div className="mt-2">
                    <p className="text-sm text-center text-fontsColor-700">{description}</p>
                  </div>
                )}

                <div className="flex flex-dir gap-4 mt-4">
                  {hasButtonLeft && (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-ternary-900 px-4 py-2 text-sm font-medium text-fontsColor-300"
                      onClick={handleClickButtonLeft}
                    >
                      {messageButtonLeft}
                    </button>
                  )}
                  {hasButtonRight && (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-fundo-400 px-4 py-2 text-sm font-medium text-fontsColor-300"
                      onClick={handleClickButtonRight}
                    >
                      {messageButtonRight}
                    </button>
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
