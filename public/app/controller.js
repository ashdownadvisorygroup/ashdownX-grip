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
                                      $sce,$mdSidenav,$mdToast,sharedProperties,isAuthenticated,sharedmdtabactual) {

        $scope.$watch('selectedTab', function () {
            console.log($scope.selectedTab)
            sharedmdtabactual.set($scope.selectedTab)
            console.log(sharedmdtabactual.get())
            if(sharedmdtabactual.get())$scope.selectedTab = 0;
            else $scope.selectedTab = sharedmdtabactual.get();


        });

        $scope.$watch('search', function () {
            if($scope.search){
                sharedProperties.setProperty($scope.search);
                $state.go('axgrip.resultats_recherche');
            }
        });

    $scope.openSideNavPanel = function() {
        $mdSidenav('right').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('right').close();
    };
    $scope.newUser=function(){
        $scope.affiche= !$scope.affiche;
    };
    var id=$cookieStore.get('user').id;
    UserFactory.getOne(id).then(function(msg) {
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
                .textContent('You triggered the "' + name + '" action')
                .ok('Great')
                .targetEvent(ev)
        );
    };
    $scope.deconnexionaction = function(name, ev) {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(name)
                .textContent('You triggered the "' + name + '" action')
                .ok('Great')
                .targetEvent(ev)
        );
         AuthService.logout();
            $state.go('new');
    };

    $scope.compteuser = function() {
        $state.go('axgrip.compte',{id:$cookieStore.get('user').id});
        };
})

