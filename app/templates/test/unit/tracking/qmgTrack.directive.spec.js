'use strict';

describe('qmgTrack directive', () => {
    var $compile;
    var scope;

    var compileWithAttributes = (attributes) => {
        var element = $compile(`<div ${attributes}></div>`)(scope);
        scope.$digest();
        return element;
    };

    beforeEach(() => {
        angular.module('<%= angularModule %>.config', []);

        module('<%= angularModule %>.tracking');

        inject((_$compile_, $rootScope) => {
            $compile = _$compile_;
            scope = $rootScope.$new();
        });
    });

    it('should remove qmg-track attribute', () => {
        var element = compileWithAttributes('qmg-track');

        expect(element.attr('qmg-track')).to.be.undefined;
    });

    it('should add analytics-on attribute', () => {
        var element = compileWithAttributes('qmg-track');

        expect(element.attr('analytics-on')).to.equal('');
    });

    it('should track non-default events', () => {
        var element = compileWithAttributes(`qmg-track="'click'"`);

        expect(element.attr('analytics-event')).to.equal('click');
    });

    it('should define tracking event labels', () => {
        var element = compileWithAttributes(`qmg-track qmg-event-label="'thisIsTheLabel'"`);

        expect(element.attr('qmg-event-label')).to.be.undefined;
        expect(element.attr('analytics-label')).to.equal('thisIsTheLabel');
    });

    it('should read qmg-tracking-category from closest parent element', () => {
        var parentElement = $compile(`<div qmg-tracking-category="'parentCategory'"><div qmg-tracking-category="'inheritedCategory'"><p qmg-track></p></div></div>`)(scope);
        var element = parentElement.find('p');
        scope.$digest();
        expect(element.attr('analytics-category')).to.equal('inheritedCategory');
    });
});
