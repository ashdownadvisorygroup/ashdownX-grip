/**
 * Created by NOUBISSI TAPAH PHOEB on 29/09/2016.
 */
app.controller('ProfilsCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','ProfilFactory', '$stateParams', '$state','AuthService','$mdToast','$mdDialog',
    '$filter',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,ProfilFactory, $stateParams, $state, AuthService,$mdToast,
              $mdDialog,$filter) {
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
                .position(pinTo)
                .action('OK');

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {

                }
            });
        };
        $scope.closeToast = function() {
            $mdToast.hide();
        };
        var tab =[],iduser,medPerPage=8;$scope.currentPage=1;$scope.step=5;
        ProfilFactory.get().then(function (profils) {
            $scope.profils = profils;
            tab=$scope.profils;
            ProfilFactory.getcategorieProfils(tab,iduser).then(function () {
                $scope.profile= ProfilFactory.profsCats;
                angular.forEach($scope.profile,function(dat){
                    dat.description=text_truncate(dat.description,46);
                })
                $scope.total = Math.ceil(ProfilFactory.profsCats.length/medPerPage);
                $scope.profile= ProfilFactory.profsCats.slice(0,medPerPage);
                $scope.gotoPage = function() {
                    var i=$scope.currentPage;
                    $scope.profile=ProfilFactory.profsCats.slice(medPerPage*i-medPerPage,medPerPage*i);
                };

                $scope.$watch('searchprof', function(newVal){
                    if(newVal){
                        $scope.profile=$filter('filter')(ProfilFactory.profsCats,newVal)
                        $scope.total = Math.ceil($scope.profile.length/medPerPage);
                        var tempe=$scope.profile;
                        $scope.profile=  $scope.profile.slice(0,medPerPage);
                        $scope.gotoPage = function() {
                            var i=$scope.currentPage;
                            $scope.profile= tmpe.slice(medPerPage*i-medPerPage,medPerPage*i);
                        };
                    }
                    else{
                        $scope.profile = ProfilFactory.profsCats;
                        $scope.total = Math.ceil(ProfilFactory.profsCats.length/medPerPage);
                        $scope.profile= ProfilFactory.profsCats.slice(0,medPerPage);
                        $scope.gotoPage = function() {
                            var i=$scope.currentPage;
                            $scope.profile=ProfilFactory.profsCats.slice(medPerPage*i-medPerPage,medPerPage*i);

                        };
                    }
                }, true);
            });
        });
        $scope.triscat=function(prof){
            $state.go('axgrip.profil',{id:prof._id})
        };
        $scope.showConfirmdelprof = function(ev,prf) {
            var confirm = $mdDialog.confirm()
                .title('voulez-vous supprimer ce profil?')
                .content('vous êtes sur le point de supprimer le profil')
                .ariaLabel('bonne chance')
                .targetEvent(ev)
                .ok('Oui!')
                .cancel('Annuler');
            $mdDialog.show(confirm).then(function() {
                ProfilFactory.deletes(prf).then(function (profil) {
                    $scope.profile.splice($scope.profile.indexOf(prf),1);//suppression d'un profil
                    text="profil supprimé"
                    $scope.showActionToast(text)
                });
            }, function(msg) {
            });
        };



    }])
    .controller('ProfilCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','ProfilFactory', '$stateParams', '$state','AuthService','$mdToast',
        function ($scope,$cookieStore, CategorieFactory,LivreFactory,ProfilFactory, $stateParams, $state, AuthService,$mdToast) {
            var tab =[],iduser,medPerPage=5;$scope.currentPage=1;$scope.step=5;
            ProfilFactory.getOne($stateParams.id).then(function (profils) {

                $scope.profil = profils;
                angular.forEach($scope.profil.categorieprofil,function(dat){
                    dat.description=text_truncate(dat.description,46);
                })
                    $scope.total = Math.ceil(profils.categorieprofil.length/medPerPage);
                    $scope.profil.categorieprofil= profils.categorieprofil.slice(0,medPerPage);
                    $scope.gotoPage = function() {
                        var i=$scope.currentPage;
                        $scope.profil.categorieprofil=profils.categorieprofil.slice(medPerPage*i-medPerPage,medPerPage*i);
                    };
            });




        }])
    .controller('ModifierProfilsCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','ProfilFactory', '$stateParams', '$state','AuthService','$mdToast',
        function ($scope,$cookieStore, CategorieFactory,LivreFactory,ProfilFactory, $stateParams, $state, AuthService,$mdToast) {
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
                    .position(pinTo)
                    .action('OK');

                $mdToast.show(toast).then(function(response) {
                    if ( response == 'ok' ) {
                    }
                });
            };
            $scope.closeToast = function() {
                $mdToast.hide();
            };
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
            ProfilFactory.getOne($stateParams.id).then(function (profils) {

                $scope.profnew = profils;

            });
            $scope.modifprof=function(){

                ProfilFactory.modifierProfil($scope.profnew).then(function(answer) {
                    text="reussi"
                    $scope.showActionToast(text);
                }, function(err) {
                    text="echec"
                    $scope.showActionToast(text);
                });
            }

        }])