/** @type {import('next').NextConfig} */
// const withPreact = require('next-plugin-preact');

const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/@:user',
        destination: '/u/:user'
      }
    ]
  },
}

module.exports = nextConfig;