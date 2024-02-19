import { SomeChildInterface } from "@/types";

export const ListPoint: React.FC<SomeChildInterface> = (props) => {
  const { children } = props;
  return (
    <div className="absolute top-2 right-32">
      <b>{children}</b>
    </div>
  );
};
