/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('axgrip',{
                abstract:true,
                views:{
                    header:{
                        templateUrl:template_url+'header.html',
                        controller: 'HeaderCtrl'
                    },
                    main:{}
                },
                access: { requiredLogin: true }
            })
            .state('axgrip.accueil', {
                url: '/accueil',
                views:{
                    'main@':{
                        templateUrl: template_url+'accueil.html',
                        controller: 'AccueilCtrl'
                    }
                },
                access: { requiredLogin: true }
            })
            .state('axgrip.profils', {
                url: '/profils',
                views:{
                    'main@':{
                        templateUrl: template_url+'profils.html',
                        controller: 'ProfilsCtrl'
                    }
                },
                access: { requiredLogin: true }
            })
            .state('axgrip.mediatheque', {
                url: '/mediatheque',
                views:{
                    'main@':{
                        templateUrl: template_url+'/mediatheque.html',
                        controller: 'MediathequeCtrl'
                    }
                },
                access: { requiredLogin: true }
            })
            .state('axgrip.useraccount', {
                url: '/useraccount/{id}',
                views:{
                    'main@':{
                        templateUrl: template_url+'/useraccount.html',
                        controller: 'UseraccountCtrl'
                    }
                },
                access: { requiredLogin: true }
            })
            .state('axgrip.compte', {
                url: '/compte/{id}',
                views:{
                    'main@':{
                        templateUrl: template_url+'/compte.html',
                        controller: 'CompteCtrl'
                    }
                },
                access: { requiredLogin: true }//permissions: ["admin","stagiaire"]
            })
            .state('document', {
                url: '/document/{id}',
                templateUrl: template_url+'/document.html',
                access: { requiredLogin: true },
                controller: 'documentCtrl'
            })
            .state('new', {
                url: '/new',
                templateUrl: template_url+'login/loginNew.html',
                access: { requiredLogin: false },
                controller: 'LoginNewCtrl'

            })
            .state('axgrip.resultats_recherche', {
                url: '/resultats',
                views:{
                    'main@':{
                        templateUrl: template_url+'/resultats_recherche.html',
                        controller: 'resultatsRechercheCtrl'
                    }
                },
                access: { requiredLogin: true },

            })
            .state('axgrip.renewpassword', {
                url: '/{name}/{name2}',
                views:{
                    'main@':{
                        templateUrl: template_url+'login/loginNew.html'
                    }
                },
                params: { name2: null,name: null },
                access: { requiredLogin: true },
                controller: 'LoginNewCtrl',
                permissions: ["admin","stagiaire"]
            })



    $urlRouterProvider.otherwise('/new');

    }]);
