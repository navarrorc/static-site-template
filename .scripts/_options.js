const siteOptions = {
  urlPrefix: "/" //e.g. For SharePoint: "/sites/intranet/rush/"
};

// Applies to webpack configuration
const statsOptions = {
  colors: true,
  hash: false,
  version: true,
  timings: true,
  assets: true,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: false,
  cached: false,
  reasons: false,
  source: false,
  errorDetails: true,
  chunkOrigins: false,
  displayErrorDetails: true
};

// TODO: Fix! Cannot use object property shorthand, or it will not work in IE 11 and uglifyjs will complain
module.exports = {
  siteOptions: siteOptions, // Used in .eleventy, webpack.config.js and src/app/main.js
  statsOptions: statsOptions // Used in .scripts/server.js
};
