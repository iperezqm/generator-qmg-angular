/* eslint-env node */

'use strict';

var path = require('path');
var webDistPath = path.resolve(__dirname, '../dist');
var extend = require('extend');

var dyson = {
    args: [
        'node_modules/.bin/dyson',
        'test/dist/dyson/services',
        '<%%= freeport.dyson %>'
    ],
    options: {
        wait: false,
        quiet: true
    }
};

var dysonTest = {
    args: dyson.args.slice(),
    options: extend(DEEP, {}, dyson.options)
};

dysonTest.args.push('<%%= freeport.dyson %>');

var service = {
    cmd: 'node_modules/.bin/http-server',
    args: [
          'dist',
          '-p',
          '<%%= freeport.service %>',
          '--silent',
          '--proxy',
          'http://localhost:<%%= freeport.dyson %>'
      ],
    options: {
        wait: false
    }
};

var DEEP = true;

module.exports = {
    dyson: dyson,
    dyson_test: dysonTest,
    dyson_ci: extend(DEEP, {}, dysonTest, { options: { quiet: false } }),
    service: service,
    service_coverage: extend(DEEP, {}, service, { args: [ '-javaagent:../../web/test/libs/jacocoagent.jar=destfile=integration-coverage.coco' ].concat(service.args) }),
    waitToBootstrap: {
        cmd: 'sleep',
        args: [
            '3'
        ],
        options: {
            wait: true
        }
    }
};
