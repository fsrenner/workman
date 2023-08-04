const path = require('path');

module.exports = {
  testRegex: '((\\.|/*.)(spec))\\.js?$',
  setupFiles: [path.join(__dirname, '.jest/setEnvVars.js')],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
};
