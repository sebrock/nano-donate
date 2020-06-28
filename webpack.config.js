const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

let plugins = [];
plugins.push(
  new MiniCssExtractPlugin({
    filename: "style.css",
    ignoreOrder: true,
  }),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./app/index.html",
  }),
  new SourceMapDevToolPlugin({
    filename: "[file].map",
  })
);
module.exports = {
  mode: "development",
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist/extension"),
    filename: "index.bundle.js",
  },
  plugins,
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
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
