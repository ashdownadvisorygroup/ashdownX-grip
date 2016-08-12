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
            .state('debut', {
                url: '/debut',
                templateUrl: template_url+'/debut.html',
                access: { requiredLogin: true },
                //controller: 'DebutCtrl'
            })
            .state('categorie', {
                url: '/categorie/{id}',
                templateUrl: template_url+'/categorie.html',
                access: { requiredLogin: true },
                controller: 'CategorieCtrl'
            })
            .state('formulaireLivre', {
                url: '/livre/nouveau',
                templateUrl: template_url+'/formulaireLivre.html',
                access: { requiredLogin: true },
                controller: 'FormulaireLivreCtrl'
            })
            .state('formulaireCategorie', {
                url: '/categories/nouveau',
                templateUrl: template_url+'/formulaireCategorie.html',
                access: { requiredLogin: true },
                controller: 'FormulaireCategorieCtrl'
            })
            .state('updateCategorie', {
                url: '/categories/update/{id}',
                templateUrl: template_url+'/updateCategorie.html',
                access: { requiredLogin: true },
                controller: 'updateCategorieCtrl'
            })
            .state('updateLivre', {
                url: '/livre/update/{id}',
                templateUrl: template_url+'/updateLivre.html',
                access: { requiredLogin: true },
                controller: 'updateLivreCtrl'
            })
            .state('deleteLivre', {
                url: '/livre/{id}',
                templateUrl: template_url+'/deleteLivre.html',
                access: { requiredLogin: true },
                controller: 'deleteLivreCtrl'
            })
            .state('download', {
                url: '/download',
                templateUrl: template_url+'/download.html',
                access: { requiredLogin: true },
                controller: 'downloadCtrl'
            })
            .state('document', {
                url: '/livre/document/{id}',
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
            .state('register', {
                url: '/register',
                templateUrl: template_url+'/register.html',
                access: { requiredLogin: false },
                controller: 'RegisterCtrl'
            })
            .state('updateuser', {
                url: '/updateuser',
                templateUrl: template_url+'/updateuser.html',
                access: { requiredLogin: false },
                controller: 'updateUserCtrl'
            })


    $urlRouterProvider.otherwise('/');

    }])
;