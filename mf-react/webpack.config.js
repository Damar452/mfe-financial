const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "team-react",
    projectName: "mf-react",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    output: {
      libraryTarget: "system",
    },
  });
};
