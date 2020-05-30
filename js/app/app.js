define(['angular'], function() {
    var app = angular.module('orgChartApp', []);
    app.init = function() {
        angular.bootstrap(document, ['orgChartApp']);
    };

    return app;
});