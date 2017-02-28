/*
Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
*/
function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}//verifie si un fichier est une url
function afficher_ecran(str) {
    var affiche;
    for (var i = 0, len = str.length; i < len; i++) {
        if(str[i].link){
            if(["mp4", "MP4"].includes(str[i].link.substr(str[i].link.lastIndexOf('.') + 1)))
            {
                str[i].affiche = "lien vers video";
            }
            else if(str[i].link.substr((str[i].link.lastIndexOf('.') + 1))=="pdf")
            {
                str[i].affiche  = "lien vers fichier_pdf";
            }
            else if(["mp3", "MP3"].includes(str[i].link.substr(str[i].link.lastIndexOf('.') + 1))){
                str[i].affiche  = "lien vers audio"
            }
            else if(isURL(str[i].link)){
                str[i].affiche  = "lien vers video_youtube";
            }
            else console.log('no match');
        }

    }
    return str;
}
/*
 // la fonction text_truncate permet de verifier la longueur voulue d'une chaine de caractères
 et de remplacer les terminaisons par "..."
 */
text_truncate = function(str, length, ending) {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};
app.controller('HeaderCtrl', function($scope,CategorieFactory,UserFactory,GroupFactory,ProfilFactory,LivreFactory,
                                   AuthService,youtubeEmbedUtils, $state,$q,$mdDialog,$cookieStore,$filter,
                                      $sce,$mdSidenav,$mdToast,sharedProperties,isAuthenticated,sharedmdtabactual2,SearchFactory,
 $rootScope,$localStorage) {
        $scope.selectedTab= $localStorage.selectedTab;

    $scope.$watch('selectedTab', function(newVal){
        newVal =newVal||0;
        $localStorage.selectedTab = newVal;
    },true);

        $scope.startIntro=function(){
           $state.go($state.$current.self.name,{guide:true});
        }


       $scope.rechercher= function(){
           SearchFactory.searchengine($scope.search).then(function(results){
               $rootScope.Results = results;
               $state.go('axgrip.resultats_recherche.profil');
           },function(err){
           })
       }

    $scope.openSideNavPanel = function() {
        $mdSidenav('right').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('right').close();
    };
    $scope.newUser=function(){
        $scope.affiche= !$scope.affiche;
    };

    UserFactory.getOne($cookieStore.get('user').id).then(function(msg) {

        if(msg.photo == null){
            $scope.photo =  "../../image/user.png";
        }
        else{
            $scope.photo =  msg.photo;
        }
    }, function(errMsg) {
    });
    $scope.profilaction = function(name, ev) {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(name)
                .content('You triggered the "' + name + '" action')
                .ok('Great')
                .targetEvent(ev)
        );
    };
    $scope.deconnexionaction = function(name, ev) {
        window.localStorage.removeItem('Rememberme');
         AuthService.logout();
            $state.go('new');
    };

    $scope.compteuser = function() {
        $state.go('compte.infouser',{id:$cookieStore.get('user').id});
        };
})

