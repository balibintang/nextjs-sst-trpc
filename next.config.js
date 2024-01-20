/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });

    return config;
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = nextConfig;
