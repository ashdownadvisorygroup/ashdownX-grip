/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */
app.controller('AccueilCtrl', ['$scope', 'CategorieFactory', '$stateParams', '$state', 'dialogs',
        'AuthService','$sessionStorage',
        function ($scope, CategorieFactory, $stateParams, $state, dialogs,
                  AuthService,$sessionStorage) {

            //alert($sessionStorage.user)
            //console.log($sessionStorage.user)
            CategorieFactory.get().then(function (categories) {
               // alert(JSON.stringify(categories));
                $scope.categories = categories;

            });





        }])
    .controller('developpeurWebMeanCtrl', ['$scope', 'CategorieFactory', '$stateParams', '$state', 'dialogs',
        'AuthService','$sessionStorage',
        function ($scope, CategorieFactory, $stateParams, $state, dialogs,
                  AuthService,$sessionStorage) {

            $scope.max = 200;
            $scope.dynamic = 0;
            $scope.type = 'warning';
            $scope.showWarning = type === 'danger' || type === 'warning';
            var value;
            var type;
            var checkedItems = {}, counter = 0;
            $scope.dataChecked = function () {
                $("#check-list-box li.active").each(function(idx, li) {
                    checkedItems[counter] = $(li).text();
                    counter++;
                });
                alert(counter);
                if(counter==8)
                {
                    value=100;
                }
                else if($scope.counter==7)
                {
                    value=90;
                }
                else if(counter==6)value=80;
                else if(counter==5)value=60;
                else if(counter==4)value=55;
                else if(counter==3)value=45;
                else if(counter==2)value=35;
                else if(counter==1)value=15;





                if (value < 25) {

                    type = 'warning';
                } else if (value < 50) {
                    type = 'danger';
                } else if (value < 75) {
                    type = 'info';

                } else if(value< 100){

                    type = 'success';
                }
                else if(value==100){
                    type = 'perfect';
                }

                $scope.showWarning = type === 'danger' || type === 'warning';

                $scope.dynamic = value;
                $scope.type = type;
                $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
                alert("dynamic"+$scope.dynamic);
                alert("type"+$scope.type);

            };



















        }])
    .controller('AppCtrl',['$scope', 'CategorieFactory', '$stateParams', '$state', 'dialogs',
        'AuthService','$sessionStorage',
        function ($scope, CategorieFactory, $stateParams, $state, dialogs,
                  AuthService,$sessionStorage) {
           // console.log($sessionStorage.user)

            $scope.logout = function() {
                AuthService.logout();
                $state.go('login');
            };




        }])

    .controller('updateCategorieCtrl', ['$scope', 'CategorieFactory', '$stateParams', '$state','AuthService',
        function ($scope, CategorieFactory, $stateParams, $state,AuthService) {
            if (Auth.userHasPermission(["administration"])){
                // some evil logic here
                var userName = Auth.currentUser().name;
                CategorieFactory.getOne($stateParams.id).then(function (cat) {

                    $scope.categorie = cat;
                });
                $scope.updatecategorie = function () {
                    CategorieFactory.update($scope.categorie).then(function (cat) {

                        $state.go('accueil');
                    });
                }
                // ...
            }



        }])
    .controller('updateLivreCtrl', ['$scope', 'CategorieFactory', '$stateParams', '$state', 'Upload','dialogs','AuthService',
        function ($scope, CategorieFactory, $stateParams, $state, Upload,dialogs,AuthService) {
            $scope.$watch('logo', function () {
                if ($scope.logo != null) {
                    $scope.files = [$scope.logo];
                }
            });
            $scope.media = {link: {text: "", file: null}};
            var fileExtension;
            $scope.$watch('media.link', function () {
              /*  if(!$scope.media)
                console.log($scope.media.link);*/
                console.log($scope.media)
                if ($scope.media.link.file != null) {

                    fileExtension = $scope.media.link.file.substr(($scope.media.link.file.lastIndexOf('.') + 1));
                    console.log(fileExtension);
                    if(["mp4", "MP4"].includes(fileExtension))
                        $scope.affiche = "image/video.gif";
                    else if(fileExtension=="pdf")
                        $scope.affiche = "image/pdf.jpg";
                    else if(["mp3", "MP3"].includes(fileExtension))
                        $scope.affiche = "image/AwesomeAudioLogo.png";
                    else{
                        $scope.affiche = "image/youtube.png";
                    }
                }
            });
            CategorieFactory.get().then(function (dat) {
                $scope.categories = dat;
            }, function () {

            });


            CategorieFactory.getOneLivre($stateParams.id).then(function (liv) {

                $scope.media = liv;
                $scope.media.link = {text: liv.link, file:liv.link};
                console.log(liv)
                console.log($scope.media.link)
            });

            $scope.launch = function (which) {
                var dlg = null;
                switch (which) {
                    case 'notify':
                        dlg = dialogs.notify('Something Happened!','waou!!!creation document reussi');
                        break;
                    case 'error':
                        dlg = dialogs.error('Error','veillez reessayer plutard');
                }
            };
            $scope.updatelivre = function () {
                console.log(fileExtension);
                    if(["mp4", "MP4","mp3","MP3","pdf"].includes(fileExtension)){
                        $scope.media.link.text="";
                        $scope.media.link=$scope.media.link.file;
                        CategorieFactory.updateLivres($scope.media).then(function (media) {
                            console.log(media);
                            $scope.launch('notify');
                            $state.go('accueil');

                });
            }
                else{
                        $scope.media.link.file=null;
                        $scope.media.link=$scope.media.link.text;
                        CategorieFactory.updateLivre($scope.media).then(function (media) {
                            console.log(media);
                            $scope.launch('notify');
                            $state.go('accueil');

                        });
                    }
            }


        }])

    .controller('FormulaireLivreCtrl', ['$scope', 'Upload', 'CategorieFactory','dialogs','$state','LivreFactory','$sce','AuthService',
        function ($scope, Upload, CategorieFactory,dialogs,$state,LivreFactory,$sce,AuthService) {
            $scope.media = {link: {text: "", file: null}};

            $scope.media.logo="img/logo/1470219245825-45px-Question_book-4.png";
            $scope.$watch('logo', function () {
                if ($scope.logo != null) {
                    $scope.files = [$scope.logo];
                }
            });
            $scope.$watch('media.link.file', function () {
                console.log($scope.media.link.file)
                if ($scope.media.link.file != null) {
                    var fileExtension;
                    console.log($scope.media.link.file);

                    fileExtension = $scope.media.link.file.name.substr(($scope.media.link.file.name.lastIndexOf('.') + 1));
                    console.log(fileExtension);
                    if(["mp4", "MP4"].includes(fileExtension)){
                        $scope.affiche = "image/video.gif";
                        $scope.thumbnailType = "video";
                    }

                else if(fileExtension=="pdf"){
                        $scope.affiche = "image/pdf.jpg";
                        $scope.thumbnailType = "pdf";
                    }

                    else if(["mp3", "MP3"].includes(fileExtension)){
                        $scope.affiche = "image/AwesomeAudioLogo.png";
                    }

                    else{
                        $scope.affiche = "image/youtube.png";
                    }
                    //alert($scope.thumbnailType)
                    $scope.thumbnailSource="img/link/HDV_0319.MP4";
                }
            });


            CategorieFactory.get().then(function (dat) {
                $scope.categories = dat;
            }, function () {

            });
            $scope.launch = function (which) {
                var dlg = null;
                switch (which) {
                    case 'notify':
                        dlg = dialogs.notify('Something Happened!','waou!!!creation document reussi');
                        break;
                    case 'error':
                        dlg = dialogs.error('Error','veillez reessayer plutard');
                }
            };

                $scope.ajouterlivre = function () {
                    console.log($scope.media.link.text);
                    if($scope.media.link.text.length==0){
                        $scope.media.link=$scope.media.link.file;
                    CategorieFactory.ajouterlivre($scope.media).then(function (media) {
                        //console.log(media);
                        $scope.launch('notify');
                        $state.go('accueil');

                    },function(errMsg) {
                        $scope.launch('error');

                    });


                }
                    else {
                        $scope.media.link=$scope.media.link.text;
                        //console.log($scope.media.link);
                            CategorieFactory.ajouterlivres($scope.media).then(function (media) {
                                //console.log(media);
                                $scope.launch('notify');
                                $state.go('accueil');
                            },function(errMsg) {
                                $scope.launch('error');
                            });

                        }
                    }

            $scope.add_status=function(){
                var url=$scope.media.link.text;
                console.log(url)
                LivreFactory.statues(url).then(function(x){
                    console.log(x);
                    $scope.response_data=$sce.trustAsHtml("<h3>"+x.title+"</h3>" + x.html);
                },function(errMsg) {
                    $scope.response_data=$sce.trustAsHtml(x.link);
                });


            }



        }])
    .controller('FormulaireCategorieCtrl', ['$scope', 'CategorieFactory', '$state','AuthService',
        function ($scope, CategorieFactory, $state,AuthService) {


            $scope.ajoutercategorie = function () {
                console.log($scope.categorie)
                CategorieFactory.ajoutercategorie($scope.categorie).then(function (categorie) {
                    console.log(categorie);
                    $state.go('accueil');

                });
            }

        }])

    .controller('CategorieCtrl', ['$scope',
        'CategorieFactory','LivreFactory', '$stateParams', '$state','AuthService',
        'dialogs', function ($scope, CategorieFactory,LivreFactory, $stateParams, $state, dialogs,AuthService) {

            $scope.nbparpage = 5;

            CategorieFactory.getOne($stateParams.id).then(function (categorie) {
                $scope.medias = categorie.medias;
                //alert($scope.Medias)
                //console.log($scope.Medias);
                //console.log($scope.Medias.length);
                //$scope.affiche="video";
                //console.log($scope.affiche)
                for (var i = 0, len = $scope.medias.length; i < len; i++) {
                    console.log($scope.medias[i].link)
                    console.log($scope.medias[i].link.substr(($scope.medias[i].link.lastIndexOf('.') + 1)))
                    if(["mp4", "MP4"].includes($scope.medias[i].link.substr($scope.medias[i].link.lastIndexOf('.') + 1)))
                    {
                        //console.log("video")
                        $scope.medias[i].affiche = "lien vers la video";
                    }


                    else if($scope.medias[i].link.substr(($scope.medias[i].link.lastIndexOf('.') + 1))=="pdf")
                    {
                        //console.log("pdf")
                        $scope.medias[i].affiche = "lien vers le fichier pdf";
                    }

                    else if(["mp3", "MP3"].includes($scope.medias[i].link.substr($scope.medias[i].link.lastIndexOf('.') + 1)))
                    {
                        //console.log("audio")
                        $scope.medias[i].affiche = "lien vers le fichier audio"
                    }
                    else{
                        //console.log("youtube")
                        $scope.medias[i].affiche = "lien vers la video youtube";
                    }
                }


                $scope.categorie = categorie;
            }, function (msg) {
                console.error(msg);
            });
            donouveau = function () {
                $state.go('formulaireLivre');
            }
            CategorieFactory.getOne($stateParams.id).then(function (cat) {
                console.log($stateParams.id)
                $scope.cat = cat;
                console.log(cat)
            });
            //incremente downloaded lors d'un telechargement
            $scope.telecharger = function (id) {
                LivreFactory.downloaded(id).then(function(down){
                    angular.forEach($scope.medias,function(media){
                        if(media._id==id)
                            media.downloaded = down.downloaded;
                    })
                });
            };
            //incremente readed lors d'un lecture ie lien vers le document
            $scope.lire = function(id){
                LivreFactory.readed(id).then(function(up){
                  //  alert(up)
                    angular.forEach($scope.medias,function(media){
                        if(media._id==id){
                            media.readed = up.readed;
                        }

                    })
                });
            };


            $scope.deletes = function () {
                //console.log($scope.cat);
                CategorieFactory.deletes($scope.cat).then(function (cat) {
                   // console.log(cat)
                    $state.go('accueil');

                });
            }
            $scope.launch = function (which) {
                var dlg = null;
                switch (which) {
                    case 'confirm':
                        dlg = dialogs.confirm('Veillez confirmer', 'voulez vous vraiment suppprimer?');
                        dlg.result.then(function (btn) {
                            $scope.deletes();
                            dlg = dialogs.notify('confirmation recue', 'supprimé!')
                        }, function (btn) {
                            dlg = dialogs.notify('confirmation recue', 'document non supprimé!')
                        });
                        break;
                }
            }
            //$scope.media.affiche="";

            /*CategorieFactory.getOne($stateParams.id).then(function (categorie) {
                $scope.Medias = categorie.Medias;
               // $scope.categorie = categorie;
                angular.forEach($scope.Medias,function(media){
                    //console.log(media._id);
                    //alert(media._id)
                    //if(media._id==id){

                    CategorieFactory.getOneLivre(media._id).then(function (liv) {

                        $scope.media = liv;
                        $scope.media.affiche="";
                        var fileExtension;
                        fileExtension = $scope.media.link.substr(($scope.media.link.lastIndexOf('.') + 1));
                        alert(fileExtension);
                        if(["mp4", "MP4"].includes(fileExtension))
                            $scope.media.affiche = "video";
                        else if(fileExtension=="pdf")
                            $scope.media.affiche = "pdf";
                        else if(["mp3", "MP3"].includes(fileExtension))
                            $scope.media.affiche = "audio";
                        else{
                            $scope.media.affiche = "youtube";
                        }
                        //alert($scope.media.affiche)

                    });
                })

            }, function (msg) {
                console.error(msg);
            });*/
            $scope.sortorder = 'nom';


        }])
   .controller('documentCtrl', ['$scope',
        'CategorieFactory','LivreFactory', '$stateParams', '$state',
        'dialogs','youtubeEmbedUtils','$sce','AuthService',function ($scope, CategorieFactory,LivreFactory, $stateParams, $state,
                                                       dialogs,youtubeEmbedUtils,$sce,AuthService) {

            CategorieFactory.getOneLivre($stateParams.id).then(function (liv) {

                $scope.media = liv;
                console.log($scope.media)
                console.log(liv)

                    console.log($scope.media.link)
                    var fileExtension;
                    fileExtension = $scope.media.link.substr(($scope.media.link.lastIndexOf('.') + 1));
                    console.log (fileExtension);
                    if(["mp4", "MP4"].includes(fileExtension))
                        $scope.affiche = "video";//[1, 2, 3].includes(3, -1);
                    else if(fileExtension=="pdf")
                        $scope.affiche = "pdf";
                    else if(["mp3", "MP3"].includes(fileExtension))
                        $scope.affiche = "audio";
                    else{
                        $scope.affiche = "youtube";
                    /*$scope.trustSrc = function(src) {
                        return $sce.trustAsResourceUrl(src);
                    }*/
                    $scope.theBestVideo = youtubeEmbedUtils.getIdFromURL($scope.media.link)
                    console.log(youtubeEmbedUtils.getIdFromURL($scope.media.link));
                    }

            });






        }])
    .controller('deleteLivreCtrl', ['$scope',
        'CategorieFactory', '$stateParams', '$state',
        'dialogs','AuthService', function ($scope, CategorieFactory, $stateParams, $state, dialogs,AuthService) {

            $scope.nbparpage = 5;

            CategorieFactory.getOneLivre($stateParams.id).then(function (liv) {

                $scope.media = liv;
                console.log(liv)
            });
            $scope.deletelivre = function () {
                CategorieFactory.deleteLivre($scope.media).then(function (media) {

                    $state.go('categorie',{id:$scope.media.categorie});
                });
            }
            $scope.launch = function (which) {
                var dlg = null;
                switch (which) {
                    case 'confirm':
                        dlg = dialogs.confirm('Veillez confirmer', 'voulez vous vraiment suppprimer?');
                        dlg.result.then(function (btn) {
                            $scope.deletelivre();
                            dlg = dialogs.notify('confirmation recue', 'supprimé!')
                        }, function (btn) {
                            dlg = dialogs.notify('confirmation recue', 'document non supprimé!')
                        });
                        break;
                }
            }


        }])

