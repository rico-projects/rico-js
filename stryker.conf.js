module.exports = function(config) {
  config.set({
    files: [
      {
        pattern: "src/**/*.js",
        mutated: true,
        included: false
      },
      '!src/index.js',
      "test/**/*.js"
    ],
    testRunner: "mocha",
    mochaOptions: {
      // Optional mocha options
      require: [ 'babel-register' ,'jsdom-global/register']
    },
    mutator: "javascript",
    transpilers: ["babel"],
    reporter: ["html", "progress"],
    testFramework: "mocha",
    coverageAnalysis: "off",
    babelrcFile: ".babelrc"
  });
};
