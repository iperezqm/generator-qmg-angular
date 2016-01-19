'use strict';

angular.module('<%= angularModule %>.router', ['ui.router', 'angulartics']).config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: `<div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="jumbotron">
                            <h1><%= angularModule %></h1>
                            <p><%= projectDescription %></p>
                        </div>
                    </div>
                </div>
            </div>`,
            data: {
                title: 'Home'
            }
        });
});

angular.module('<%= angularModule %>.router').config(($analyticsProvider) => {
    $analyticsProvider.virtualPageviews(false);
});

angular.module('<%= angularModule %>.router').run(($rootScope, $timeout, $analytics, $state) => {
    $rootScope.state = $state;
    $rootScope.$on('$stateChangeSuccess', () => {
        $timeout(() => $analytics.pageTrack($state.current.data.trackUrl || $state.current.url));
    });
});

angular.module('<%= angularModule %>.core', [
    '<%= angularModule %>.config',
    'ngMessages',
    'angular-momentjs',
    'ui.bootstrap',
    'ui.mask',
    '<%= angularModule %>.tracking'
]);

angular.module('<%= angularModule %>', ['<%= angularModule %>.core', '<%= angularModule %>.router', '<%= angularModule %>.googleTagmanager']).run(($rootScope, $window, googleTagManagerLoader) => {
    googleTagManagerLoader.run();

    $rootScope.$on('$viewContentLoaded', () => {
        $window.scrollTo(0, 0);
    });
});
