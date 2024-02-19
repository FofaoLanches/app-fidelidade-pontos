export const getEndpointBaseUrlAPIS = () => {
  const currentEnv = process.env.NODE_ENV;

  if (currentEnv === "development") {
    return process.env.BASEURL_API_DEV_API;
  }

  return process.env.BASEURL_API_PRD_API;
};

export const getEndpointBaseUrlClient = () => {
  const currentEnv = process.env.NODE_ENV;

  if (currentEnv === "development") {
    return process.env.BASEURL_API_DEV_CLIENT;
  }

  return process.env.BASEURL_API_PRD_CLIENT;
};
