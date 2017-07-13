const PKG = require("./package.json");
const Webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require("path");

const srcDir = path.resolve(__dirname, "src");
const entryPoint = path.resolve(srcDir, "index");
const outputPath = path.resolve(__dirname, "dist");
const extensionName =
  "<%=extensionNamespace.toLowerCase() %><%=extensionNameSafe.toLowerCase() %>";
const outputFilename = extensionName + ".js";

const config = {
  entry: entryPoint,
  output: {
    path: outputPath,
    filename: outputFilename
  },

  externals: ["qvangular", "jquery", "underscore", "qlik"],

  plugins: [
    new CopyWebpackPlugin(
      [
        { from: "src/" + extensionName + ".png", to: extensionName + ".png" },
        {
          from: "src/" + extensionName + ".qext",
          to: extensionName + ".qext",
          transform: function(content, path) {
            return new Buffer(
              content
                .toString()
                .replace(/@@version/g, require("./package.json").version),
              "binary"
            );
          }
        }
      ],
      {}
    ),
    new Webpack.NormalModuleReplacementPlugin(/@@version/g, result => {
      result.request = require("./package.json").version;
    }),
    new WebpackShellPlugin({
        onBuildEnd: 'node copy-to-local-qlik-sense.js'
    })
  ]
};

module.exports = config;
