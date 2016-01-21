'use strict';

var generators = require('yeoman-generator');

var answers = {};

var camelCase = function(hyphenString) {
    return hyphenString.replace(/-([a-z])/g, function(m, w) { return w.toUpperCase(); });
}

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
    },

    getValues: function() {
        var done = this.async();
        this.prompt([{
            name: 'projectId',
            message: 'Project Id',
            default: this.appname.replace(/[\s_]/g, '-')
        }, {
            name: 'projectDescription',
            message: 'Project short description',
            default: 'QMG Angular Project'
        },
        {
            name: 'applicationTitle',
            message: 'Application default page title',
            default: 'Angular Application'
        }, {
            name: 'outfileName',
            message: 'Base filename for css and sprite output',
            default: function(currentAnswers) { return currentAnswers.projectId; }
        }, {
            name: 'angularModule',
            message: 'Angular module name',
            default: function(currentAnswers) { return 'QMetric.' + camelCase(currentAnswers.projectId); }
        }, {
            name: 'gtmPropertyName',
            message: 'Google Tag Manager stack property name',
            default:  function(currentAnswers) { return currentAnswers.projectId.replace(/-/g, '_') + '_gtm_id'; }
        }, {
            name: 'gtmLocalId',
            message: 'Google Tag Manager local/testing id',
            default: 'GTM-XXXXXX'
        }], function(receivedAnswers) {
            answers = receivedAnswers;
            answers.camelCaseProjectId = camelCase(receivedAnswers.projectId)
            done();
        });
    },

    copyFiles: function() {
        this.fs.copyTpl(this.templatePath('**/*'), this.destinationRoot(), answers);
        this.fs.copyTpl(this.templatePath('**/.*'), this.destinationRoot(), answers);
    },

    installProjectDependencies: function() {
        this.installDependencies();
    }
});
