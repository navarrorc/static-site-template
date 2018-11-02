"use strict";

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const dotenv = require("dotenv");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const pkg = require("./package.json");
const siteOptions = require("./.scripts/_options.js").siteOptions;

function resolve(dir) {
  return path.resolve(__dirname, dir); // creates an absolute path
}

let buildEntryPoint = function(entryPoint) {
  if (process.env.NODE_ENV === "production") {
    // no HMR
    return entryPoint;
  }

  return ["webpack-hot-middleware/client", entryPoint];
};

// call dotenv and it will return an Object with a parsed key
// see: https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

/**
 * Common Webpack Configuration
 */
const commonConfig = merge([
  {
    context: resolve("src/app"),
    entry: {
      main: buildEntryPoint("./main.js"),
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name].[chunkhash].js",
      publicPath: siteOptions.urlPrefix + "dist/",
      path: resolve("11ty/dist")
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(js|jsx)$/,
          loader: "eslint-loader",
          include: [resolve("src/app")]
        },
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          include: [resolve("src/app")]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          include: [resolve("src")],
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?[hash]"
              }
            }
          ]
        },
        {
          test: /\.(css|scss)/,
          include: [
            resolve("src/app"),
            resolve("src/sass"),
            resolve("src/app/components")
          ],
          use: ["css-hot-loader"].concat(
            ExtractTextPlugin.extract({
              use: [
                {
                  loader: "css-loader",
                  options: {
                    url: false, // will not parse url() in css
                    importLoaders: 1,
                    sourceMap: true
                  }
                },
                {
                  loader: "postcss-loader",
                  options: {
                    plugins: () => [require("autoprefixer")],
                    sourceMap: true
                  }
                },
                {
                  loader: "sass-loader",
                  options: {
                    sourceMap: true
                  }
                }
              ]
            })
          )
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
      // alias: {
      //   "@": resolve("src"), // Replace `src` with the path to your source files from the root of your project
      //   "~": resolve("node_modules")
      // },
      symlinks: false
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new ExtractTextPlugin({
        filename: "css/[name].css",
        allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor"
      }),
      new CleanWebpackPlugin(["11ty/dist"])
    ]
  }
]);

/**
 * Dev Webpack Configuration
 */
const devConfig = merge([
  {
    watch: true,
    devtool: "eval-source-map",
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
      // new BundleAnalyzerPlugin()
    ]
  }
]);

/**
 * Production Webpack Configuration
 */
const prodConfig = merge([
  {
    watch: false,
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        ecma: 5,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          map: { inline: false }
        },
        canPrint: true
      }),
      new webpack.optimize.ModuleConcatenationPlugin() // webpack 3 feature
    ]
  }
]);

module.exports = env => {
  if (env === "production") {
    return merge(commonConfig, prodConfig);
  }

  return merge(commonConfig, devConfig);
};
