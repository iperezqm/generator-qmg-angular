'use strict';

var $rootScope;
var $state;

describe('when route changes', () => {
    var $window;

    beforeEach(module('<%= angularModule %>'));

    beforeEach(() => {
        inject((_$rootScope_, _$window_) => {
            $rootScope = _$rootScope_;
            $window = _$window_;
        });
    });

    it('should scroll to the top', () => {
        var scrollToSpy = sinon.spy($window, 'scrollTo');
        $rootScope.$broadcast('$viewContentLoaded');
        expect(scrollToSpy).to.have.been.calledWith(0);
        scrollToSpy.restore();
    });
});

describe('tracking', () => {
    describe('when application is loaded', () => {
        var googleTagManagerRun;

        beforeEach(() => {
            googleTagManagerRun = sinon.spy();

            angular.module('QMetric.googleTagManager', []).service('googleTagManagerLoader', () => ({
                run: googleTagManagerRun
            }));

            module('<%= angularModule %>');

            inject();
        });

        it('should load Google Tag Manager script', () => {
            expect(googleTagManagerRun).to.have.been.called;
        });
    });

    describe('after application is loaded', () => {
        var $analytics;
        var $timeout;

        beforeEach(() => {
            module('<%= angularModule %>.router');

            inject((_$rootScope_, _$analytics_, _$timeout_, _$state_) => {
                $rootScope = _$rootScope_;
                $analytics = _$analytics_;
                $timeout = _$timeout_;
                $state = _$state_;
                sinon.spy($analytics, 'pageTrack');
            });
        });

        afterEach(() => {
            $analytics.pageTrack.restore();
        });

        it('should disable angulartics default page tracking', () => {
            $analytics.pageTrack.reset();
            $rootScope.$broadcast('$stateChangeSuccess');
            expect($analytics.pageTrack).to.have.not.been.called;
        });

        describe('after state changes', () => {
            beforeEach(() => {
                $rootScope.$broadcast('$stateChangeSuccess');
                $state.current.url = 'this/is/the/url/to/track';
                $state.current.data = {};
            });

            it('should track current state url after state changes successfully', () => {
                $timeout.flush();
                expect($analytics.pageTrack).to.have.been.calledWith('this/is/the/url/to/track');
            });

            it('should track current state custom url when provided state changes successfully', () => {
                $state.current.data.trackUrl = 'custom/url/to/track';
                $timeout.flush();
                expect($analytics.pageTrack).to.have.been.calledWith('custom/url/to/track');
            });
        });

        describe('parametrized urls', () => {
            it('should define tracking urls', () => {
                var allStates = $state.get();
                allStates.forEach((state) => {
                    if (state.url.indexOf(':') !== -1) {
                        expect(state.data.trackUrl, `state ${state.name} data.trackUrl`).to.not.be.undefined;
                    }
                });
            });
        });
    });
});

describe('page titles', () => {
    beforeEach(module('<%= angularModule %>.router'));

    beforeEach(() => {
        inject((_$state_) => {
            $state = _$state_;
        });
    });

    it('should be defined for non-abstract states', () => {
        var allStates = $state.get();
        allStates.forEach((state) => {
            if (!state.abstract) {
                expect(state.data.title, `state ${state.name} data.title`).to.not.be.undefined;
            }
        });
    });
});
