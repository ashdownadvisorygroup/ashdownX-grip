/**
 * Created by NOUBISSI TAPAH PHOEB on 01/10/2016.
 */
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('compte', {
            abstract:true,
            views:{
                header:{
                    templateUrl:template_url+'header.html',
                    controller: 'HeaderCtrl'
                },
                main1:{
                    templateUrl: template_url+'compte/main1.html',
                    controller: 'CompteCtrl'
                },
                main10:{},
                main11:{
                    templateUrl: template_url+'compte/main3.html',
                    controller: 'CompteCtrl'
                },



            },
            access: { requiredLogin: true },
        })
        .state('compte.infouser', {
            url: '/info_user/{id}',
            views:{
                'main10@':{
                    templateUrl: template_url+'compte/compte.html',
                    controller: 'InfoUserCtrl'
                }
            },
            params: { guide: null },
            access: { requiredLogin: true },
        })
        .state('compte.mofifier_profil', {
            url: '/mofifier_profil/{id}',
            views:{
                'main10@':{
                    templateUrl: template_url+'compte/compte.html',
                    controller: 'ModifierProfilCtrl'
                }
            },
            access: { requiredLogin: true },

        })
        .state('compte.creerprofil', {
            url: '/creer_profil',
            views:{
                'main10@':{
                    templateUrl: template_url+'compte/compte.html',
                    controller: 'CreerProfilCtrl'
                }
            },
            access: { requiredLogin: true },
        })
        .state('compte.creercategorie', {
            url: '/creer_categorie',
            views:{
                'main10@':{
                    templateUrl: template_url+'compte/compte.html',
                    controller: 'CreerCategorieCtrl'
                }
            },
            access: { requiredLogin: true },

        })
        .state('compte.creeruser', {
            url: '/creer_user',
            views:{
                'main10@':{
                    templateUrl: template_url+'compte/compte.html',
                    controller: 'CreerUserCtrl'
                }
            },
            access: { requiredLogin: true },

        })


    $urlRouterProvider.otherwise('/new');

}])