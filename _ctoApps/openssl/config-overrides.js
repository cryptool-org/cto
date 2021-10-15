/* config-overrides.js */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function override(config) {
  if (process.env.REACT_APP_ENV === 'cto') {
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
    config.output.filename = '[name].js';
    config.plugins = config.plugins.map((plugin) => {
      return plugin instanceof MiniCssExtractPlugin
        ? new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: 'name].chunk.css',
          })
        : plugin;
    });
  }
  return config;
};