.controller('AppCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
        'youtubeEmbedUtils','$sce','$mdToast','$filter',
        function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
                  $state, AuthService,youtubeEmbedUtils,$sce,$mdToast,$filter) {


        }])
    .controller('GroupeCtrl', ['$scope','GroupFactory','$stateParams',
        function ($scope,GroupFactory, $stateParams) {
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
            $scope.showActionToast = function(text) {
                console.log(text)
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
            $scope.g=true;
            GroupFactory.getOne($stateParams.id).then(function (groupe) {
                $scope.groupe = groupe;
            });
            $scope.group=false;
            $scope.modifiergroupe=function(){
                $scope.group=true;
                $scope.g=false;
            }
            $scope.modifiegroupe=function(){
                GroupFactory.modifiergroupe($scope.group).then(function(answer) {
                    text="reussi"
                    $scope.showActionToast(text);
                }, function(err) {
                    text="echec"
                    $scope.showActionToast(text);
                });
            }
            $scope.retour=function(){
                $scope.group= !$scope.group;
                $scope.g=!$scope.g;
            };


        }])
.controller('AccueilCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
        'youtubeEmbedUtils','$sce','$mdToast','$filter','IntroFactory',
        function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
                  $state, AuthService,youtubeEmbedUtils,$sce,$mdToast,$filter,IntroFactory) {
            if($stateParams.guide===true)
            {
                angular.element(document).ready(function () {
                    $scope.CallMe();
                });
                $stateParams.guide=false;
            }
            $scope.IntroOptions = {
                steps:IntroFactory.getSteps('accueil'),
                showStepNumbers: true,
                exitOnOverlayClick: true,
                exitOnEsc:true,
                nextLabel: '<strong>Suivant!</strong>',
                prevLabel: '<span style="color:green">Précédent</span>',
                skipLabel: 'Quitter',
                doneLabel: 'Merci'
            };
            $scope.ShouldAutoStart = IntroFactory.auto_start_intro('accueil');
            $scope.ExitEvent = IntroFactory.ExitEvent;
            $scope.ChangeEvent = IntroFactory.changeEvent;
            $scope.hide1=false;
            $scope.hide2=false;
            $scope.afficher_cacher=function(){
                $scope.hide1=!$scope.hide1;
            }
            $scope.afficher_cacher2=function(){
                $scope.hide2=!$scope.hide2;
            }

            /*** partie pour les profils donc l'accueil de l'utilisateur***/
            var profilActuel=$cookieStore.get('user').profilActuel;
            var iduser=$cookieStore.get('user').id;
            var tab =[];
            var sat=[];
            $scope.currentPage= $scope.currentPageProf=1;
            $scope.step=$scope.stepProf=2;
            var medPerPage= 8,medPerPage_prof=3;
            $scope.quantity = 1;
            $scope.aff=false;
            $scope.determinateValue=40;
            //incremente readed lors d'un lecture ie lien vers le document
            $scope.lire = function(med){
                LivreFactory.readed(med._id).then(function(up){//permet d'incrementer automatiquement le champ lu
                    med.readed = up.readed;
                });
            };
            for (var i = 0, len = profilActuel.length; i < len; i++) {
                tab.push(profilActuel[i].id);
            }
            CategorieFactory.get().then(function (categories) {
                $scope.categories = categories;
            });
            ProfilFactory.get().then(function (profils) {
                $scope.profils = profils;
            });
            LivreFactory.get().then(function (medias) {
                $scope.medias = medias;
            });
            var vm = this;
             ProfilFactory.getcategorieProfils(tab,iduser).then(function () {

             $scope.profiles= ProfilFactory.profsCats;
             $scope.profile= ProfilFactory.profsCats;
                 $scope.tatol= Math.ceil(ProfilFactory.profsCats.length/medPerPage_prof);
                 $scope.profile= ProfilFactory.profsCats.slice(0,medPerPage_prof);
                 $scope.gotoPageProf = function() {
                     var j= $scope.currentPageProf;
                     $scope.profile= ProfilFactory.profsCats.slice(medPerPage_prof*j-medPerPage_prof,medPerPage_prof*j);

                 };
             $scope.allmedias=ProfilFactory.allMedias;//tous les medias des profils de l'utilisateur
             $scope.total = Math.ceil(ProfilFactory.allMedias.length/medPerPage);
             $scope.allmedias= ProfilFactory.allMedias.slice(0,medPerPage);
             $scope.gotoPage = function() {
             var i= $scope.currentPage;
             $scope.allmedias= ProfilFactory.allMedias.slice(medPerPage*i-medPerPage,medPerPage*i);
                 afficher_ecran($scope.allmedias);
             };
             $scope.longueur=$scope.allmedias.length;
             afficher_ecran($scope.allmedias);

             });
            $scope.aff_pop_not=function(){//fonction qui permet d'afficher les medias par ordre de lecture
                var one=[];
                $scope.allmedias=$filter('orderBy')($scope.allmedias,'-readed');
                for(var index in $scope.allmedias) {
                    one=one.concat($scope.allmedias[index])
                }
                $scope.allmedias=one;
            }
            //recuperation des stagiaires
            UserFactory.getuserprofil().then(function(stagiaires){
                $scope.stagiaires=stagiaires;
            });

        }])
    .controller('documentCtrl', ['$scope',
        'CategorieFactory','LivreFactory', '$stateParams', '$state','youtubeEmbedUtils','$sce','AuthService',function ($scope, CategorieFactory,LivreFactory, $stateParams, $state,youtubeEmbedUtils,$sce,AuthService) {
            CategorieFactory.getOneLivre($stateParams.id).then(function (liv) {
                $scope.media = liv;
                var fileExtension;
                fileExtension = $scope.media.link.substr(($scope.media.link.lastIndexOf('.') + 1));
                if(["mp4", "MP4"].includes(fileExtension))
                    $scope.affiche = "video";//[1, 2, 3].includes(3, -1);
                else if(fileExtension=="pdf")
                    $scope.affiche = "pdf";
                else if(["mp3", "MP3"].includes(fileExtension))
                    $scope.affiche = "audio";
                else{
                    $scope.affiche = "youtube";
                    $scope.theBestVideo = youtubeEmbedUtils.getIdFromURL($scope.media.link)
                }
            })
            $scope.telecharger = function(med){
                LivreFactory.downloaded(med._id).then(function(up){//permet d'incrementer automatiquement le champ lu
                    med.downloaded = up.downloaded;
                });
            };
        }])




    .controller('LoginNewCtrl', function($scope, AuthService,UserFactory, $state,$stateParams,$http,$mdToast,shared6,$cookieStore) {
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
        $scope.showActionToast = function(text) {
            console.log(text)
            var pinTo = $scope.getToastPosition();

            var toast = $mdToast.simple()
                .content(text)
                .action('OK')
                .position(pinTo);

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                }
            });
        };
        $scope.closeToast = function() {
            $mdToast.hide();
        };

        $scope.dataArray = [
            {
                src: "Des milliers d'utilisateurs classés selon les profils  et les motivations communes..."
            },
            {
                src: "Des milliers d'utilisateurs classés selon les profils  et les motivations communes..."
            },
            {
                src: "Des milliers d'utilisateurs classés selon les profils  et les motivations communes..."
            },
            {
                src: "Des milliers d'utilisateurs classés selon les profils  et les motivations communes..."
            },
            {
                src: "Des milliers d'utilisateurs classés selon les profils  et les motivations communes..."
            },
            {
                src: "Des milliers d'utilisateurs classés selon les profils  et les motivations communes..."
            },
            {
                src: "Des milliers d'utilisateurs classés selon les profils  et les motivations communes..."
            },
            {
                src: "Des milliers d'utilisateurs classés selon les profils  et les motivations communes..."
            }
        ];
        $scope.youremember=function(){
            window.localStorage.setItem('Rememberme', true);
        };
        $scope.affiche=true;
        $scope.affiche2=false;
        $scope.affiche3=false;
        $scope.logino = function() {
            console.log($scope.user)
            AuthService.login($scope.user).then(function(msg) {
                $state.go('axgrip.accueil');
            }, function(errMsg) {
                text="identification incorrect"
                $scope.showActionToast(text);
                $state.go('new');
            });
        };

        $scope.newUser=function(){
            $scope.affiche2=!$scope.affiche2;
            $scope.affiche= !$scope.affiche;

        };
        $scope.newUser2=function(){
            $scope.affiche2=true;
            $scope.affiche3= false;

        };
        var pourToken;
        $scope.forgot=function(){
            UserFactory.forgot($scope.user).then(function(msg) {
                $cookieStore.put('moment',msg.token);
                //alert($cookieStore.get('moment'))
                text="vous avez recu un email de verification"
                $scope.showActionToast(text);
                $scope.newUser2();
            }, function(errMsg) {
                text="email incorrect ou alors vérifiez votre connexion";
                $scope.showActionToast(text);
                $scope.newUser2();
            });
        };
        $http.get('/check-reset').then(function(data){
            var data=data.data;
            if(data){
                text="vous êtes autorisés à modifier le mot de passe";
                $scope.showActionToast(text);
                $scope.affiche=false;
                $scope.affiche2=false;
                $scope.affiche3=true;
                UserFactory.getToken($cookieStore.get('moment')).then(function(response){
                    $scope.updatespassword=function(){
                        UserFactory.updatepassword($scope.user,$cookieStore.get('moment')).then(function(msg) {
                            text="mot de passe reinitialisé";
                            $scope.showActionToast(text);
                            $scope.affiche= true;
                            $scope.affiche3= false;
                        }, function(errMsg) {
                            alert('mauvais');
                        });
                    }
                });
            }
            else{
                text="désolé email incorrect";
                $scope.showActionToast(text);
                $scope.affiche=true;
                $scope.affiche2=false;
                $scope.affiche3=false;
            }
        });

});






