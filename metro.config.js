const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      const resolvedModuleName = moduleName.startsWith('@/')
        ? path.resolve(__dirname, 'src', moduleName.slice(2))
        : moduleName;

      return context.resolveRequest(context, resolvedModuleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
