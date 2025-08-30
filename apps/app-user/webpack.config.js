const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || 'http://localhost:3001/admin/';

module.exports = {
  mode: 'development',
  entry: './src/main.tsx',
  devServer: {
    port: 4204,
    hot: true,
    open: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_user',
      filename: 'remoteEntry.js',
      exposes: {
        './AppUser': './src/app/AppUser',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        antd: {
          singleton: true,
          requiredVersion: '^5.4.0',
        },
        '@ant-design/icons': {
          singleton: true,
          requiredVersion: '^5.0.1',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      define: {
        REACT_APP_API_DOMAIN: JSON.stringify(API_DOMAIN),
      },
    }),
  ],
};