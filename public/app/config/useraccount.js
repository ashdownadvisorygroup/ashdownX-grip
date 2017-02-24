/**
 * Created by NOUBISSI TAPAH PHOEB on 30/09/2016.
 */
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('axgrip.useraccount', {
            url: '/useraccount/{id}',
            views:{
                'main@':{
                    templateUrl: template_url+'/useraccount.html',
                    controller: 'UseraccountCtrl'
                }
            },
            params: { guide: null },
            access: { requiredLogin: true }
        })
        .state('axgrip.user', {
            url: '/user/{id}',
            views:{
                'main@':{
                    templateUrl: template_url+'/useraccount.html',
                    controller: 'UseraccountUserCtrl'
                }
            },
            access: { requiredLogin: true }
        })
        .state('axgrip.profil_termines', {
            url:'/user/{id}'+ '/profils_termines',
            views:{
                'main@':{
                    templateUrl: template_url+'/useraccount.html',
                    controller: 'UseraccounProfilstCtrl'
                },

            },
            access: { requiredLogin: true }
        })


    $urlRouterProvider.otherwise('/new');

}])