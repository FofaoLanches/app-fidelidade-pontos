"use client";

import { SessionContext } from "next-auth/react";
import React, { Fragment, useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt2 } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

import { WithInterface } from "@/types";

import { DrawerMenu } from "./drawerMenu";

export const With: React.FC<WithInterface> = (props) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const session = useContext(SessionContext);

  const handleTriggerModal = () => setIsOpen((s) => !s);

  let firstName = "",
    adminCity = "";

  if (session?.status === "authenticated") {
    [firstName] = session?.data.user.full_name.split(" ");
    adminCity = session?.data?.user?.city as string;
  }

  return (
    <Fragment>
      <div className={twMerge("fixed top-0 left-0 w-screen h-[70px] shadow-2xl", className)}>
        <button className="absolute top-[3vh] left-[2vw]" onClick={handleTriggerModal}>
          <HiMenuAlt2 className="w-10 h-8 text-fontsColor-300" />
        </button>
        <div className="flex gap-2 items-center absolute top-[3vh] right-[2vw]">
          {firstName && (
            <span className="text-fontsColor-300">
              Olá, <b>{firstName}</b>
            </span>
          )}

          <CgProfile className="w-10 h-8 text-fontsColor-300" />
        </div>
      </div>
      <DrawerMenu isOpen={isOpen} handleTrigger={handleTriggerModal} adminCity={adminCity} />
    </Fragment>
  );
};
