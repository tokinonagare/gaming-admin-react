// Module Federation 配置管理
const { dependencies } = require('./package.json');

const sharedDependencies = {
  react: {
    singleton: true,
    requiredVersion: dependencies.react,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: dependencies['react-dom'],
  },
  'react-router-dom': {
    singleton: true,
    requiredVersion: dependencies['react-router-dom'],
  },
  antd: {
    singleton: true,
    requiredVersion: dependencies.antd,
  },
  '@ant-design/icons': {
    singleton: true,
    requiredVersion: dependencies['@ant-design/icons'],
  },
};

const createModuleFederationConfig = (options = {}) => {
  const {
    name,
    filename = 'remoteEntry.js',
    exposes = {},
    remotes = {},
    port = 4200,
    additionalShared = {},
  } = options;

  return {
    name,
    filename,
    exposes,
    remotes,
    shared: {
      ...sharedDependencies,
      ...additionalShared,
    },
    devServer: {
      port,
      historyApiFallback: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
};

module.exports = {
  createModuleFederationConfig,
  sharedDependencies,
};