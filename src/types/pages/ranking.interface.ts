import { UserInterface, UseServerSessionInterface } from "@/types";

export interface GetRankingInterface {
  id: string;
  amount_points: number;
  user_id: string;
  user: Pick<UserInterface, "full_name">;
  phone_number?: string;
}

export interface RankingInterface {
  session: UseServerSessionInterface;
  users: GetRankingInterface[];
}

export interface GetRankingProps {
  period: "weekly" | "monthly" | "semi-annual" | "annual";
}
