/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // matches any subdomain or domain
      },
    ],
  },
};
export default nextConfig;
