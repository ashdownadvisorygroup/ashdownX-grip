/**
 * Created by NOUBISSI TAPAH PHOEB on 29/09/2016.
 */
app.controller('resultatsRechercheCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
    'youtubeEmbedUtils','$sce','$mdToast','$filter','sharedProperties','GroupFactory','sharedmdtabactual','shared',
    'shared2','shared3','shared4','shared5',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,youtubeEmbedUtils,$sce,$mdToast,$filter,
              sharedProperties,GroupFactory,sharedmdtabactual,shared,shared2,shared3,shared4,shared5) {
        $scope.shared = shared;
        $scope.shared2 = shared2;
        $scope.shared3 = shared3;
        $scope.shared4 = shared4;
        $scope.shared5 = shared5;
        $scope.$watch('selectedTab1', function(newVal){
            sharedmdtabactual.set(newVal);
        }, true);
        $scope.$watch('shared5.get()', function(newVal){
            $scope.users=shared5.get();
        }, true);
        $scope.$watch('shared4.get()', function(newVal){
            $scope.groups=shared4.get();
        }, true);
        $scope.$watch('shared3.get()', function(newVal){
            $scope.medias=shared3.get();
        }, true);
        $scope.$watch('shared.get()', function(newVal){
            $scope.profile=newVal;
        }, true);
        $scope.$watch('shared2.get()', function(newVal){
            $scope.categories=shared2.get();
        }, true);
    }])
    .controller('ResultatProfilCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
    'youtubeEmbedUtils','$sce','$mdToast','$filter','sharedProperties','GroupFactory','sharedmdtabactual','shared',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,youtubeEmbedUtils,$sce,$mdToast,$filter,
              sharedProperties,GroupFactory,sharedmdtabactual,shared) {
        if(sharedmdtabactual.get()==1)$state.go('axgrip.resultats_recherche.categorie')
        if(sharedmdtabactual.get()==2)$state.go('axgrip.resultats_recherche.media')
        if(sharedmdtabactual.get()==3)$state.go('axgrip.resultats_recherche.groupe')
        if(sharedmdtabactual.get()==4)$state.go('axgrip.resultats_recherche.user')
        $scope.step=6;
        var iduser,tab=[],medPerPage=8;
        ProfilFactory.get().then(function (profils) {
            tab=profils;
            ProfilFactory.getcategorieProfils(tab,iduser).then(function () {

            });
        })
        /**
         * pour observer le changement dans un service ceci permet d'actualiser la recherche à tout moment
         */
        $scope.afficheres=false;
        $scope.sharedProperties = sharedProperties;
        $scope.$watch('profile', function(newVal){
                $scope.profile=ProfilFactory.profsCats;
                if(sharedProperties.getProperty()){
                    $scope.profile=$filter('filter')($scope.profile,sharedProperties.getProperty())
                }
        }, true);
       $scope.$watch('sharedProperties.getProperty()', function(newVal){
            $scope.afficheres=true;
            if(newVal != 'First'){
                if(ProfilFactory.profsCats)
                    $scope.profile=ProfilFactory.profsCats;
                //permet de verifier si la longueur actuelle de scope .user est égale à celle du get de la
                // factory.si ce n'est pas le cas on met à jour au début du filtrage
                $scope.profile= $filter('filter')($scope.profile,newVal);
                var property=shared.get();
                property=$scope.profile.length;
                shared.set(property);
                var temp=$filter('filter')(ProfilFactory.profsCats,newVal);
                $scope.total = Math.ceil(temp.length/medPerPage);
                $scope.profile= temp.slice(0,medPerPage);
                $scope.gotoPage = function() {
                    var i= $scope.currentPage;
                    $scope.profile= temp.slice(medPerPage*i-medPerPage,medPerPage*i);
                };
            }
        }, true);
    }])
    .controller('ResultatCategorieCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
    'youtubeEmbedUtils','$sce','$mdToast','$filter','sharedProperties','GroupFactory','sharedmdtabactual','shared2',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,youtubeEmbedUtils,$sce,$mdToast,$filter,
              sharedProperties,GroupFactory,sharedmdtabactual,shared2) {
        if(sharedmdtabactual.get()==0)$state.go('axgrip.resultats_recherche.profil')
        if(sharedmdtabactual.get()==2)$state.go('axgrip.resultats_recherche.media')
        if(sharedmdtabactual.get()==3)$state.go('axgrip.resultats_recherche.groupe')
        if(sharedmdtabactual.get()==4)$state.go('axgrip.resultats_recherche.user')
        $scope.step=6;
        var medPerPage=6;
        CategorieFactory.get().then(function (categories) {
            $scope.categories = categories;
            $scope.total = Math.ceil(categories.length/medPerPage);
            $scope.categories= categories.slice(0,medPerPage);
            $scope.gotoPage = function() {
                var i= $scope.currentPage;
                $scope.categories= categories.slice(medPerPage*i-medPerPage,medPerPage*i);
            };
        });
        $scope.afficheres=false;
        $scope.sharedProperties = sharedProperties;
        $scope.$watch('categories', function(newVal){
            if(CategorieFactory.categories){
                $scope.categories=CategorieFactory.categories;
                if(sharedProperties.getProperty()){
                    $scope.categories=$filter('filter')($scope.categories,sharedProperties.getProperty())
                    var property=shared2.get();
                    property=$scope.categories.length;
                    shared2.set(property);
                }

            }
        }, true);
       /* $scope.$watch('sharedProperties.getProperty()', function(newVal){
            $scope.afficheres=true;
            if(newVal != 'First'){
                if(CategorieFactory.categories)
                    $scope.categories=CategorieFactory.categories;
                $scope.categories= $filter('filter')($scope.categories,newVal);
                console.log($scope.categories)
            }
        }, true);*/
    }])
    .controller('ResultatMediaCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
    'youtubeEmbedUtils','$sce','$mdToast','$filter','sharedProperties','GroupFactory','sharedmdtabactual','shared3',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,youtubeEmbedUtils,$sce,$mdToast,$filter,
              sharedProperties,GroupFactory,sharedmdtabactual,shared3) {
        if(sharedmdtabactual.get()==1)$state.go('axgrip.resultats_recherche.categorie')
        if(sharedmdtabactual.get()==0)$state.go('axgrip.resultats_recherche.profil')
        if(sharedmdtabactual.get()==3)$state.go('axgrip.resultats_recherche.groupe')
        if(sharedmdtabactual.get()==4)$state.go('axgrip.resultats_recherche.user')
        $scope.step=6;medPerPage=12;
        /*SearchFactory.search(word).then(function(result){//service qui permet de filtrer dans le backend
         console.log(result)
         $scope.result=result;
         });*/
        $scope.lire = function(med){
            LivreFactory.readed(med._id).then(function(up){//permet d'incrementer automatiquement le champ lu
                med.readed = up.readed;
            });
        };
        LivreFactory.get().then(function (medias) {
            $scope.medias = medias;
            ProfilFactory.allMedias=medias;
            $scope.total = Math.ceil(medias.length/medPerPage);
            $scope.medias= medias.slice(0,medPerPage);
            $scope.gotoPage = function() {
                var i= $scope.currentPage;
                $scope.medias= medias.slice(medPerPage*i-medPerPage,medPerPage*i);
            };
        });
        $scope.afficheres=false;
        $scope.sharedProperties = sharedProperties;
        $scope.$watch('medias', function(newVal){
            if(LivreFactory.medias){
                $scope.medias=ProfilFactory.allMedias;
                if(sharedProperties.getProperty()){
                    $scope.medias=$filter('filter')($scope.medias,sharedProperties.getProperty())
                    var property=shared3.get();
                    property=$scope.medias.length;
                    shared3.set(property);
                }

            }
        }, true);
    }])
    .controller('ResultatUserCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
    'youtubeEmbedUtils','$sce','$mdToast','$filter','sharedProperties','GroupFactory','sharedmdtabactual','shared5',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,youtubeEmbedUtils,$sce,$mdToast,$filter,
              sharedProperties,GroupFactory,sharedmdtabactual,shared5) {
        if(sharedmdtabactual.get()==1)$state.go('axgrip.resultats_recherche.categorie')
        if(sharedmdtabactual.get()==2)$state.go('axgrip.resultats_recherche.media')
        if(sharedmdtabactual.get()==3)$state.go('axgrip.resultats_recherche.groupe')
        if(sharedmdtabactual.get()==0)$state.go('axgrip.resultats_recherche.profil')
        UserFactory.get().then(function (users) {
            $scope.users = users;
            $scope.$watch('users', function(newVal){
                if(UserFactory.userss){
                    $scope.afficheres=true;
                    $scope.groups=UserFactory.userss;
                    if(sharedProperties.getProperty()){
                        $scope.users= $filter('filter')($scope.users,sharedProperties.getProperty());
                        var property=shared5.get();
                        property=$scope.users.length;
                        shared5.set(property);
                    }

                }
            }, true);
        });
        $scope.step=6;
        $scope.afficheres=false;
        $scope.sharedProperties = sharedProperties;


    }])
    .controller('ResultatGroupeCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService',
    'youtubeEmbedUtils','$sce','$mdToast','$filter','sharedProperties','GroupFactory','sharedmdtabactual','shared4',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory, $stateParams,
              $state, AuthService,youtubeEmbedUtils,$sce,$mdToast,$filter,
              sharedProperties,GroupFactory,sharedmdtabactual,shared4) {
        if(sharedmdtabactual.get()==1)$state.go('axgrip.resultats_recherche.categorie')
        if(sharedmdtabactual.get()==2)$state.go('axgrip.resultats_recherche.media')
        if(sharedmdtabactual.get()==0)$state.go('axgrip.resultats_recherche.profil')
        if(sharedmdtabactual.get()==4)$state.go('axgrip.resultats_recherche.user')
        GroupFactory.get().then(function (groups) {
            $scope.groups = groups;
        });
        $scope.afficheres=false;
        $scope.sharedProperties = sharedProperties;
        /*$scope.$watch('sharedProperties.getProperty()', function(newVal){
            $scope.afficheres=true;
            if(newVal != 'First'){
                if(GroupFactory.groups)
                    $scope.groups= GroupFactory.groups;
                $scope.groups= $filter('filter')($scope.groups,newVal);
            }
        }, true);*/
        $scope.$watch('groups', function(newVal){
            if(GroupFactory.groups){
                $scope.afficheres=true;
                $scope.groups=GroupFactory.groups;
                if(sharedProperties.getProperty()){
                    $scope.groups= $filter('filter')($scope.groups,sharedProperties.getProperty());
                    var property=shared4.get();
                    property=$scope.groups.length;
                    shared4.set(property);
                }

            }
        }, true);
    }])