/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('accueil', {
                url: '/accueil',
                templateUrl: template_url+'/accueil.html',
                access: { requiredLogin: true },
                controller: 'AccueilCtrl'
            })
            .state('developpeurWebMean', {
                url: '/developpeurWebMean',
                templateUrl: template_url+'/developpeurWebMean.html',
                access: { requiredLogin: true },
                controller: 'developpeurWebMeanCtrl'
            })
            .state('categorie', {
                url: '/categorie/{id}',
                templateUrl: template_url+'/categorie.html',
                access: { requiredLogin: true },
                controller: 'CategorieCtrl',
                permissions: ["admin","stagiaire"]
            })
            .state('formulaireLivre', {
                url: '/media/nouveau',
                templateUrl: template_url+'/formulaireLivre.html',
                access: { requiredLogin: true },
                controller: 'FormulaireLivreCtrl',
                permissions: ["admin","stagiaire"]
            })
            .state('formulaireCategorie', {
                url: '/categories/nouveau',
                templateUrl: template_url+'/formulaireCategorie.html',
                access: { requiredLogin: true },
                controller: 'FormulaireCategorieCtrl',
                permissions: ["admin"]
            })
            .state('updateCategorie', {
                url: '/categories/update/{id}',
                templateUrl: template_url+'/updateCategorie.html',
                access: { requiredLogin: true },
                controller: 'updateCategorieCtrl',
                permissions: ["admin"]
            })
            .state('updateLivre', {
                url: '/media/update/{id}',
                templateUrl: template_url+'/updateLivre.html',
                access: { requiredLogin: true },
                controller: 'updateLivreCtrl',
                permissions: ["admin","stagiaire"]
            })
            .state('deleteLivre', {
                url: '/media/{id}',
                templateUrl: template_url+'/deleteLivre.html',
                access: { requiredLogin: true },
                controller: 'deleteLivreCtrl',
                permissions: ["admin"]
            })
            .state('download', {
                url: '/download',
                templateUrl: template_url+'/download.html',
                access: { requiredLogin: true },
                controller: 'downloadCtrl'
            })
            .state('document', {
                url: '/media/document/{id}',
                templateUrl: template_url+'/document.html',
                access: { requiredLogin: true },
                controller: 'documentCtrl'
            })
            .state('login', {
                url: '/',
                templateUrl: template_url+'/login.html',
                access: { requiredLogin: false },
                controller: 'LoginCtrl'
            })
            .state('new', {
                url: '/new',
                templateUrl: template_url+'/loginNew.html',
                access: { requiredLogin: true },
                controller: 'LoginNewCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: template_url+'/register.html',
                controller: 'RegisterCtrl',
                access: { requiredLogin: true },
                permissions: ["admin"]
            })
            .state('updateuser', {
                url: '/updateuser/{id}',
                templateUrl: template_url+'/updateuser.html',
                access: { requiredLogin: false },
                controller: 'updateUserCtrl',
                permissions: ["admin","stagiaire"]
            })


    $urlRouterProvider.otherwise('/');

    }])
    .run(function($rootScope, $state,AuthService, isAuthenticated) {

    isAuthenticated.set(false);
    $rootScope.$on('$stateChangeStart', function(event, nextRoute, currentRoute) {
        console.log("Appel d'une nouvelle route");
        //console.log(AuthService.isAuthenticated);
        //console.log(isAuthenticated.get());
        //console.log(AuthService.isAuthenticated.get())
        //onsole.log(nextRoute.access.requiredLogin && !AuthService.isAuthenticated.get())
        //AuthService.init();

        if (nextRoute.access.requiredLogin && !AuthService.isAuthenticated.get()) {
            event.preventDefault();
            $state.go('login');

            /*if (!AuthService.userHasPermissionForView(next)){
             event.preventDefault();
             $location.path("/login");
             }*/
        }
        //AuthService.init();
    });
});