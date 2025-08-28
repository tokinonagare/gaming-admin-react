const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
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
              transpileOnly: true,
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
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        'user-report': isDevelopment 
          ? 'user_report@http://localhost:4201/remoteEntry.js'
          : 'user_report@/user-report/remoteEntry.js',
        'user-transaction': isDevelopment 
          ? 'user_transaction@http://localhost:4202/remoteEntry.js'
          : 'user_transaction@/user-transaction/remoteEntry.js',
        'user-profile': isDevelopment 
          ? 'user_profile@http://localhost:4203/remoteEntry.js'
          : 'user_profile@/user-profile/remoteEntry.js',
        'app-user': isDevelopment 
          ? 'app_user@http://localhost:4204/remoteEntry.js'
          : 'app_user@/app-user/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^18.2.0',
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^6.10.0',
        },
        antd: {
          singleton: true,
          eager: true,
          requiredVersion: '^5.4.0',
        },
      },
    }),
    
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),

    new webpack.DefinePlugin({
      'process.env.REACT_APP_NAME': JSON.stringify(process.env.REACT_APP_NAME || 'Gaming Admin'),
      'process.env.REACT_APP_STAGE': JSON.stringify(process.env.REACT_APP_STAGE || 'development'),
      'process.env.REACT_APP_API_DOMAIN': JSON.stringify(process.env.REACT_APP_API_DOMAIN || 'https://admin.laiwan.io/admin/'),
      'process.env.REACT_APP_VERSION': JSON.stringify(process.env.REACT_APP_VERSION || '1.0.0'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
  
  devServer: {
    port: 4200,
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
    path: path.resolve(__dirname, '../../dist/apps/shell'),
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[contenthash].chunk.js',
    clean: true,
    publicPath: isDevelopment ? 'http://localhost:4200/' : '/',
  },
};