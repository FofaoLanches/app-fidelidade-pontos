import { GiTrophyCup } from "react-icons/gi";
import { twMerge } from "tailwind-merge";

import { ListContentRankingInterface } from "@/types";

export const ListContentRanking: React.FC<ListContentRankingInterface> = (props) => {
  const { full_name, icon: Icon = GiTrophyCup, index, redeemed_points, iconClassName } = props;
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex w-[10vw] gap-6 items-center lg:w-full">
        <div className="relative">
          {index < 4 && <span className="absolute w-full text-sm top-1 font-bold text-white text-center">{index}</span>}
          <Icon className={twMerge("text-black text-[50px]", iconClassName)} />
        </div>
        <h2 className="text-2xl text-start font-extrabold text-fontsColor-800">{full_name}</h2>
      </div>
      <h3 className="text-2xl text-center font-extrabold text-blue-700">{redeemed_points}</h3>
    </div>
  );
};
