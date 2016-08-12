/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */
var app = angular.module('bv', ['ui.router','angularUtils.directives.dirPagination','ngFileUpload','angular-loading-bar'
,'ui.bootstrap','dialogs.main','ngSanitize','ngMessages','youtube-embed','angular.filter','angular-thumbnails']);

var template_url="templates/";

app.run(function($rootScope, $state,AuthService, isAuthenticated) {
    isAuthenticated.set(false);
    $rootScope.$on('$stateChangeStart', function(event, nextRoute, currentRoute) {
        //console.log("Appel d'une nouvelle route");
        //console.log(AuthService.isAuthenticated);
        //console.log(isAuthenticated.get());

        if (nextRoute.access.requiredLogin && !AuthService.isAuthenticated) {
            event.preventDefault();
            $state.go('login');
        }
    });
});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
}]);