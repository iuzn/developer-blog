const path = require('path')

const withPlugins = require("next-compose-plugins");

const withSvgr = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withPlugins([withSvgr], {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ['pbs.twimg.com']
  }
})