.controller('AccueilCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
        'youtubeEmbedUtils','$sce','menu','$mdToast','$filter',
        function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
                  $state, AuthService,youtubeEmbedUtils,$sce,menu,$mdToast,$filter) {
            /*** partie pour les profils donc l'accueil de l'utilisateur***/
            var profilActuel=$cookieStore.get('user').profilActuel;
            var iduser=$cookieStore.get('user').id;
            var tab =[];
            var sat=[];
            $scope.currentPage=1;
            $scope.step=5;
            var medPerPage=8;
            $scope.quantity = 1;
            $scope.aff=false;
            $scope.determinateValue=40;
            iduser=$cookieStore.get('user').id;
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
                 //functions for menu-link and menu-toggle
                 vm.isOpen = isOpen;
                 vm.toggleOpen = toggleOpen;
                 vm.autoFocusContent = false;
                 vm.menu = menu;
                 $scope.menu=menu;
                 vm.status = {
                     isFirstOpen: true,
                     isFirstDisabled: false
                 };
                 function isOpen(prf) {
                     return menu.isSectionSelected(prf);
                 }
                 function toggleOpen(prf) {
                     menu.toggleSelectSection(prf);
                 }
                 vm.tri=function(ct){
                     $scope.allmedias=ct.medias;
                     afficher_ecran($scope.allmedias);
                 };
             $scope.profile= ProfilFactory.profsCats;
             $scope.allmedias=ProfilFactory.allMedias;//tous les medias des profils de l'utilisateur
             $scope.total = Math.ceil(ProfilFactory.allMedias.length/medPerPage);
             $scope.allmedias= ProfilFactory.allMedias.slice(0,medPerPage);
             $scope.gotoPage = function() {
             var i= $scope.currentPage;
             $scope.allmedias= ProfilFactory.allMedias.slice(medPerPage*i-medPerPage,medPerPage*i);
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
.controller('resultatsRechercheCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
        'youtubeEmbedUtils','$sce','menu','$mdToast','$filter','sharedProperties','GroupFactory',
        function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
                  $state, AuthService,youtubeEmbedUtils,$sce,menu,$mdToast,$filter,
                  sharedProperties,GroupFactory) {
            $scope.l1=$scope.l2=$scope.l3=$scope.l4=$scope.l5=0;
            $scope.lire = function(med){
                LivreFactory.readed(med._id).then(function(up){//permet d'incrementer automatiquement le champ lu
                    med.readed = up.readed;
                });
            };
            GroupFactory.get().then(function (groups) {
                $scope.groups = groups;
            });
            CategorieFactory.get().then(function (categories) {
                $scope.categories = categories;
                angular.forEach($scope.categories,function(dat){
                        afficher_ecran(dat.medias);
                })
            });
            UserFactory.get().then(function (users) {
                $scope.users = users;
            }); $scope.ouvrircat=$scope.ouvrirmed=$scope.ouvrecatmed=false;
            $scope.ouvrircatprof=function(){
                $scope.ouvrircat=!$scope.ouvrircat;
            }
            $scope.ouvrircatmed=function(){
                $scope.ouvrirmed=!$scope.ouvrirmed;
            }
            $scope.catmed=function(){
                $scope.ouvrecatmed=!$scope.ouvrecatmed;
            }
            $scope.step=6;
            var iduser,tab=[],medPerPage=1;
            ProfilFactory.get().then(function (profils) {
                $scope.profils = profils;
                tab=profils;
                ProfilFactory.getcategorieProfils(tab,iduser).then(function () {
                    $scope.profile= ProfilFactory.profsCats;
                    $scope.medias=ProfilFactory.allMedias;//tous les medias des profils de l'utilisateur
                    $scope.total = Math.ceil(ProfilFactory.profsCats.length/medPerPage);
                    $scope.profile= ProfilFactory.profsCats.slice(0,medPerPage);
                    $scope.gotoPage = function() {
                        var i= $scope.currentPage;
                        $scope.profile= ProfilFactory.profsCats.slice(medPerPage*i-medPerPage,medPerPage*i);
                    };
                    afficher_ecran($scope.medias);

                });
            })
            /**
             * pour observer le changement dans un service ceci permet d'actualiser la recherche à tout moment
              */
            $scope.afficheres=false;
            $scope.sharedProperties = sharedProperties;
            $scope.$watch('sharedProperties.getProperty()', function(newVal){
                $scope.afficheres=true;
                if(newVal != 'First'){
                    if(ProfilFactory.allMedias)$scope.medias=ProfilFactory.allMedias;
                    if(ProfilFactory.profsCats)$scope.profile=ProfilFactory.profsCats;
                    if(GroupFactory.groups)$scope.groups= GroupFactory.groups;
                    if(CategorieFactory.categories)$scope.categories=CategorieFactory.categories;
                    if(UserFactory.userss)$scope.users=UserFactory.userss;
                    //permet de verifier si la longueur actuelle de scope .user est égale à celle du get de la
                    // factory.si ce n'est pas le cas on met à jour au début du filtrage
                    $scope.medias=$filter('filter')($scope.medias,newVal);
                    $scope.l1=$scope.medias.length;
                    $scope.profile= $filter('filter')($scope.profile,newVal);
                    $scope.l2=$scope.profile.length;
                    $scope.groups= $filter('filter')($scope.groups,newVal);
                    $scope.l3=$scope.groups.length;
                    $scope.users= $filter('filter')($scope.users,newVal);
                    $scope.l4=$scope.users.length;
                    $scope.categories= $filter('filter')($scope.categories,newVal);
                    $scope.l5=$scope.categories.length;
                }
            }, true);
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
                    console.log(youtubeEmbedUtils.getIdFromURL($scope.media.link));
                }
            })
        }])

    .controller('CompteCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','GroupFactory',
        'menu','$mdToast',
        function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
                  $state, AuthService,GroupFactory,menu,$mdToast) {

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
                    .textContent(text)
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

            var vm = this;
            //functions for menu-link and menu-toggle
            vm.isOpen = isOpen;
            vm.toggleOpen = toggleOpen;
            vm.autoFocusContent = false;
            vm.menu = menu;
            $scope.menu=menu;
            vm.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };
            function isOpen(section) {
                return menu.isSectionSelected(section);
            }
            function toggleOpen(section) {
                menu.toggleSelectSection(section);
            }
            /*** partie pour les profils donc l'accueil de l'utilisateur***/
            var profilActuel=$cookieStore.get('user').profilActuel;
            var tab =[];
            var tabmaster=[];
            var sat=[];
            $scope.currentPage=1;
            $scope.step=5;
            var medPerPage=8;
            $scope.quantity = 1;
            $scope.aff=false;
            $scope.determinateValue=40;
            var iduser=$cookieStore.get('user').id;
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
            ProfilFactory.getcategorieProfils(tab,iduser).then(function () {
                $scope.profile= ProfilFactory.profsCats;
            });
            //recuperation des stagiaires
            UserFactory.getuserprofil().then(function(stagiaires){
                $scope.stagiaires=stagiaires;
            });

            $scope.modifuser=false;
            $scope.$watch('photo', function () {
                if ($scope.photo != null) {
                    $scope.files = [$scope.photo];
                    console.log($scope.files)
                }
            });
            ProfilFactory.get().then(function (profils) {
                $scope.profils = profils;
            });
            GroupFactory.get().then(function (groups) {
                $scope.groups = groups;
            });
            UserFactory.getOne($stateParams.id).then(function (us) {
                $scope.u = us;
                $scope.modruser= function () {
                    $scope.modifuser=!$scope.modifuser;
                    $scope.user=us;
                }
            });
            $scope.nouveauuser=function(){
                AuthService.register($scope.userm).then(function(answer) {
                    text="reussi";
                    $scope.showActionToast(text);
                }, function(err) {
                    text="echec surement lutilisateur existe déjà";
                    $scope.showActionToast(text);
                });
            };
            $scope.modifieruser=function(){
                UserFactory.updateuser($scope.user).then(function(answer) {
                    text="reussi";
                    $scope.showActionToast(text);
                }, function(err) {
                    text="echec";
                    $scope.showActionToast(text);
                });
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
            $scope.profnew={data:[""]};

            $scope.addRow = function(index){
                if($scope.profnew.data.length <= index+1){
                    $scope.profnew.data.splice(index+1,0,"");
                }
            };

            $scope.deleteRow = function($event,index){
                if($event.which == 1)
                    $scope.profnew.data.splice(index,1);
            }
            $scope.newprof=function(){
                alert('i')
                ProfilFactory.ajouterProfil($scope.profnew).then(function(answer) {
                    text="reussi"
                    $scope.showActionToast(text);
                }, function(err) {
                    text="echec"
                    $scope.showActionToast(text);
                });
            }
        }])
    .controller('UseraccountCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','$mdToast',
        '$filter',
        function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory,
                  $stateParams, $state, AuthService,$mdToast,$filter) {
            $scope.aff_profter= $scope.aff_don=false;
            $scope.aff_med=true;
            $scope.affiche_don=function(){//données du stagiaire
                $scope.aff_don=!$scope.aff_don;
                $scope.aff_med=false;
            }
            $scope.affiche_profter=function(){//affichage des profils terminés
                $scope.aff_profter=!$scope.aff_profter;
                $scope.aff_med=false;
                $scope.profter=$filter('filter')($scope.profile,{'progressuser':'100'});//profils terminés
            }

            $scope.currentPage=1;
            $scope.step=5;
            var medPerPage=8;
            var tabprog=[];
            var tabprog2=[];
            ProfilFactory.get().then(function (profils) {
                $scope.profils = profils;
            });
            LivreFactory.get().then(function (medias) {});
            var tab=[];
            var tabmaster=[];
            UserFactory.getOne($stateParams.id).then(function (us) {
                $scope.users = us;
                for (var i = 0, len = us.profil.length; i < len; i++) {
                    tab.push(us.profil[i]._id);
                }
                var iduser=$stateParams.id;
                ProfilFactory.getcategorieProfils(tab,iduser).then(function () {
                    $scope.profile= ProfilFactory.profsCats;
                    $scope.allmedias=ProfilFactory.allMedias;//tous les medias des profils de l'utilisateur
                    $scope.total = Math.ceil(ProfilFactory.allMedias.length/medPerPage);
                    $scope.allmedias= ProfilFactory.allMedias.slice(0,medPerPage);
                    $scope.gotoPage = function() {//pagination
                        var i=$scope.currentPage;
                        $scope.allmedias= ProfilFactory.allMedias.slice(medPerPage*i-medPerPage,medPerPage*i);
                    };
                    $scope.longueur=ProfilFactory.allMedias.length;
                    afficher_ecran($scope.allmedias)

                });
            });
           /* $scope.aff_pop_not=function(){//fonction qui permet d'afficher les medias par ordre de lecture
                var one=[];
                $scope.allmedias=$filter('orderBy')($scope.allmedias,'-readed');
                for(var index in $scope.allmedias) {
                    one=one.concat($scope.allmedias[index])
                }
                $scope.allmedias=one;
            }*/
            $scope.lire = function(m){
                LivreFactory.readed(m._id).then(function(up){//permet d'incrementer automatiquement le champ lu
                    m.readed = up.readed;
                });
            };
            CategorieFactory.get().then(function (categories) {
                $scope.categories = categories;
            });
            $scope.tri=function(cat,prof){
                if(CategorieFactory.currentCat != cat) {
                    $scope.allmedias=cat.medias;
                   CategorieFactory.currentCat = cat;
                }
                $scope.selected = [];
            };
            $scope.toggles = function (use,prf) {
                CategorieFactory.currentProf = prf;
                console.log(use)
                $scope.selected=[];
                console.log($scope.selected)
                var usmed={};
                usmed.profil = CategorieFactory.currentProf._id;
                usmed.user = $stateParams.id;
                usmed.categorie = use._id;
                usmed.etat = "";
                alert(use.etat == "terminé")
                     if (use.etat == "terminé") {
                    $scope.selected.splice($scope.selected.indexOf(use), 1);
                    use.etat = "";
                    usmed.etat = "";
                    tabprog2.splice(tabprog2.indexOf(use),1);
                    usmed.progression = parseInt(CategorieFactory.currentProf.progressuser) - Math.ceil((1/CategorieFactory.currentProf.categories.length)*100);
                    if(usmed.progression < 0) {
                        usmed.progression = 0;
                    }
                }
                else {
                    $scope.selected.push(use);
                    use.etat ="terminé";
                    usmed.etat = "terminé";
                    usmed.progression = parseInt(CategorieFactory.currentProf.progressuser) + Math.ceil((1/CategorieFactory.currentProf.categories.length)*100);
                }
                if(usmed.progression > 100) {
                    usmed.progression = 100;
                }
                UserFactory.getOneprofiluser(usmed).then(function(usmd){
                    //recuperation d'un mediauser:user+:media unique
                    if(!usmd){
                        UserFactory.creeruserprofil(usmed).then(function (us) {//dans le cas ou il n'existe pas on cree un
                            CategorieFactory.currentProf.progressuser = usmed.progression;
                        });
                    }
                    else{
                        UserFactory.updateuserprofil(usmed).then(function (us) {//dans le cas ou il existe on update;
                            CategorieFactory.currentProf.progressuser = usmed.progression;
                        })
                    }
                });

            };
        }])
    .controller('MediathequeCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService'
        ,'youtubeEmbedUtils','$mdDialog','$sce','$rootScope',
        '$log', '$timeout', '$location','menu','$mdToast',
        function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
                  $state, AuthService,youtubeEmbedUtils,$mdDialog,$sce,$rootScope,
                  $log, $timeout, $location,menu,$mdToast) {
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
                    .textContent(text)
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

            var masterActuel=$cookieStore.get('user').permiNotations;//recuperation de tous les profils dont il est master
            var iduser=$cookieStore.get('user').id;
            CategorieFactory.get().then(function (categories) {//obtention de toutes les categories
                $scope.categories = categories;
            });
            $scope.currentPage=1;
            $scope.step=5;
            var medPerPage=10;
            var tab =[];
            var tabmaster=[];
            /*partie presentation mediatheque*/
            LivreFactory.get().then(function (medias) {
                $scope.medias = medias;
                $scope.total = Math.ceil(medias.length/medPerPage);
                $scope.medias= medias.slice(0,medPerPage);
                $scope.gotoPage = function() {
                    var i=$scope.currentPage;
                    $scope.medias=medias.slice(medPerPage*i-medPerPage,medPerPage*i);
                    afficher_ecran($scope.medias);
                };
                $scope.trisgen=function(){
                    $scope.medias =medias;
                };
                $scope.tris=function(cat){//tri des medias par catégories
                    $scope.medias=cat.medias;
                    var taille=$scope.medias.length;
                    for (var i = 0, len = taille; i < len; i++) {
                        if(!$scope.medias[i]){
                            $scope.medias.splice(i,1);//ici on enlève tous les medias qui sont nulls dans le tab des médias de la catégorie
                        }
                        taille--;
                    }
                    afficher_ecran($scope.medias);
                };
                afficher_ecran($scope.medias);
            });
            //incremente readed lors d'un lecture ie lien vers le document
            $scope.lire = function(med){
                LivreFactory.readed(med._id).then(function(up){//permet d'incrementer automatiquement le champ lu
                    med.readed = up.readed;
                });
            };

            for (var i = 0, len = masterActuel.length; i < len; i++) {
                tabmaster.push(masterActuel[i].id);
            }
            ProfilFactory.get().then(function (profils) {//recuperation de tous les profils
                $scope.profils = profils;
            });

                ProfilFactory.getcategorieProfils(tabmaster,iduser).then(function () {

                });
            /****** delete ****** edit and download one media*!/
             *
             */
            $scope.showConfirmdelive = function(ev,med) {
                 var confirm = $mdDialog.confirm()
                    .title('voulez vous supprimer ce media?')
                    .textContent('vous etes sur le point de supprimer le media')
                    .ariaLabel('bonne chance')
                    .targetEvent(ev)
                    .ok('Oui!')
                    .cancel('Annuler');
                $mdDialog.show(confirm).then(function() {
                    CategorieFactory.deleteLivre(med).then(function (media) {
                        $scope.medias.splice($scope.medias.indexOf(med),1);//suppression d'un media
                        text="media supprimé"
                        $scope.showActionToast(text)
                    });
                }, function() {

                });
            };

            $scope.showConfirmdecat = function(ev,cat) {
                var confirm = $mdDialog.confirm()
                    .title('voulez vous supprimer cette categorie?')
                    .textContent('vous etes sur le point de supprimer la categorie et ses medias seront envoyes dans ' +
                        'la categorie par defaut')
                    .ariaLabel('bonne chance')
                    .targetEvent(ev)
                    .ok('Oui!')
                    .cancel('Annuler');
                $mdDialog.show(confirm).then(function() {
                    CategorieFactory.deletes(cat).then(function (ct) {
                        $scope.categories.splice($scope.categories.indexOf(cat),1);//suppression d'un media
                        text="catégorie supprimée"
                        $scope.showActionToast(text)
                        $state.go('axgrip.mediatheque');
                    });
                }, function() {

                });
            };
            $scope.affichemodifcat=false;
            $scope.modifiercat=function(msg){
                $scope.c= msg;
                $scope.affichemodifcat= !$scope.affichemodifcat;
            };
            $scope.modifiecategorie=function(){
                CategorieFactory.update($scope.c).then(function(answer) {
                    text="reussi";
                    $scope.showActionToast(text)
                }, function(err) {
                    text="echoue"
                    $scope.showActionToast(text)
                });
            };
            $scope.afficheMedia=false;
            $scope.affichecreeMedia=false;
            var indik;
            $scope.modifiermedia=function(msg){
                $scope.mediae= msg;
                $scope.afficheMedia= !$scope.afficheMedia;
            };
            $scope.ajoutermedia=function(msg){
                $scope.affichecreeMedia= !$scope.affichecreeMedia;
                if(msg)indik=msg._id;
            };
            $scope.$watch('logo', function () {
                if ($scope.logo != null) {
                    $scope.files = [$scope.logo];
                }
            });
            var fileExtension,fileExtension2, ind;
            $scope.$watch('mediae.link', function () {
                if ($scope.mediae) {
                    ind=$scope.mediae.logo;
                    if(!isURL($scope.mediae.link)){
                        if($scope.mediae.link.name){
                            console.log($scope.mediae.link)
                            fileExtension = $scope.mediae.link.name.substr(($scope.mediae.link.name.lastIndexOf('.') + 1));
                            console.log(fileExtension);
                            if(["mp4", "MP4"].includes(fileExtension))
                                $scope.affichemedia = "image/video.gif";
                            else if(fileExtension=="pdf")
                                $scope.affichemedia = "image/pdf.jpg";
                            else if(["mp3", "MP3"].includes(fileExtension))
                                $scope.affichemedia = "image/AwesomeAudioLogo.png";
                            else{
                                $scope.affichemedia = "image/youtube.png";
                            }
                            console.log($scope.affichemedia)
                        }

                    }
                    else{
                        var url=$scope.mediae.link;
                        LivreFactory.statues(url).then(function(x){
                            $scope.response_data=$sce.trustAsHtml("<h3>"+x.title+"</h3>" + x.html);
                        },function(errMsg) {
                            $scope.response_data=$sce.trustAsHtml(x.link);
                        });
                    }
                }
            });
            $scope.$watch('mediai.link', function () {
                if ($scope.mediai) {
                    ind=$scope.mediai.logo;
                    if(!isURL($scope.mediai.link)){
                        if($scope.mediai.link.name){
                            console.log($scope.mediai.link)
                            fileExtension2 = $scope.mediai.link.name.substr(($scope.mediai.link.name.lastIndexOf('.') + 1));
                            console.log(fileExtension2);
                            if(["mp4", "MP4"].includes(fileExtension2))
                                $scope.affichemediai = "image/video.gif";
                            else if(fileExtension2=="pdf")
                                $scope.affichemediai = "image/pdf.jpg";
                            else if(["mp3", "MP3"].includes(fileExtension2))
                                $scope.affichemediai = "image/AwesomeAudioLogo.png";
                            else{
                                $scope.affichemediai = "image/youtube.png";
                            }
                            console.log($scope.affichemediai)
                        }

                    }
                    else{
                        var url=$scope.mediai.link;
                        LivreFactory.statues(url).then(function(x){
                            $scope.response_data=$sce.trustAsHtml("<h3>"+x.title+"</h3>" + x.html);
                        },function(errMsg) {
                            $scope.response_data=$sce.trustAsHtml(x.link);
                        });
                    }
                }
            });
            $scope.mediacreateupdate = function () {
                $scope.mediae.logo=ind;
                if(["mp4", "MP4","mp3","MP3","pdf"].includes(fileExtension)){
                    CategorieFactory.updateLivres($scope.mediae).then(function (media) {
                        text="reussi media modifié";
                        $scope.showActionToast(text);
                    });
                }
                else{
                    CategorieFactory.updateLivre($scope.mediae).then(function (media) {
                        text="reussi media modifié";
                        $scope.showActionToast(text);
                    });
                }
            }
            $scope.creationmedia= function () {
                if(!$scope.mediai.logo)$scope.mediai.logo="data/logos/photo0.png";
                $scope.mediai.categorie=indik;
                console.log($scope.mediai)
                if(["mp4", "MP4","mp3","MP3","pdf"].includes(fileExtension2)){
                    CategorieFactory.ajouterlivre($scope.mediai).then(function (media) {
                        text="reussi media crée";
                        $scope.showActionToast(text);
                    });
                }
                else{
                    CategorieFactory.ajouterlivres($scope.mediai).then(function (media) {
                        text="reussi media crée";
                        $scope.showActionToast(text);
                    });
                }
            }
            //////envoie de la notation du master au serveur
            $scope.rateFunction = function(rating,med) {
                var usmed={};
                usmed.media=med._id;
                usmed.user=$cookieStore.get('user').id;
                UserFactory.getOnemediauser(usmed).then(function(usmd)//recuperation d'un mediauser:user+:media unique
                {
                    if(usmd==null || usmd==undefined){
                        usmd={media:"",user:"",notation:""};
                        usmd.media=med._id;
                        usmd.user=$cookieStore.get('user').id;
                        usmd.notation=rating;
                        UserFactory.creerusermedia(usmd).then(function (us) {//dans le cas ou il n'existe pas on cree un
                            UserFactory.getmedianotation(med._id).then(function(s){//mise a jour du champ rate de la table media
                                text="notation enregistrée";
                                $scope.showActionToast(text);
                            })
                        })
                    }
                    else{
                        usmd.notation=rating;
                        UserFactory.updateusermedia(usmd).then(function (us) {//dans le cas ou il existe on update;
                            UserFactory.getmedianotation(med._id).then(function(s){
                                text="notation enregistrée";
                                $scope.showActionToast(text);
                            })
                        })
                    }
                });
            };
       }])
    .controller('ProfilsCtrl', ['$scope','$cookieStore',
        'CategorieFactory','LivreFactory','ProfilFactory', '$stateParams', '$state','AuthService','$mdToast',
         function ($scope,$cookieStore, CategorieFactory,LivreFactory,ProfilFactory, $stateParams, $state, AuthService,$mdToast) {
             var tab =[],iduser,medPerPage=2;$scope.currentPage=1;$scope.step=5;
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
                         console.log($scope.profile)
                     };
                 });
             });
             LivreFactory.get().then(function (medias) {
                 $scope.medias = medias;
             });



        }])
    .controller('LoginNewCtrl', function($scope, AuthService,UserFactory, $state,$stateParams,$http,$mdToast) {
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
                .textContent(text)
                .action('ANNULER')
                .highlightAction(true)
                .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
                .position(pinTo);

            $mdToast.show(toast).then(function(response) {
                if ( response == 'ok' ) {
                    alert('vous avez cliqué sur annuler');
                }
            });
        };
        $scope.closeToast = function() {
            $mdToast.hide();
        };
        var pourToken;
        $http.get('/check-reset').then(function(data){
           var data=data.data;
            if(data){
                text="vous êtes autorisés à modifier le mot de passe";
                $scope.showActionToast(text);
                $scope.affiche=false;
                $scope.affiche2=false;
                $scope.affiche3=true;
                UserFactory.getToken(pourToken).then(function(user){
                    alert(user)
                    console.log(UserFactory.pourToken)
                    $scope.updatespassword=function(){
                        UserFactory.updatepassword($scope.user,pourToken).then(function(msg) {
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
        $scope.affiche=true;
        $scope.affiche2=false;
        $scope.affiche3=false;
        $scope.logino = function() {
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
        $scope.forgot=function(){
            UserFactory.forgot($scope.user).then(function(msg) {
                UserFactory.pourToken=msg.token;
                text="vous avez recu un email de verification"
                $scope.showActionToast(text);
                $scope.newUser2();
            }, function(errMsg) {
                text="email incorrect";
                $scope.showActionToast(text);
                $scope.newUser2();
            });
        };
});






