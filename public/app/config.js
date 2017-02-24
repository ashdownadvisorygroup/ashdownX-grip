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
                    main:{},
                    main2:{}

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
                params: { guide: null },
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
                params: { guide: null },
                access: { requiredLogin: true }
            })
            .state('axgrip.modifprofil', {
                url: '/modifier_profil/{id}',
                views:{
                    'main@':{
                        templateUrl: template_url+'profils.html',
                        controller: 'ModifierProfilsCtrl'
                    }
                },
                access: { requiredLogin: true }
            })
            .state('axgrip.profil', {
                url: '/profil/{id}',
                views:{
                    'main@':{
                        templateUrl: template_url+'profils.html',
                        controller: 'ProfilCtrl'
                    }
                },
                params: { guide: null },
                access: { requiredLogin: true }
            })
            .state('axgrip.mediatheque', {
                url: '/categories',
                views:{

                        'main@':{
                            templateUrl: template_url+'/mediatheque/mediatheque.html',
                            controller: 'CategoriesCtrl'
                        }
                },
                params: { guide: null },
                access: { requiredLogin: true }
            })
            .state('axgrip.categorie', {
                url: '/categorie/{id}',
                views:{

                        'main@':{
                            templateUrl: template_url+'/mediatheque/mediatheque.html',
                            controller: 'CategorieCtrl'
                        }

                },
                params: { guide: null },
                access: { requiredLogin: true }
            })
            .state('axgrip.groupe', {
                url: '/groupe/{id}',
                views:{
                    'main@':{
                        templateUrl: template_url+'/groupe.html',
                        controller: 'GroupeCtrl'
                    }
                },
                access: { requiredLogin: true }
            })
            .state('document', {
                url: '/document/{id}',
                views:{
                    header:{
                    },
                    main:{
                        templateUrl: template_url+'/document.html',
                        controller: 'documentCtrl'

                    },
                    main2:{}

                },
                access: { requiredLogin: true },

            })
            .state('new', {
                url: '/new',
                views:{
                    header:{
                    },
                    main:{
                        templateUrl: template_url+'login/loginNew.html',
                        controller: 'LoginNewCtrl',
                    },
                    main2:{}

                },

                access: { requiredLogin: false },


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

    }])
.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);