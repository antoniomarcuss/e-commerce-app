/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["shop-api-production-db87.up.railway.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop-api-production-db87.up.railway.app",
        pathname: "/images/**",
      },
    ],
  },
};
export default nextConfig;
