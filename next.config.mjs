/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uomo-nextjs-ecommerce.vercel.app",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
