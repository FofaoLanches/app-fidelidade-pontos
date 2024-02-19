import { MdInsertEmoticon } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components";
import { ListIconButtonInterface } from "@/types";

export const ListIconButton: React.FC<ListIconButtonInterface> = (props) => {
  const {
    disabled = false,
    isVisible = true,
    icon: Icon = MdInsertEmoticon,
    isLoading = false,
    onClick = () => null,
    iconClassName,
    className,
  } = props;

  if (!isVisible) return <></>;

  return (
    <Button
      variant="button"
      disabled={disabled}
      hasType={false}
      className={twMerge("disabled:opacity-60 h-[30px]", className)}
      onClick={onClick}
      isLoading={isLoading}
    >
      <Icon className={twMerge("text-white", iconClassName)} />
    </Button>
  );
};
