/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = async (phase, { defaultConfig }) => {
  const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.node/,
        use: "raw-loader",
      });

      return config;
    },
    async rewrites() {
      return [
        {
          source: "/api/trpc/:path*",
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/trpc/:path*`,
        },
      ];
    },
    pageExtensions: [
      "tsx",
      "ts",
      phase === PHASE_DEVELOPMENT_SERVER ? "js" : "", //js files are removed in production
    ].filter(Boolean),
    compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  return nextConfig;
};
