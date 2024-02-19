export const getDevice = () => {
  if (typeof window !== "undefined") {
    var isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);

    if (isMobile) {
      return true;
    }
  }

  return false;
};
