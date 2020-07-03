const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let plugins = (env) => {
  let allPlugins = [];
  //DEV PLUGINS
  if (env === "development") {
    allPlugins.push(
      new SourceMapDevToolPlugin({
        filename: "[file].map",
      })
    );
  }
  //all plugins
  allPlugins.push(
    new MiniCssExtractPlugin({
      filename: "style.css",
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./app/index.html",
    })
  );

  return allPlugins;
};

module.exports = (env, argv) => {
  let config = {
    mode: argv.mode,
    entry: "./app/index.js",
    output: {
      path: path.resolve(__dirname, "dist/extension"),
      filename: "[name].js",
    },
    plugins: plugins(argv.mode),
    module: {
      rules: [
        {
          test: /\.j(s|sx)$/,
          include: path.resolve(__dirname, "app"),
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                encoding: "utf8",
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: "url-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    optimization: {
      minimize: false,
    },
  };
  //configuration just for development
  if (argv.mode === "development") {
    config.devtool = "eval-source-map";
    config.module.rules.push({
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"],
    });
  }
  //configuration just for production end
  if (argv.mode === "production") {
    config.optimization.minimize = [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ];
  }

  return config;
};
