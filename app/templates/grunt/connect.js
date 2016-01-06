'use strict';

var linkDirectoryToRoot = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    return {
        options: {
            port: 19999,
            hostname: 'localhost'
        },
        e2e: {
            options: {
                useAvailablePort: true,
                middleware: function(connect) {
                    return [
                        linkDirectoryToRoot(connect, './dist'),
                    ];
                }
            }
        }
    };
};
