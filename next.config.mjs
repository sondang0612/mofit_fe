/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Bật Strict Mode để debug tốt hơn
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
