/**
 * Created by NOUBISSI TAPAH PHOEB on 29/09/2016.
 */
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('axgrip.resultats_recherche', {
            url:'/resultats',
            views:{
                'main@':{

                        templateUrl: template_url+'resultats_recherche/resultats_recherche.html',
                        controller: 'resultatsRechercheCtrl'
                },
                'main2@':{}

            },
            access: { requiredLogin: true },
        })
        .state('axgrip.resultats_recherche.profil', {
            url: '/resultats_profil',
            views:{
                'main2@':{
                    templateUrl: template_url+'resultats_recherche/resultat_profil.html',
                    controller: 'ResultatProfilCtrl'
                }
            },
            access: { requiredLogin: true },
        })
        .state('axgrip.resultats_recherche.categorie', {
            url: '/resultats_categorie',
            views:{
                'main2@':{
                    templateUrl: template_url+'resultats_recherche/resultat_categorie.html',
                    controller: 'ResultatCategorieCtrl'
                }
            },
            access: { requiredLogin: true },

        })
        .state('axgrip.resultats_recherche.media', {
            url: '/resultats_media',
            views:{
                'main2@':{
                    templateUrl: template_url+'resultats_recherche/resultat_media.html',
                    controller: 'ResultatMediaCtrl'
                }
            },
            access: { requiredLogin: true },

        })
        .state('axgrip.resultats_recherche.groupe', {
            url: '/resultats_groupe',
            views:{
                'main2@':{
                    templateUrl: template_url+'resultats_recherche/resultat_groupe.html',
                    controller: 'ResultatGroupeCtrl'
                }
            },
            access: { requiredLogin: true },

        })
        .state('axgrip.resultats_recherche.user', {
            url: '/resultats_user',
            views:{
                'main2@':{
                    templateUrl: template_url+'resultats_recherche/resultat_user.html',
                    controller: 'ResultatUserCtrl'
                }
            },
            access: { requiredLogin: true },

        })


    $urlRouterProvider.otherwise('/new');

}])