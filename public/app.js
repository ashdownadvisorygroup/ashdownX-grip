/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */
var app = angular.module('bv', ['ui.router','ngFileUpload','angular-loading-bar',
'ngSanitize','ngMessages','youtube-embed','slugifier','ngAria',
    'angular.filter','angular-thumbnails','ngAnimate','ngResource','ngStorage','fc.paging',
    'ngCookies','ngMaterial','ngImgCrop','jkAngularCarousel']);

var template_url="templates/";

app.run(function($rootScope, $state,AuthService, isAuthenticated,CategorieFactory,$location) {
    isAuthenticated.set(false);
    var item1=window.localStorage.getItem('Rememberme');
    var item2=window.localStorage.getItem('yourTokenKey');
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams,fromState) {
        if (toState.access.requiredLogin && !AuthService.isAuthenticated.get()) {
            event.preventDefault();
            $state.go('new');
        }
        if(toState.name=='new'){
            if(item1) {
                if (item2) {
                    $location.path('/accueil');
                }
            }
        }
    });
    $rootScope.$state = $state;

});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue', {
            'default': '300'
        })
        .accentPalette('deep-orange', {
            'default': '500'
        });
})