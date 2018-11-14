// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const OUTPUT = process.env.COMPACT_TEST_RESULTS ? 'minimal' : 'full';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-mocha-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['mocha'],
    mochaReporter: {
      ignoreSkipped: true,
      output: OUTPUT
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome_Headless'],
    customLaunchers: {
      // provide --no-sandbox to let it run on the virtual machine
      Chrome_Headless: {
        base: 'Chrome',
        flags: ['--headless', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=9222']
      },
      Chrome_with_debugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9222'],
        debug: true
      }
    },
    singleRun: false
  });
};
