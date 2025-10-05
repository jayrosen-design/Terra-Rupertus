/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // CesiumJS configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        https: false,
        http: false,
        zlib: false,
        stream: false,
        url: false,
      };
    }

    // Allow Cesium to use AMD requires
    config.module = {
      ...config.module,
      unknownContextCritical: false,
    };

    return config;
  },
};

module.exports = nextConfig;

