import { SomeChildInterface } from "@/types";

type FilterContentType = "semana" | "mês" | "semestre" | "ano";
type FilterSearchType = "weekly" | "monthly" | "semi-annual" | "annual";
export type UserParmsType = { paramType: FilterSearchType; paramContent: FilterContentType };
export type UserFiltersFieldsType = { content: string } & UserParmsType;

export interface FilterMenuRootInterface extends SomeChildInterface {
  isOpen: boolean;
  isLoading: boolean;
  onOpen: () => void;
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: Pick<UserFiltersFieldsType, "paramContent" | "paramType">) => void;
}

export interface FilterMenuChildInterface extends SomeChildInterface {}
