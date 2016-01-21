/* eslint-env node */

'use strict';

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
    service_coverage: service,
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
