'use strict';

<%%= generatedFileWarning %>

angular.module('<%= angularModule %>.config', []);

angular.module('<%= angularModule %>.config').constant('configuration', {
    serviceUrl: '<%%= serviceUrl %>',
    googleTagManagerId: '<%%= googleTagManagerId %>'
});
