import { AiFillGift, AiFillHome, AiTwotoneStar } from "react-icons/ai";
import { BiSolidLayerPlus } from "react-icons/bi";
import { FaBoxes } from "react-icons/fa";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { HiTrophy } from "react-icons/hi2";

import { DrawerItemListType } from "@/types";

const defaultItems: DrawerItemListType[] = [
  {
    id: "/ranking",
    icon: <HiTrophy />,
    content: "Ranking de pontos",
    forceHardNavigation: false,
  },
];

export const cusotmerDrawerItems: DrawerItemListType[] = [
  {
    id: "/p/dashboard",
    icon: <AiFillHome />,
    content: "Tela Inicial",
    forceHardNavigation: false,
  },
  {
    id: "/p/gotched-points",
    icon: <AiFillGift />,
    content: "Meus pontos",
    forceHardNavigation: true,
  },
  {
    id: "/",
    icon: <AiTwotoneStar />,
    content: "Cadastrar pontos",
    forceHardNavigation: true,
  },
  ...defaultItems,
];

export const adminDrawerItems: DrawerItemListType[] = [
  {
    id: "/p/a/registration-points-req",
    icon: <BiSolidLayerPlus />,
    content: "Cadastro de pontos",
    forceHardNavigation: false,
  },
  {
    id: "/p/a/redeem-points-req",
    icon: <FaPeopleCarryBox />,
    content: "Resgate de pontos",
    forceHardNavigation: false,
  },
  {
    id: "/p/a/products",
    icon: <FaBoxes />,
    content: "Produtos",
    forceHardNavigation: false,
  },
  ...defaultItems,
];
