import { ImConfused } from "react-icons/im";

import { NotFoundInterface } from "@/types";

export const NotFound: React.FC<NotFoundInterface> = (props) => {
  const { content } = props;
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-4">
      <ImConfused size="100px" className="text-ternary-500" />
      <h3 className="text-2xl max-w-xl text-center font-bold text-fontsColor-800 md:text-3xl lg:text-3xl">{content}</h3>
    </div>
  );
};
