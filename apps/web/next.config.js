/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@ctrl-chat/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
    ],
  },
};
