import { isString } from "lodash";
import Image from "next/image";

import { FilefieldInterface } from "@/types";

export const SelectedImage: React.FC<FilefieldInterface> = (props) => {
  const { alt, src } = props;
  const auxValue = src as unknown as File;

  if (isString(src)) {
    return (
      <div className="flex flex-col items-center w-full h-[20vh] rounded-lg shadow-xl bg-white cursor-pointer">
        <Image
          alt={alt}
          src={src}
          blurDataURL={src}
          placeholder="blur"
          className="object-none rounded-lg"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "20vh",
            objectFit: "cover",
          }}
          quality={100}
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
