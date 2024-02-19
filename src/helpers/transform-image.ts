import { isEmpty } from "lodash";

const extractImageExtensionFromUrl = (url: string) => {
  if (isEmpty(url)) return "";

  const urlParts = url.split(".");

  return urlParts[urlParts.length - 1];
};

const extractImageFilenameFromUrl = (url: string) => {
  if (isEmpty(url)) return "";

  const folder = "products/";
  const splittedUrl = url.split(folder);
  const fileName = splittedUrl[splittedUrl.length - 1];

  return fileName;
};

const createImageFileFromUrl = async (url: string) => {
  const extension = extractImageExtensionFromUrl(url);
  const filename = extractImageFilenameFromUrl(url);

  const response = await fetch(url);
  const data = await response.blob();

  const metadata: FilePropertyBag = {
    type: `image/${extension}`,
  };

  return new File([data], filename, metadata);
};

const extractBlobFromFile = (file: File) => {
  const defaultType = "image/jpg";

  return new Blob([file], { type: file?.type || defaultType });
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
  });
};

const isValidBase64 = (base64: string): boolean => {
  return base64.length > 30;
};

export { blobToBase64, createImageFileFromUrl, extractBlobFromFile, extractImageExtensionFromUrl, isValidBase64 };
