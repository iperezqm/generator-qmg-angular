'use strict';

angular.module('<%= angularModule %>.tracking', ['angulartics']).directive('qmgTrack', ($compile) => ({
    restrict: 'A',
    compile: (templateElement) => {
        templateElement.attr('qmg-track', null);
        templateElement.attr('qmg-event-label', null);
        templateElement.attr('analytics-on', '');
        templateElement.attr('analytics-event', '{{qmgTrack}}');
        templateElement.attr('analytics-label', '{{qmgEventLabel}}');
        templateElement.attr('analytics-category', '{{qmgTrackingCategory}}');

        return (scope, element, attributes) => {
            scope.$watch(() => {
                const TRACKING_CATEGORY_ATTRIBUTE = 'qmg-tracking-category';
                var trackingCategory = element.closest(`[${TRACKING_CATEGORY_ATTRIBUTE}]`).attr(TRACKING_CATEGORY_ATTRIBUTE);
                scope.qmgTrackingCategory = scope.$eval(trackingCategory);
                scope.qmgTrack = scope.$eval(attributes.qmgTrack);
                scope.qmgEventLabel = scope.$eval(attributes.qmgEventLabel);
            });
            $compile(element)(scope);
        };
    }
}));
