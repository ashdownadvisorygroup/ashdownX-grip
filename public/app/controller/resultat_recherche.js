/**
 * Created by NOUBISSI TAPAH PHOEB on 29/09/2016.
 */
app.controller('resultatsRechercheCtrl', ['$scope',function ($scope) {
        $scope.profile= $scope.categories=$scope.medias=$scope.groups=$scope.users=0;
    $scope.$watch('Results',function(res){
            if(res){
                $scope.profile=res.profils.length;
                $scope.categories=res.catégories.length;
                $scope.medias=res.médias.length;
                $scope.groups=res.groups.length;
                $scope.users=res.users.length;
            }
        },true);
     }])
    .controller('ResultatProfilCtrl', ['$scope', function ($scope) {

        $scope.step=6;
        var medPerPage= 8;$scope.currentPage=1;

       $scope.$watch('Results', function(res){
            if(res){
                $scope.profile= res.profils;
                var temp=res.profils;
                $scope.total = Math.ceil(temp.length/medPerPage);
                $scope.profile= temp.slice(0,medPerPage);

                $scope.gotoPage = function() {
                    var i= $scope.currentPage;
                    $scope.profile= temp.slice(medPerPage*i-medPerPage,medPerPage*i);
                };
            }
        }, true);
    }])
    .controller('ResultatCategorieCtrl', ['$scope', function ($scope) {

        $scope.step=6;
        var medPerPage=8;$scope.currentPage=1;
        $scope.$watch('Results', function(res){
            if(res){
                $scope.categories=res.catégories;
                $scope.total = Math.ceil(res.catégories.length/medPerPage);
                $scope.categories= res.catégories.slice(0,medPerPage);
                $scope.gotoPage = function() {
                    var i= $scope.currentPage;
                    $scope.categories= res.catégories.slice(medPerPage*i-medPerPage,medPerPage*i);
                };


            }
        }, true);
    }])
    .controller('ResultatMediaCtrl', ['$scope', function ($scope) {
        $scope.step=6;var medPerPage=12;$scope.currentPage=1;

        $scope.lire = function(med){
            LivreFactory.readed(med._id).then(function(up){//permet d'incrementer automatiquement le champ lu
                med.readed = up.readed;
            });
        };

        $scope.$watch('Results', function(res){
            if(res){
                $scope.medias = res.médias;
                $scope.total = Math.ceil(res.médias.length/medPerPage);
                $scope.medias= res.médias.slice(0,medPerPage);
                $scope.gotoPage = function() {
                    var i= $scope.currentPage;
                    $scope.medias= res.médias.slice(medPerPage*i-medPerPage,medPerPage*i);
                };
            }
        }, true);
    }])
    .controller('ResultatUserCtrl', ['$scope', function ($scope) {
        $scope.$watch('Results', function(res){
            if(res){
                $scope.users= res.users;
            }
        }, true);

    }])
    .controller('ResultatGroupeCtrl', ['$scope', function ($scope) {

        $scope.$watch('Results', function(res){
            if(res){
                    $scope.groups= res.groups;

            }
        }, true);
    }])