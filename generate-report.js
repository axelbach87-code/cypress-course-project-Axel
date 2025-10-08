const report = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'cypress/reports/cucumber-report.json',
  output: 'cypress/reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  storeScreenshots: true,
  screenshotsDirectory: 'cypress/screenshots/',
  launchReport: process.env.CI ? false : true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "DEV/TST",
    "Browser": "Chrome / Firefox",
    "Platform": "Windows",
    "Executed": "Local"
  }
};

report.generate(options);

console.log('Reporte HTML generado exitosamente en cypress/reports/cucumber_report.html');