/**
 * Created by NOUBISSI TAPAH PHOEB on 22/08/2016.
 */
app.controller('RegisterCtrl', function($scope, AuthService, $state,dialogs,GroupFactory,ProfilFactory) {
    $('.menu-principal').css('display','none');
    $scope.user = {
        name: '',
        password: ''
    };
    GroupFactory.get().then(function (grp) {
        $scope.groups = grp;
    }, function (err) {
        alert(err)
    });
    ProfilFactory.get().then(function (prf) {
        alert(prf)
        $scope.profil = prf;
    }, function (err) {
        alert(err)

    });

    /*$scope.$watch('photo', function () {
     if ($scope.photo != null) {
     $scope.files = [$scope.photo];
     }
     });*/
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

})
