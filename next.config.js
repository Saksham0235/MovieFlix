/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages:['mongoose'],
  images: {
    domains: ["occ-0-3933-116.1.nflxso.net"],
  },
};

module.exports = nextConfig;
