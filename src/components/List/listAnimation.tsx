import { ListAnimationInterface } from "@/types";

export const ListAnimation: React.FC<ListAnimationInterface> = (props) => {
  const { icon: Icon, show, className = "animate-line" } = props;

  if (!show) return <></>;

  return (
    <div className="absolute bottom-[-2px] w-[30%]">
      <Icon className={className} />
    </div>
  );
};
