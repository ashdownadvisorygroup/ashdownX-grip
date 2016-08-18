/**
 * Created by NOUBISSI TAPAH PHOEB on 28/07/2016.
 */
app.factory('CategorieFactory', ['$http','$q','Upload',
    'AuthService','isAuthenticated',function( $http , $q ,Upload,AuthService,isAuthenticated){
    var factory = {
        LOCAL_TOKEN_KEY : 'yourTokenKey',
        authToken:'',
        categories: false,
        useCredentials: function(token) {
                isAuthenticated.set(true);
                factory.authToken = token;

                // Set the token as header for your requests!
                $http.defaults.headers.common.Authorization = factory.authToken;
            },
        loadUserCredentials: function() {
                var token = window.localStorage.getItem(factory.LOCAL_TOKEN_KEY);
                if (token) {
                    factory.useCredentials(token);
                }
            },

        x:false,
        get: function(){
            factory.loadUserCredentials();
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/categories'

            }).success(function(data,status){


                factory.categories=data;
                deferred.resolve(data);
            }).error(function(data,status){

                //let the function caller know the error
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getOne: function(id){
            factory.loadUserCredentials();
            var categorie;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/categorie/'+id
            }).success(function(data,status){

                factory.categorie=data;
                deferred.resolve(data);
            }).error(function(error,status){

                //let the function caller know the error
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getOneLivre: function(id){
            factory.loadUserCredentials();
            var media;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/media/'+id
            }).success(function(data,status){
                deferred.resolve(data);
            }).error(function(error,status){
                deferred.reject(error);
            });
            return deferred.promise;
        },
        ajouterlivre: function(media){
            factory.loadUserCredentials();
        var deferred = $q.defer();
        categorie=media.categorie;
        Upload.upload({
            url: '/categories/'+categorie+'/Medias',
            data:media
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },
        ajouterlivres: function(media){
            factory.loadUserCredentials();
        var deferred = $q.defer();
        categorie=media.categorie;
        Upload.upload({
            url: '/categories/'+categorie+'/media',
            data:media
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },
        updateLivre: function(media){//pour l'url
            factory.loadUserCredentials();
        var deferred = $q.defer();
        Upload.upload({
            method: 'PUT',
            url: '/media/'+media._id,
            data:media
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },
        updateLivres: function(media){//pour les fichiers
            factory.loadUserCredentials();
        var deferred = $q.defer();
        Upload.upload({
            method: 'PUT',
            url: '/Medias/'+media._id,
            data:media
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },

        deleteLivre: function(media){
            factory.loadUserCredentials();
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: '/media/'+media._id,
            data:media
        }).then(function (resp) {
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },
        deletes: function(cat){
            factory.loadUserCredentials();
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: '/categorie/'+cat._id,
            data:cat
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },

        update: function(categorie){
            factory.loadUserCredentials();
            var deferred = $q.defer();
            $http({
                method: 'PUT',
                url: '/categorie/'+categorie._id,
                data: categorie

            }).success(function(data,status){

                deferred.resolve(data);
            }).error(function(error,status){

                //let the function caller know the error
                deferred.reject(error);
            });
            return deferred.promise;
        },
    ajoutercategorie: function(cat){
        factory.loadUserCredentials();
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/categories',
            data: cat

        }).success(function(data,status){

            deferred.resolve(data);
        }).error(function(error,status){

            //let the function caller know the error
            deferred.reject(error);
        });
        return deferred.promise;
    }

};
    return factory;
}])
.factory('LivreFactory', ['$http','$q','Upload','$sce',
    'AuthService','isAuthenticated',function( $http , $q ,Upload,$sce,AuthService,isAuthenticated){
    var factory = {
        LOCAL_TOKEN_KEY : 'yourTokenKey',
        authToken:'',
        categories: false,
        useCredentials: function(token) {
            isAuthenticated.set(true);
            factory.authToken = token;

            // Set the token as header for your requests!
            $http.defaults.headers.common.Authorization = factory.authToken;
        },
        loadUserCredentials: function() {
            var token = window.localStorage.getItem(factory.LOCAL_TOKEN_KEY);
            if (token) {
                factory.useCredentials(token);
            }
        },
        download: function(id){
            factory.loadUserCredentials();
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/download/'+id

            }).success(function(data,status){



                deferred.resolve(data);
            }).error(function(data,status){

                //let the function caller know the error
                deferred.reject(error);
            });
            return deferred.promise;
        },
        downloaded: function(id){
            factory.loadUserCredentials();
            var deferred = $q.defer(id);
            $http({
                method: 'PUT',
                url:' /Medias/'+id+'/downloaded',

            }).success(function(data,status){
                deferred.resolve(data);
            }).error(function(data,status){

                //let the function caller know the error
                deferred.reject(error);
            });
            return deferred.promise;
        },
        readed: function(id){
            factory.loadUserCredentials();
            var deferred = $q.defer(id);
            $http({
                method: 'PUT',
                url:' /Medias/'+id+'/readed',

            }).success(function(data,status){
                deferred.resolve(data);
            }).error(function(data,status){

                //let the function caller know the error
                deferred.reject(error);
            });
            return deferred.promise;
        },
        statues: function(url){//pour affcher le preview de l'url
            factory.loadUserCredentials();//pour mettre le http headers
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url:'/get_meta',
                data: {
                    data: url
                },
                headers: { 'Content-Type': 'application/json' }

            }).success(function(data){
                //factory.x= $sce.trustAsHtml("<h3>"+data.title+"</h3>" + data.html);
                deferred.resolve(data);
            }).error(function(data,status){
                //factory.x = $sce.trustAsHtml(data.link);
                //let the function caller know the error
                deferred.reject(error);
            });
            return deferred.promise;
        }


}
    return factory;
}])

    .factory('isAuthenticated', function($cookieStore){
        var data = $cookieStore.get('user');
        function set(dataAuth){
            data = dataAuth;
        }
        function get(){
            if($cookieStore.get('user'))
                return true;
            else
                return false
            //return data;
        }
        return{
            set:set,
            get:get
        }
    })//,$window

.service('AuthService', function($q, $http,$resource, $rootScope, $sessionStorage,$cookies,$cookieStore, isAuthenticated,Upload) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var authToken;
    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        isAuthenticated.set(true);
        authToken = token;

        // Set the token as header for your requests!
        $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated.set(false);
        $http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }
    var register = function(user) {
    //this.register = function(user) {
        return $q(function(resolve, reject) {
            $http.post('/signup', user).then(function(result) {
                //alert(JSON.stringify(result));
                //alert('result'+result);
                console.log(result)
                if (!result.data.success) {
                    resolve(result.data);
                } else {
                    alert(result.data.msg)
                    reject(result.data.msg);
                }
            });
        });
    };

    /**
     *  Saves the current user in the root scope
     *  Call this in the app run() method
     */
    var init = function(){
        if (isLoggedIn()){
            $rootScope.user = currentUser();
           // alert($rootScope.user)
        }
    };



    var logout = function() {
        $cookieStore.remove('user');
        delete $rootScope.user;
        alert(JSON.stringify($cookieStore.get('user')));
        destroyUserCredentials();
        //alert($rootScope.user)
        //alert($sessionStorage.user)
    };


    var checkPermissionForView = function(view) {
        if (!view.requiresAuthentication) {
            return true;
        }

        return userHasPermissionForView(view);
    };


    var userHasPermissionForView = function(view){
        if(!isLoggedIn()){
            return false;
        }

        if(!view.permissions || !view.permissions.length){
            return true;
        }

        return userHasPermission(view.permissions);
    };


    var userHasPermission = function(permissions){
        if(!isLoggedIn()){
            return false;
        }

        var found = false;
        //console.log($sessionStorage.user.permissions)
        angular.forEach(permissions, function(permission, index){
            if ($cookieStore.get('user').permissions.indexOf(permission) >= 0){
                found = true;
                return;
            }
        });
        console.log(found)
        return found;
    };


    var currentUser = function(){
        return $cookieStore.get('user');
        //return $sessionStorage.user;
    };


    var isLoggedIn = function(){
        return $cookieStore.get('user') != null;
        //return $sessionStorage.user != null;
    };
    var Profile = $resource('/authenticate', {}, {
        login: {
            method: "POST",
            isArray : false
        }
    });




    /*var register = function(user) {
    //this.register = function(user) {
        return $q(function(resolve, reject) {
            $http.post('/signup', user).then(function(result) {
                //alert(JSON.stringify(result));
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };*/
    /*ajouterlivres: function(media){
        factory.loadUserCredentials();
        var deferred = $q.defer();
        categorie=media.categorie;
        Upload.upload({
            url: '/categories/'+categorie+'/media',
            data:media
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;*/

    var login = function(user) {
   // this.login = function(user) {
        return $q(function(resolve, reject) {
            Profile.login(user).$promise
            .then(function(result) {
                //alert(JSON.stringify(result));
               console.log("Authentication started");
                if (result.success) {
                   // isAuthenticateds = true;
                    isAuthenticated.set(true);
                    console.log(isAuthenticated)
                    $cookieStore.put('user', result);
                   // $sessionStorage.user =result;
                    console.log($cookieStore.get('user'))
                    $rootScope.user = $cookieStore.get('user');
                    console.log($rootScope.user)
                    storeUserCredentials(result.token);
                    //console.log(isAuthenticated.get());
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
    };
    var updatuser = function(user) {
   // this.login = function(user) {
        return $q(function(resolve, reject) {
            $http({
                method: 'PUT',
                url: '/user',
                data:user
            })
            .then(function(result) {
                console.log(result)
                //alert(JSON.stringify(result));
               //console.log("Authentication started");
                if (!result.success) {
                   // isAuthenticateds = true;
                    isAuthenticated.set(true);
                    console.log(isAuthenticated)
                    $cookieStore.put('user',result);
                    //$sessionStorage.user =result;
                    //console.log($sessionStorage.user)
                    $rootScope.user = $cookieStore.get('user');
                    console.log($rootScope.user)
                    storeUserCredentials(result.token);
                    //console.log(isAuthenticated.get());
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });
    };

    loadUserCredentials();
    return {
        login: login,
        register: register,
        logout: logout,
        currentUser: currentUser,
        isLoggedIn: isLoggedIn,
        userHasPermission: userHasPermission,
        userHasPermissionForView: userHasPermissionForView,
        checkPermissionForView:checkPermissionForView,
        init:init,
        updatuser:updatuser,
        isAuthenticated: isAuthenticated,
    };




})
    .directive('permission', ['AuthService', function(AuthService) {
        return {
            restrict: 'A',
            scope: {
                permission: '='
            },

            link: function (scope, elem, attrs) {

                scope.$watch(AuthService.isLoggedIn, function() {
                    console.log(elem)
                    if (AuthService.userHasPermission(scope.permission)) {
                        console.log(elem)
                       elem.show();
                    } else {
                        elem.hide();
                    }
                });
            }
        }
    }])

    .directive('selectpicker', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.selectpicker($parse(attrs.selectpicker)());
                element.selectpicker('refresh');

                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                    scope.$parent[attrs.ngModel] = newVal;
                    scope.$evalAsync(function () {
                        if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
                        element.selectpicker('refresh');
                    });
                });

                scope.$on('$destroy', function () {
                    scope.$evalAsync(function () {
                        element.selectpicker('destroy');
                    });
                });
            }
        };
    }])

    .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })


