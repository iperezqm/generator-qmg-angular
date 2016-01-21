'use strict';

var fs = require('fs');
var path = require('path');
var User = require('./page_objects/User');

var screenshotDescriptions = [];
var screenshotIndex = 0;
var screenshotsDir = path.resolve(__dirname + '../../../failures/');
var logs = [];

var takeScreenshotOfFailingTest = (currentTest) => {
    var failed = currentTest.state === 'failed';

    if (failed) {
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }

        let testDescription = (test) => ((test.parent) ? testDescription(test.parent) + ' ' : '') + test.title;
        let baseFileName = ++screenshotIndex;
        let file = path.resolve(screenshotsDir + '/' + baseFileName + '.png');
        screenshotDescriptions.push(`${screenshotIndex} : ${testDescription(currentTest)}`);

        browser.takeScreenshot()
            .then((png) => fs.writeFileSync(file, png, { encoding: 'base64' }))
            .thenCatch(() => console.log(`Could not write screenshot to ${file}`));
    }
};

before(() => {
    browser.addMockModule('QMetric.httpWithSpinner', () => {
        angular.module('QMetric.httpWithSpinner', []).service('httpWithSpinner', ($http) => $http);
    });

    browser.addMockModule('QMetric.test.disableGoogleTagManager', () => {
        angular.module('QMetric.test.disableGoogleTagManager', []).service('googleTagManagerLoader', () => ({
            run: () => {}
        }));
    });

    browser.addMockModule('QMetric.test.disableAnimations', () => {
        angular.module('QMetric.test.disableAnimations', []).run(($window) => {
            angular.element('<style>').attr('type', 'text/css').html([
                '* {',
                '-webkit-transition: none !important;',
                '-moz-transition: none !important;',
                '-o-transition: none !important;',
                '-ms-transition: none !important;',
                'transition: none !important;',
                '}'
            ].join('\n')).appendTo('head');

            $window.jQuery.fx.off = true;
        });
    });

    browser.addMockModule('QMetric.test.mockDate', () => {
        angular.module('QMetric.test.mockDate', []).run(($window) => {
            $window.jQuery.getScript('js/mockdate.js').then(() => $window.MockDate.set('2015-01-16'));
        });
    });
});

afterEach(function() {
    User.killSession();
    browser.manage().logs().get('browser').then((browserLog) => {
        if (browserLog.length) {
            logs.push(`File: ${this.currentTest.file}`);
            logs.push(`Test: ${this.currentTest.title}`);
            browserLog.forEach(log => logs.push(`${log.level.name}: ${log.message}`));
        }
    });
    takeScreenshotOfFailingTest(this.currentTest);
});

after(() => {
    if (logs.length) {
        console.log('\nBrowser logs:');
        console.log('=============');
        logs.forEach(log => console.log(log));
    }
    if (screenshotIndex > 0) {
        let file = path.resolve(screenshotsDir + '/index.txt');
        fs.writeFileSync(file, screenshotDescriptions.join('\n'));
    }
});
