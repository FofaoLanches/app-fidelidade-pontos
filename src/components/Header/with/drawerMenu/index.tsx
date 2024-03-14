"use client";
import { Dialog, Transition } from "@headlessui/react";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React, { Fragment, useContext } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components";
import { adminDrawerItems, cusotmerDrawerItems } from "@/constants";
import { QrCodeContext } from "@/context";
import { getDevice } from "@/helpers";
import { DrawerItemListType, DrawerMenuInterface } from "@/types";

import { Backdrop } from "./backdrop";
import { ItemDrawer } from "./item";

export const DrawerMenu: React.FC<DrawerMenuInterface> = (props) => {
  const { handleTrigger = () => null, isOpen = false, adminCity } = props;
  const { push } = useRouter();
  const { data } = useSession();

  const { setIsOpenModalQrCode } = useContext(QrCodeContext);

  const isMobile = getDevice();

  const chooseHeaderItems = () => {
    if (!isEmpty(data)) {
      if (data?.user.role === "ADMIN") {
        return adminDrawerItems.map((item) => {
          if (typeof window !== "undefined") {
            if (window.document.location.pathname !== item.id) {
              return item;
            } else {
              return {
                ...item,
                className: "text-ternary-500 animate-bounce",
              };
            }
          }
        }) as DrawerItemListType[];
      }

      return cusotmerDrawerItems.map((item) => {
        if (typeof window !== "undefined") {
          if (window.document.location.pathname !== item.id) {
            return item;
          } else {
            return {
              ...item,
              className: "text-ternary-500 animate-bounce",
            };
          }
        }
      }) as DrawerItemListType[];
    }

    return [];
  };

  const handleLogout = async () => {
    handleTrigger();
    const response = await signOut({ redirect: false });

    if (response.url !== undefined) {
      push("/login");
    }
  };

  const Content = () => {
    return (
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Dialog.Panel className="flex flex-col justify-between w-[80vw] h-screen bg-gray-100 divide-y transition-all sm:w-[50vw] lg:w-[20vw]">
          <div className="divide-y">
            <div className="flex gap-2 justify-center items-center w-full py-6 px-4">
              <h2 className="text-2xl font-bold text-fontsColor-800 md:text-3xl">Fofão Lanches {!!adminCity && adminCity}</h2>
              <img src="/mascote_sem_fundo.png" alt="Logo fofão" className="w-[20%] lg:w-[30%] rounded-[40%]" />
            </div>
            <button onClick={handleTrigger} className="absolute top-1 right-[-40px]">
              <AiFillCloseSquare className="w-8 h-8 text-fontsColor-100" />
            </button>
            {chooseHeaderItems().map((item) => {
              const { id = "" } = item;
              return (
                <ItemDrawer {...item} forceHardNavigation={item.forceHardNavigation} key={id} href={id} handleCloseDrawer={handleTrigger} />
              );
            })}
            {data?.user.role === "ADMIN" && (
              <span
                onClick={() => {
                  handleTrigger();
                  setIsOpenModalQrCode(true);
                }}
                className="flex items-center gap-4 py-2 px-8 cursor-pointer active:bg-fundo-200"
              >
                <FaWhatsapp className="w-8 h-8" />
                <span className="text-lg font-semibold text-fontsColor-800">WhatsApp QrCode</span>
              </span>
            )}
          </div>
          <Button
            variant="button"
            onClick={handleLogout}
            className={twMerge("font-bold bg-transparent shadow-none", isMobile && "mb-[10vh]")}
          >
            Sair
          </Button>
        </Dialog.Panel>
      </Transition.Child>
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={handleTrigger}>
        <Backdrop />

        <div className="fixed top-0 left-0 ">
          <Content />
        </div>
      </Dialog>
    </Transition>
  );
};
