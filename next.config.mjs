/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop-api-production-161e.up.railway.app",
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


