/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop-api-production-db87.up.railway.app",
      },
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "3000",
      // },
    ],
  },
};
export default nextConfig;
