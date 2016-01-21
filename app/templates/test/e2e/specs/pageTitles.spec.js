'use strict';

describe('home page', () => {
    it('should have a descriptive page title', () => {
        browser.get('/');
        expect(browser.getTitle()).to.eventually.equal('Home | <%= applicationTitle %>');
    });
});
