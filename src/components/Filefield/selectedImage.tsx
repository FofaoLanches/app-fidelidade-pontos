import { isString } from "lodash";

import { FilefieldInterface } from "@/types";

export const SelectedImage: React.FC<FilefieldInterface> = (props) => {
  const { alt, src } = props;
  const auxValue = src as unknown as File;

  if (isString(src)) {
    return (
      <div className="flex flex-col items-center w-full h-[20vh] rounded-lg shadow-xl bg-white cursor-pointer">
        <img
          alt={alt}
          src={src}
          className="object-none rounded-lg"
          style={{
            width: "100%",
            height: "20vh",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[20vh] rounded-lg shadow-xl bg-white">
      <p className="text-fontsColor-900">{auxValue?.name}</p>
    </div>
  );
};
