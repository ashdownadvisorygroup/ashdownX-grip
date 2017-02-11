/**
 * Created by NOUBISSI TAPAH PHOEB on 01/10/2016.
 */
app.controller('CompteCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','GroupFactory',
    '$mdToast',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,GroupFactory,$mdToast) {
        /*** partie pour les profils donc l'accueil de l'utilisateur***/
        var profilActuel=$cookieStore.get('user').profilActuel;
        var tab =[];
        var tabmaster=[];
        var sat=[];
        $scope.compte=true;
        var medPerPage=8;
        var iduser=$cookieStore.get('user').id;
        for (var i = 0, len = profilActuel.length; i < len; i++) {
            tab.push(profilActuel[i].id);
        }
        ProfilFactory.getcategorieProfils(tab,iduser).then(function () {
            $scope.profile= ProfilFactory.profsCats;
        });
        //recuperation des stagiaires
        UserFactory.getuserprofil().then(function(stagiaires){
            $scope.stagiaires=stagiaires;
        });

    }])
.controller('InfoUserCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','GroupFactory',
    '$mdToast',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,GroupFactory,$mdToast) {

        $scope.infouse=true;
        $scope.iduser=$cookieStore.get('user').id;
        UserFactory.getOne($stateParams.id).then(function (us) {
            $scope.u = us;
       });

    }])
    .controller('ModifierProfilCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','GroupFactory',
    '$mdToast',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,GroupFactory,$mdToast) {

        /***
         *
         *partie des toast pour les notification
         */
        var text="";
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.toastPosition = angular.extend({},last);

        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }
        $scope.showActionToast = function() {
            var pinTo = $scope.getToastPosition();
            var toast = $mdToast.simple()
                .content(text)
                .action('ANNULER')
                .highlightAction(true)
                .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
                .position(pinTo);

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    alert('ok');
                }
            });
        };
        $scope.closeToast = function() {
            $mdToast.hide();
        };
        UserFactory.getOne($stateParams.id).then(function (us) {
            $scope.user = us;
        });
        $scope.modifuse=true;$scope.iduser=$cookieStore.get('user').id;
        $scope.$watch('photo', function () {
            if ($scope.photo != null) {
                $scope.files = [$scope.photo];
            }
        });

        $scope.modifieruser=function(){
            UserFactory.updateuser($scope.user).then(function(answer) {
                text="reussi";
                $scope.showActionToast(text);
            }, function(err) {
                text="echec";
                $scope.showActionToast(text);
            });
        };

    }])
    .controller('CreerProfilCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','GroupFactory',
    '$mdToast',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,GroupFactory,$mdToast) {
        $scope.iduser=$cookieStore.get('user').id;

        /***
         *
         *partie des toast pour les notification
         */
        var text="";
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.toastPosition = angular.extend({},last);

        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }
        $scope.showActionToast = function() {
            var pinTo = $scope.getToastPosition();
            var toast = $mdToast.simple()
                .content(text)
                .action('ANNULER')
                .highlightAction(true)
                .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
                .position(pinTo);

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    alert('ok');
                }
            });
        };
        $scope.closeToast = function() {
            $mdToast.hide();
        };
        CategorieFactory.get().then(function (categories) {
            $scope.categories = categories;
        });
        $scope.profnew={data:[""]};
        $scope.addRow = function(index){
            var name="";
            if($scope.profnew.data.length <= index+1){
                $scope.profnew.data.splice(index+1,0,name);
            }
        };
        $scope.deleteRow = function($event,index){
            if($event.which == 1)
                $scope.profnew.data.splice(index,1);
        }
        $scope.newprof=function(){
            ProfilFactory.ajouterProfil($scope.profnew).then(function(answer) {
                text="reussi"
                $scope.showActionToast(text);
            }, function(err) {
                text="echec"
                $scope.showActionToast(text);
            });
        }

    }])
    .controller('CreerCategorieCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','GroupFactory',
    '$mdToast',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,GroupFactory,$mdToast) {
        $scope.iduser=$cookieStore.get('user').id;
        /***
         *
         *partie des toast pour les notification
         */
        var text="";
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.toastPosition = angular.extend({},last);

        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }
        $scope.showActionToast = function() {
            var pinTo = $scope.getToastPosition();
            var toast = $mdToast.simple()
                .content(text)
                .action('ANNULER')
                .highlightAction(true)
                .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
                .position(pinTo);

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    alert('ok');
                }
            });
        };
        $scope.catnew={};
        $scope.closeToast = function() {
            $mdToast.hide();
        };
        $scope.newcat=function(){
            CategorieFactory.ajoutercategorie($scope.catnew).then(function(answer) {
                text="categorie crée"
                $scope.showActionToast(text);
            }, function(err) {
                text="echec"
                $scope.showActionToast(text);
            });
        };


    }])
    .controller('CreerUserCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','GroupFactory',
    '$mdToast',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,GroupFactory,$mdToast) {

        $scope.iduser=$cookieStore.get('user').id;
        /***
         *
         *partie des toast pour les notification
         */
        var text="";
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.toastPosition = angular.extend({},last);

        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }
        $scope.showActionToast = function() {
            var pinTo = $scope.getToastPosition();
            var toast = $mdToast.simple()
                .content(text)
                .action('ANNULER')
                .highlightAction(true)
                .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
                .position(pinTo);

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    alert('ok');
                }
            });
        };
        $scope.creeuse=true;
        $scope.utilisateur={};
        $scope.closeToast = function() {
            $mdToast.hide();
        };
        ProfilFactory.get().then(function (profils) {
            $scope.profils = profils;
        });
        $scope.$watch('photo', function () {
            if ($scope.photo != null) {
                $scope.files = [$scope.photo];
            }
        });
        ProfilFactory.get().then(function (profils) {
            $scope.profils = profils;
        });
        GroupFactory.get().then(function (groups) {
            $scope.groups = groups;
        });
        $scope.nouveauuser=function(){
            AuthService.register($scope.utilisateur).then(function(answer) {
                text="reussi";
                $scope.showActionToast(text);
            }, function(err) {
                console.log(err);
                text="echec surement lutilisateur existe déjà";
                $scope.showActionToast(text);
            });
        };
    }])