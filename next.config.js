/** @type {import('next').NextConfig} */

const nextAuth = require('next-auth');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localblyimages.blob.core.windows.net',
      },
    ],
  }
}
