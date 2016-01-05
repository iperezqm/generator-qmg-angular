/* eslint-env node */

'use strict';

var path = require('path');
var webDistPath = path.resolve(__dirname, '../dist');
var extend = require('extend');

var dyson = {
    args: [
        'node_modules/.bin/dyson',
        'test/dist/dyson/services'
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
    cmd: 'java',
    args: [
          '-jar',
          '-Ddw.assets.overrides./=' + webDistPath,
          '-Ddw.shiroConfigLocations=classpath:shiro_ci.ini',
          '-Ddw.server.applicationConnectors[0].port=<%%= freeport.service %>',
          '-Ddw.server.adminConnectors[0].port=<%%= freeport.serviceAdmin %>',
          '-Ddw.customerDataEndpointUrl=http://localhost:<%%= freeport.dyson %>/',
          '-Ddw.customerFolderUrl=http://localhost:<%%= freeport.dyson %>/customer-folder',
          '-Ddw.emailFeedUrl=http://localhost:<%%= freeport.dyson %>/feed',
          'one-account-service.jar',
          'server',
          './classes/config.yaml'
      ],
    options: {
        cwd: '../service/target',
        wait: false,
        ready: 2000
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
