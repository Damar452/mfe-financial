const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { library } = require("webpack");
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "team-react",
    projectName: "mf-react",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    output: {
      libraryTarget: "system"
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // Alias para la carpeta src
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // Extensiones soportadas
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /(node_modules|\.test\.tsx?$|\.spec\.tsx?$|__tests__)/, // Excluir archivos de prueba
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "classic", // Mantén el runtime clásico para React 17
                  },
                ],
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.less$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
  });
};
