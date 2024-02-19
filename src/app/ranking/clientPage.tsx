"use client";
import { findIndex, isEmpty, uniqueId } from "lodash";
import { Fragment, useState } from "react";
import { FaTrophy as FirstTrophy } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";
import { HiTrophy as SecondTrophy } from "react-icons/hi2";
import { ImConfused } from "react-icons/im";
import { IoMdTrophy as ThirtyTrophy } from "react-icons/io";
import { twMerge } from "tailwind-merge";

import { Button, Container, FilterMenu, Header, List, LoadingPage } from "@/components";
import { useRanking } from "@/hooks";
import { GetRankingInterface, RankingInterface, UserParmsType } from "@/types";

const defaultSelectedFilterState: UserParmsType[] = [{ paramType: "weekly", paramContent: "semana" }];

export const ClientPage: React.FC<RankingInterface> = (props) => {
  const { session, users = [] } = props;

  const { getRanking } = useRanking();

  const [clientUsersData, setClientUserData] = useState<GetRankingInterface[]>(users);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<UserParmsType[]>(defaultSelectedFilterState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const chooseTrophy = (index: number) => {
    switch (index) {
      case 1:
        return { iconColor: "text-[#fbc02d]", icon: FirstTrophy };
      case 2:
        return { iconColor: "text-[#bdbdbd]", icon: SecondTrophy };
      case 3:
        return { iconColor: "text-[#CD7F32]", icon: ThirtyTrophy };
      default:
        return { iconColor: "text-[#000]", icon: GiTrophyCup };
    }
  };

  const handleFilterMenu = () => setFilterIsOpen((s) => !s);

  const selectFilterMenu = async (value: UserParmsType) => {
    setIsLoading(true);
    const isEqualItem = findIndex(selectedFilter, (i) => i.paramType === value.paramType) === 0;
    try {
      if (!isEqualItem) {
        setSelectedFilter([value]);
        const res: GetRankingInterface[] = await getRanking({ period: value.paramType });
        setClientUserData(res);
      }
    } catch (e) {
      console.log(e);
    } finally {
      handleFilterMenu();
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Header variant={isEmpty(session) ? "without" : "with"} className="bg-ternary-900" />
      <Container className="px-[5%] lg:px-[10%] pt-10">
        <h1 className="text-2xl text-center lg:text-start font-extrabold text-fontsColor-800">Maiores Pontuações</h1>
        <div className="flex flex-row gap-2 justify-end w-full">
          <FilterMenu.Root isOpen={filterIsOpen} isLoading={isLoading} onSelect={selectFilterMenu} onOpen={handleFilterMenu}>
            {selectedFilter?.map((item, index) => (
              <FilterMenu.Child key={`${index}+${uniqueId()}`}>{item.paramContent}</FilterMenu.Child>
            ))}
          </FilterMenu.Root>
          <Button
            variant="button"
            hasType={false}
            className="self-end bg-transparent border border-black shadow-none max-w-[50px]"
            onClick={() => null}
          >
            <FaArrowRotateLeft size="10" />
          </Button>
        </div>

        {!isEmpty(clientUsersData) && (
          <List.Root className={twMerge(clientUsersData.length > 4 && "overflow-y-scroll pr-2 hide-scrollbar")}>
            {!isLoading &&
              clientUsersData.map(({ id, amount_points, user: { full_name } }, index) => {
                const { icon, iconColor } = chooseTrophy(index + 1);
                return (
                  <List.Item key={`${full_name}+${id}`}>
                    <List.ContentRanking
                      index={index + 1}
                      iconClassName={iconColor}
                      full_name={full_name}
                      redeemed_points={amount_points}
                      icon={icon}
                    />
                  </List.Item>
                );
              })}
          </List.Root>
        )}

        {isEmpty(clientUsersData) && (
          <div className="flex flex-col justify-center items-center gap-1">
            <span className="text-lg text-center font-semibold">Nenhum cliente pontuou nesse período</span>
            <ImConfused size="30px" className="text-ternary-500 animate-pulse" />
          </div>
        )}

        {isLoading && <LoadingPage />}
      </Container>
    </Fragment>
  );
};
