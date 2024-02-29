/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "fofao-lanches-test-bucket.d561668156bfc2b4598ef69ad0cc164a.r2.cloudflarestorage.com",
        hostname: "fofao-lanches-bucket.cdf5b6507fa4af4344fbab896825f3c6.r2.cloudflarestorage.com",
        port: "",
        pathname: "/products/**",
      },
    ],
  },
};

module.exports = nextConfig;
