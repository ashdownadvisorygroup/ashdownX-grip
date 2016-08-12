/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */
app.controller('AccueilCtrl', ['$scope', 'CategorieFactory', '$stateParams', '$state', 'dialogs',
        'AuthService',
        function ($scope, CategorieFactory, $stateParams, $state, dialogs,
                  AuthService) {


            CategorieFactory.get().then(function (categories) {
               // alert(JSON.stringify(categories));
                $scope.categories = categories;

            });




        }])
    .controller('AppCtrl',['$scope', 'CategorieFactory', '$stateParams', '$state', 'dialogs',
        'AuthService',
        function ($scope, CategorieFactory, $stateParams, $state, dialogs,
                  AuthService) {

            $scope.logout = function() {
                AuthService.logout();
                $state.go('login');
            };




        }])
    .controller('updateCategorieCtrl', ['$scope', 'CategorieFactory', '$stateParams', '$state','AuthService',
        function ($scope, CategorieFactory, $stateParams, $state,AuthService) {

            CategorieFactory.getOne($stateParams.id).then(function (cat) {

                $scope.categorie = cat;
            });
            $scope.updatecategorie = function () {
                CategorieFactory.update($scope.categorie).then(function (cat) {

                    $state.go('accueil');
                });
            }

        }])
    .controller('updateLivreCtrl', ['$scope', 'CategorieFactory', '$stateParams', '$state', 'Upload','dialogs','AuthService',
        function ($scope, CategorieFactory, $stateParams, $state, Upload,dialogs,AuthService) {
            $scope.$watch('logo', function () {
                if ($scope.logo != null) {
                    $scope.files = [$scope.logo];
                }
            });
            $scope.livre = {link: {text: "", file: null}};
            var fileExtension;
            $scope.$watch('livre.link', function () {
              /*  if(!$scope.livre)
                console.log($scope.livre.link);*/
                console.log($scope.livre)
                if ($scope.livre.link.file != null) {

                    fileExtension = $scope.livre.link.file.substr(($scope.livre.link.file.lastIndexOf('.') + 1));
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

                $scope.livre = liv;
                $scope.livre.link = {text: liv.link, file:liv.link};
                console.log(liv)
                console.log($scope.livre.link)
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
                        $scope.livre.link.text="";
                        $scope.livre.link=$scope.livre.link.file;
                        CategorieFactory.updateLivres($scope.livre).then(function (livre) {
                            console.log(livre);
                            $scope.launch('notify');
                            $state.go('accueil');

                });
            }
                else{
                        $scope.livre.link.file=null;
                        $scope.livre.link=$scope.livre.link.text;
                        CategorieFactory.updateLivre($scope.livre).then(function (livre) {
                            console.log(livre);
                            $scope.launch('notify');
                            $state.go('accueil');

                        });
                    }
            }


        }])

    .controller('FormulaireLivreCtrl', ['$scope', 'Upload', 'CategorieFactory','dialogs','$state','LivreFactory','$sce','AuthService',
        function ($scope, Upload, CategorieFactory,dialogs,$state,LivreFactory,$sce,AuthService) {
            $scope.livre = {link: {text: "", file: null}};

            $scope.livre.logo="img/logo/1470219245825-45px-Question_book-4.png";
            $scope.$watch('logo', function () {
                if ($scope.logo != null) {
                    $scope.files = [$scope.logo];
                }
            });
            $scope.$watch('livre.link.file', function () {
                console.log($scope.livre.link.file)
                if ($scope.livre.link.file != null) {
                    var fileExtension;
                    console.log($scope.livre.link.file);

                    fileExtension = $scope.livre.link.file.name.substr(($scope.livre.link.file.name.lastIndexOf('.') + 1));
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
                    console.log($scope.livre.link.text);
                    if($scope.livre.link.text.length==0){
                        $scope.livre.link=$scope.livre.link.file;
                    CategorieFactory.ajouterlivre($scope.livre).then(function (livre) {
                        //console.log(livre);
                        $scope.launch('notify');
                        $state.go('accueil');

                    },function(errMsg) {
                        $scope.launch('error');

                    });


                }
                    else {
                        $scope.livre.link=$scope.livre.link.text;
                        //console.log($scope.livre.link);
                            CategorieFactory.ajouterlivres($scope.livre).then(function (livre) {
                                //console.log(livre);
                                $scope.launch('notify');
                                $state.go('accueil');
                            },function(errMsg) {
                                $scope.launch('error');
                            });

                        }
                    }

            $scope.add_status=function(){
                var url=$scope.livre.link.text;
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
                $scope.livres = categorie.livres;
                //alert($scope.livres)
                //console.log($scope.livres);
                //console.log($scope.livres.length);
                //$scope.affiche="video";
                //console.log($scope.affiche)
                for (var i = 0, len = $scope.livres.length; i < len; i++) {
                    console.log($scope.livres[i].link)
                    console.log($scope.livres[i].link.substr(($scope.livres[i].link.lastIndexOf('.') + 1)))
                    if(["mp4", "MP4"].includes($scope.livres[i].link.substr($scope.livres[i].link.lastIndexOf('.') + 1)))
                    {
                        //console.log("video")
                        $scope.livres[i].affiche = "lien vers la video";
                    }


                    else if($scope.livres[i].link.substr(($scope.livres[i].link.lastIndexOf('.') + 1))=="pdf")
                    {
                        //console.log("pdf")
                        $scope.livres[i].affiche = "lien vers le fichier pdf";
                    }

                    else if(["mp3", "MP3"].includes($scope.livres[i].link.substr($scope.livres[i].link.lastIndexOf('.') + 1)))
                    {
                        //console.log("audio")
                        $scope.livres[i].affiche = "lien vers le fichier audio"
                    }
                    else{
                        //console.log("youtube")
                        $scope.livres[i].affiche = "lien vers la video youtube";
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
                    angular.forEach($scope.livres,function(livre){
                        if(livre._id==id)
                            livre.downloaded = down.downloaded;
                    })
                });
            };
            //incremente readed lors d'un lecture ie lien vers le document
            $scope.lire = function(id){
                LivreFactory.readed(id).then(function(up){
                  //  alert(up)
                    angular.forEach($scope.livres,function(livre){
                        if(livre._id==id){
                            livre.readed = up.readed;
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
            //$scope.livre.affiche="";

            /*CategorieFactory.getOne($stateParams.id).then(function (categorie) {
                $scope.livres = categorie.livres;
               // $scope.categorie = categorie;
                angular.forEach($scope.livres,function(livre){
                    //console.log(livre._id);
                    //alert(livre._id)
                    //if(livre._id==id){

                    CategorieFactory.getOneLivre(livre._id).then(function (liv) {

                        $scope.livre = liv;
                        $scope.livre.affiche="";
                        var fileExtension;
                        fileExtension = $scope.livre.link.substr(($scope.livre.link.lastIndexOf('.') + 1));
                        alert(fileExtension);
                        if(["mp4", "MP4"].includes(fileExtension))
                            $scope.livre.affiche = "video";
                        else if(fileExtension=="pdf")
                            $scope.livre.affiche = "pdf";
                        else if(["mp3", "MP3"].includes(fileExtension))
                            $scope.livre.affiche = "audio";
                        else{
                            $scope.livre.affiche = "youtube";
                        }
                        //alert($scope.livre.affiche)

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

                $scope.livre = liv;
                console.log($scope.livre)
                console.log(liv)

                    console.log($scope.livre.link)
                    var fileExtension;
                    fileExtension = $scope.livre.link.substr(($scope.livre.link.lastIndexOf('.') + 1));
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
                    $scope.theBestVideo = youtubeEmbedUtils.getIdFromURL($scope.livre.link)
                    console.log(youtubeEmbedUtils.getIdFromURL($scope.livre.link));
                    }

            });






        }])
    .controller('deleteLivreCtrl', ['$scope',
        'CategorieFactory', '$stateParams', '$state',
        'dialogs','AuthService', function ($scope, CategorieFactory, $stateParams, $state, dialogs,AuthService) {

            $scope.nbparpage = 5;

            CategorieFactory.getOneLivre($stateParams.id).then(function (liv) {

                $scope.livre = liv;
                console.log(liv)
            });
            $scope.deletelivre = function () {
                CategorieFactory.deleteLivre($scope.livre).then(function (livre) {

                    $state.go('categorie',{id:$scope.livre.categorie});
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


    $scope.login = function() {
        AuthService.login($scope.user).then(function(msg) {

           $('.menu-principal').css('display','block');
            $state.go('accueil');

        }, function(errMsg) {
            $scope.launch('error');
            $state.go('register');

        });
    };
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
            AuthService.register($scope.user).then(function(msg) {
                $scope.launch('notify');
                $state.go('login');
            }, function(errMsg) {
                //alert(errMsg);
                $scope.launch('error');
            });
        }

    });







