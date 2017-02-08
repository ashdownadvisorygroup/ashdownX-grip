/**
 * Created by NOUBISSI TAPAH PHOEB on 30/09/2016.
 */

app.controller('UseraccountCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','$mdToast',
    '$filter',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory,
              $stateParams, $state, AuthService,$mdToast,$filter) {
        $scope.aff_med=true;

        $scope.currentPage=1;
        $scope.step=5;
        $scope.iduser=$stateParams.id;
        var medPerPage=8;
        var tabprog=[];
        var tabprog2=[];
        LivreFactory.get().then(function (medias) {
            ProfilFactory.allMedias=medias;
        });
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
            $scope.selected=[];
            var usmed={};
            usmed.profil = CategorieFactory.currentProf._id;
            usmed.user = $stateParams.id;
            usmed.categorie = use._id;
            usmed.etat = "";
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
    .controller('UseraccounProfilstCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','$mdToast',
    '$filter',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory,
              $stateParams, $state, AuthService,$mdToast,$filter) {

        $scope.iduser=$stateParams.id;
        CategorieFactory.get().then(function (categories) {
            $scope.categories = categories;
        });
        $scope.aff_profter= true;
        var tab=[];
        UserFactory.getOne($stateParams.id).then(function (us) {
            $scope.users = us;
            for (var i = 0, len = us.profil.length; i < len; i++) {
                tab.push(us.profil[i]._id);
            }
            var iduser=$stateParams.id;
            ProfilFactory.getcategorieProfils(tab,iduser).then(function () {
                $scope.profile= ProfilFactory.profsCats;
            })
        })
}])
    .controller('UseraccountUserCtrl', ['$scope','$cookieStore',
    'CategorieFactory','LivreFactory','UserFactory','ProfilFactory', '$stateParams', '$state','AuthService','$mdToast',
    '$filter',
    function ($scope,$cookieStore, CategorieFactory,LivreFactory,UserFactory,ProfilFactory,
              $stateParams, $state, AuthService,$mdToast,$filter) {
        $scope.iduser=$stateParams.id;
        CategorieFactory.get().then(function (categories) {
            $scope.categories = categories;
        });
        $scope.aff_don=true;
        var tab=[];
        UserFactory.getOne($stateParams.id).then(function (us) {
            $scope.users = us;
            for (var i = 0, len = us.profil.length; i < len; i++) {
                tab.push(us.profil[i]._id);
            }
            var iduser=$stateParams.id;
            ProfilFactory.getcategorieProfils(tab,iduser).then(function () {
                $scope.profile= ProfilFactory.profsCats;})
        })
    }])