.controller('LoginCtrl', function($scope, AuthService, $state,dialogs) {
    $('.menu-principal').css('display','none');
    $scope.user = {
        name: '',
        password: ''
    };
    $scope.launch = function (which) {
        var dlg = null;
        switch (which) {
            case 'error':
                dlg = dialogs.error('Error','User not correct,please register!!');
        }
    }


    $scope.log = function() {
        AuthService.login($scope.user).then(function(msg) {

           $('.menu-principal').css('display','block');
            $state.go('accueil');

        }, function(errMsg) {
            $scope.launch('error');
            $state.go('register');

        });
    };
})
    .controller('LoginNewCtrl', function($scope, AuthService, $state,dialogs) {

})

    .controller('RegisterCtrl', function($scope, AuthService, $state,dialogs) {
        $('.menu-principal').css('display','none');
        $scope.user = {
            name: '',
            password: ''
        };
        $scope.$watch('photo', function () {
            if ($scope.photo != null) {
                $scope.files = [$scope.photo];
            }
        });
        $scope.launch = function (which) {
            var dlg = null;
            switch (which) {
                case 'notify':
                    dlg = dialogs.notify('Something Happened!','waou!!!You are successfully resgister,please login');
                    break;
                case 'error':
                    dlg = dialogs.error('Error','Username already exists');
            }
        };

        $scope.signup = function() {
            if($scope.user.groups=="admin"){
                $scope.user.groups=["57aed7d12a8eabe81fcdf54f"];
            }
            else if($scope.user.groups=="admin et stagiaire") {
                $scope.user.groups= ["57aed8272a8eabe81fcdf550","57aed7d12a8eabe81fcdf54f"];
            }
            else {
                $scope.user.groups= ["57aed8272a8eabe81fcdf550"];
            }
            AuthService.register($scope.user).then(function(msg) {
                $scope.launch('notify');
                $state.go('login');
            }, function(errMsg) {
                //alert(errMsg);
                $scope.launch('error');
            });
        }

    })
    .controller('updateUserCtrl', function($scope, AuthService, $state,dialogs,$sessionStorage) {
        $('.menu-principal').css('display','none');
        //alert($sessionStorage.user)
        //console.log($sessionStorage.user)
        $scope.user = {
            name: '',
            password: ''
        };
        $scope.$watch('photo', function () {
            if ($scope.photo != null) {
                $scope.files = [$scope.photo];
            }
        });
        $scope.launch = function (which) {
            var dlg = null;
            switch (which) {
                case 'notify':
                    dlg = dialogs.notify('Something Happened!','waou!!!You are successfully resgister,please login');
                    break;
                case 'error':
                    dlg = dialogs.error('Error','Username already exists');
            }
        };

        $scope.updateuser = function() {
            console.log($scope.user)

            //$scope.user.id=$sessionStorage.user.id;
            AuthService.updatuser($scope.user).then(function(msg) {
                $scope.launch('notify');
                $state.go('login');
            }, function(errMsg) {
                //alert(errMsg);
                $scope.launch('error');
            });
        }

    });







