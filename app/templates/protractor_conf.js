/* eslint-env node */
/* global protractor */

'use strict';

exports.config = {
    directConnect: false,

    framework: 'mocha',
    specs: ['test/dist/e2e/testSuiteHooks.js', 'test/dist/e2e/**/*.spec.js'],

    baseUrl: 'http://localhost:7906/',

    onPrepare: function() {
        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');

        GLOBAL.Q = require('q');
        GLOBAL.expect = chai.expect;

        chai.use(chaiAsPromised);
        chai.should();

        Object.defineProperty (
            protractor.promise.Promise.prototype,
            'should',
            Object.getOwnPropertyDescriptor(Object.prototype, 'should')
        );
    },

    mochaOpts: {
        reporter: 'dot',
        slow: 3000,
        timeout: 15000,
        colors: true
    }
};
