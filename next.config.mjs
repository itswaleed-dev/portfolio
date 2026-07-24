/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.sanishtech.com',
      },
      {
        protocol: 'https',
        hostname: 'companieslogo.com',
      },
    ],
  },
}

export default nextConfig
