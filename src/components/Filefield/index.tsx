"use client";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

import { blobToBase64, extractBlobFromFile, isValidBase64 } from "@/helpers";
import { FileFieldInterface } from "@/types";

import { SelectedImage } from "./selectedImage";

export const Filefield: React.FC<FileFieldInterface> = (props) => {
  const { id, message, isInvalid, onBlur = () => null, onChange = () => null, value } = props;
  const [image, setImage] = useState<string>("/upload_image_placeholder.jpg");
  const parsedValue = value as unknown as File;

  const getImage = useCallback(async () => {
    if (!parsedValue?.name) return "";

    const blob = extractBlobFromFile(parsedValue);
    const base64 = await blobToBase64(blob);

    return base64;
  }, [parsedValue]);

  useEffect(() => {
    getImage().then((imageBase64) => {
      const isValid = isValidBase64(imageBase64);

      if (isValid) {
        setImage(imageBase64);
      }
    });
  }, [getImage, parsedValue]);

  return (
    <div>
      <label htmlFor={id} className="flex text-md font-normal gap-5" draggable="true">
        {isEmpty(value) && <SelectedImage src={image} alt="Imagem do produto" />}
      </label>
      <input
        className="hidden"
        id={id}
        disabled={false}
        onChange={onChange}
        onBlur={onBlur}
        type="file"
        accept="image/png, image/jpeg"
        name={id}
      />
      <p className="style-text-error">{isInvalid && message}</p>
    </div>
  );
};
