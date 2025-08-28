const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/main.tsx',
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared/ui': path.resolve(__dirname, '../../libs/shared/ui/src/index.ts'),
      '@shared/utils': path.resolve(__dirname, '../../libs/shared/utils/src/index.ts'),
      '@shared/types': path.resolve(__dirname, '../../libs/shared/types/src/index.ts'),
    },
  },
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, '../../tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  plugins: [
    new ModuleFederationPlugin({
      name: 'user_avatar',
      filename: 'remoteEntry.js',
      exposes: {
        './UserAvatar': './src/pages/UserAvatar',
        './AvatarList': './src/components/AvatarList',
        './AvatarUpload': './src/components/AvatarUpload',
        './AvatarManagement': './src/components/AvatarManagement',
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
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.10.0',
        },
        antd: {
          singleton: true,
          requiredVersion: '^5.4.0',
        },
      },
    }),
    
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  
  devServer: {
    port: 4205,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  
  optimization: {
    splitChunks: false,
  },
  
  output: {
    path: path.resolve(__dirname, '../../dist/apps/user-avatar'),
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[contenthash].chunk.js',
    clean: true,
    publicPath: isDevelopment ? 'http://localhost:4205/' : '/user-avatar/',
  },
};