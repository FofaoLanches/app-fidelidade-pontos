import { GetRankingInterface, GetRankingProps } from "@/types";

export const useRanking = () => {
  const getRanking = async ({ period }: GetRankingProps) => {
    const req = await fetch(`/api/ranking?period=${period}`, {
      method: "GET",
    });

    const res: GetRankingInterface[] = await req.json();

    return res;
  };

  return {
    getRanking,
  };
};
