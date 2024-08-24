/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "3000",
    //   },
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop-api-zsj5.onrender.com",
      },
    ],
  },
};

export default nextConfig;
