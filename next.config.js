/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-5475696a04b24fa89ea71e442fe960d0.r2.dev",
        port: "",
        pathname: "/products/**",
      },
    ],
  },
};

module.exports = nextConfig;
