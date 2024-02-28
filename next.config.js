/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fofao-lanches-test-bucket.d561668156bfc2b4598ef69ad0cc164a.r2.cloudflarestorage.com",
        port: "",
        pathname: "/products/**",
      },
    ],
  },
};

module.exports = nextConfig;
