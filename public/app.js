/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */
var app = angular.module('bv', ['ui.router','angularUtils.directives.dirPagination','ngFileUpload','angular-loading-bar','angular-bootstrap-select',
,'ui.bootstrap','dialogs.main','ngSanitize','ngMessages','youtube-embed',
    'angular.filter','angular-thumbnails','ngAnimate','ngResource','ngStorage','ngCookies','ngMaterial']);

var template_url="templates/";




app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);