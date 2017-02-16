/**
 * Created by NOUBISSI TAPAH PHOEB on 28/09/2016.
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
        if(str[i] && str[i].link){
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


app.controller('CategoriesCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService'
    ,'youtubeEmbedUtils','$mdDialog','$sce','$rootScope',
    '$log', '$timeout', '$location','$mdToast','$filter',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,youtubeEmbedUtils,$mdDialog,$sce,$rootScope,
              $log, $timeout, $location,$mdToast,$filter) {
       // alert('b')
        CategorieFactory.get().then(function (categories) {//obtention de toutes les categories
            $scope.categories = categories;
        });

        $scope.trisgen=function(){
            $state.go('axgrip.mediatheque');
        };
        $scope.tris=function(cat){
            $state.go('axgrip.categorie',{id:cat._id})
        };
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

        var masterActuel=$cookieStore.get('user').permiNotations;//recuperation de tous les profils dont il est master
        var iduser=$cookieStore.get('user').id;
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

            afficher_ecran($scope.medias);
            $scope.$watch('searchmed', function(newVal){
                if(newVal){
                    $scope.medias=$filter('filter')(medias,newVal)
                    $scope.total = Math.ceil($scope.medias.length/medPerPage);
                    afficher_ecran($scope.medias);
                    $scope.medias=  $scope.medias.slice(0,medPerPage);
                    $scope.gotoPage = function() {
                        var i=$scope.currentPage;
                        $scope.medias= $scope.medias.slice(medPerPage*i-medPerPage,medPerPage*i);
                    };
                }
                else{
                    $scope.medias = medias;
                    $scope.total = Math.ceil(medias.length/medPerPage);
                    $scope.medias= medias.slice(0,medPerPage);
                    $scope.gotoPage = function() {
                        var i=$scope.currentPage;
                        $scope.medias=medias.slice(medPerPage*i-medPerPage,medPerPage*i);
                        afficher_ecran($scope.medias);
                    };
                }
            }, true);

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
        ProfilFactory.getcategorieProfils(tabmaster,iduser).then(function () {

        });
        /****** delete ****** edit and download one media*!/
         *
         */
        $scope.showConfirmdelive = function(ev,med) {
            var confirm = $mdDialog.confirm()
                .title('voulez-vous supprimer ce media?')
                .content('vous êtes sur le point de supprimer le media')
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
                .content('vous etes sur le point de supprimer la categorie et ses medias seront envoyes dans ' +
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
                    console.log('media crée');
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

.controller('CategorieCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService'
    ,'youtubeEmbedUtils','$mdDialog','$sce','$rootScope',
    '$log', '$timeout', '$location','$mdToast',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,youtubeEmbedUtils,$mdDialog,$sce,$rootScope,
              $log, $timeout, $location,$mdToast) {
        //alert('a')
        $scope.currentPage=1;
        $scope.step=5;
        var medPerPage=10;

        CategorieFactory.getOne($stateParams.id).then(function (categories) {//obtention de toutes les categories
            $scope.medias = categories.medias;
            if($scope.medias.length==0){
                $scope.medias=[];
            }
            else{
                var len=$scope.medias.length;
                for (var i = 0; i < len; i++) {
                    if($scope.medias.indexOf(null)>-1){
                        $scope.medias.splice(i,1);
                        len--; i--;
                    }
                }
            }

            $scope.categorie = categories;
            afficher_ecran($scope.medias);
            $scope.total = Math.ceil($scope.medias.length/medPerPage);
            $scope.medias= categories.medias.slice(0,medPerPage);
            $scope.gotoPage = function() {
                var i=$scope.currentPage;
                $scope.medias=categories.medias.slice(medPerPage*i-medPerPage,medPerPage*i);
                afficher_ecran($scope.medias);
            };
        });

    }])
