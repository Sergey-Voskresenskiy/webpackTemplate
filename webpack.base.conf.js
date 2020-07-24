const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob");
const DashboardPlugin = require("webpack-dashboard/plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
  fonts: path.join(__dirname, "./src/fonts"),
  assets: "assets/",
};
module.exports = {
  externals: {
    paths: PATHS,
    jQuery: "jQuery",
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].js`,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              {
                exclude: [
                  "transform-async-to-generator",
                  "transform-regenerator",
                ],
              },
            ],
            plugins: [
              ["@babel/plugin-proposal-optional-chaining"],
              ["@babel/plugin-proposal-nullish-coalescing-operator"],
              ["module:fast-async", { spec: true }],
            ],
          },
        },
        exclude: "/node_modules/",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "img:data-src"],
              minimize: false,
              interpolate: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: `${PATHS.assets}fonts/[name].[ext]`,
        },
      },
      {
        test: /\.(mp3|mp4|webp)(\?v=\d+\.\d+\.\d+)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              extract: false,
              symbolId: "[name]",
            },
          },
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeAttrs: { attrs: "*:(stroke|fill):((?!^none$).)*" } },
                { removeTitle: true },
                { removeComments: true },
                { removeDesc: true },
                { removeMetadata: true },
                { removeEmptyAttrs: true },
                { removeHiddenElems: true },
                { removeXMLProcInst: true },
                { removeEmptyContainers: true },
                { removeStyleElement: true },
                { removeScriptElement: true },
                { removeUselessStrokeAndFill: true },
                { sortAttrs: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
        ],
      },
      {
        test: /\.module\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css|styl$/,
        exclude: "/node_modules/",
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              import: true,
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: `${PATHS.src}/js/postcss.config.js`,
              },
            },
          },
          {
            loader: "stylus-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new SpriteLoaderPlugin(),
    new DashboardPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    ...glob.sync(`${PATHS.src}/*.html`).map((htmlFile) => {
      return new HtmlWebpackPlugin({
        filename: path.basename(htmlFile),
        template: htmlFile,
      });
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          ie8: true,
          safari10: true,
          comments: false,
        },
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: (file) => {
            return `${file}.LICENSE`;
          },
          banner: (licenseFile) => {
            return ``;
          },
        },
      }),
    ],
    splitChunks: {
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          enforce: false,
        },
      },
    },
  },
};
