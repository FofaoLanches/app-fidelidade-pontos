import toast from "react-hot-toast";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { ToastInterface } from "@/types";

export const customToast = (values: ToastInterface) =>
  toast.promise(
    values.promise,
    {
      loading: "Carregando...",
      success: () => values.info,
      error: (err) => `Este erro aconteceu ${err.toString()}`,
    },
    {
      style: {
        minWidth: "250px",
      },
      success: {
        duration: 5000,
        icon: <BsFillCheckCircleFill className="text-ternary-800 w-10 h-10" />,
      },
    },
  );
