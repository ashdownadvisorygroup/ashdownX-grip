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
            var livre;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/livre/'+id
            }).success(function(data,status){
                deferred.resolve(data);
            }).error(function(error,status){
                deferred.reject(error);
            });
            return deferred.promise;
        },
        ajouterlivre: function(livre){
            factory.loadUserCredentials();
        var deferred = $q.defer();
        categorie=livre.categorie;
        Upload.upload({
            url: '/categories/'+categorie+'/livres',
            data:livre
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },
        ajouterlivres: function(livre){
            factory.loadUserCredentials();
        var deferred = $q.defer();
        categorie=livre.categorie;
        Upload.upload({
            url: '/categories/'+categorie+'/livre',
            data:livre
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },
        updateLivre: function(livre){//pour l'url
            factory.loadUserCredentials();
        var deferred = $q.defer();
        Upload.upload({
            method: 'PUT',
            url: '/livre/'+livre._id,
            data:livre
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },
        updateLivres: function(livre){//pour les fichiers
            factory.loadUserCredentials();
        var deferred = $q.defer();
        Upload.upload({
            method: 'PUT',
            url: '/livres/'+livre._id,
            data:livre
        }).then(function (resp) {
            console.log(resp.data)
            deferred.resolve(resp.data);

        },function(msg){
            deferred.reject(msg)
        });

        return deferred.promise;
    },

        deleteLivre: function(livre){
            factory.loadUserCredentials();
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: '/livre/'+livre._id,
            data:livre
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
                url:' /livres/'+id+'/downloaded',

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
                url:' /livres/'+id+'/readed',

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

    .factory('isAuthenticated', function(){
        var data = {};
        function set(dataAuth){
            data = dataAuth;
        }
        function get(){
            return data;
        }
        return{
            set:set,
            get:get
        }
    })//,$window

.service('AuthService', function($q, $http, isAuthenticated) {
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
            Upload.upload('/signup', user).then(function(result) {
                //alert(JSON.stringify(result));
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };/*var register = function(user) {
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
    /*ajouterlivres: function(livre){
        factory.loadUserCredentials();
        var deferred = $q.defer();
        categorie=livre.categorie;
        Upload.upload({
            url: '/categories/'+categorie+'/livre',
            data:livre
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
            $http.post('/authenticate', user).then(function(result) {
                //alert(JSON.stringify(result));
               // console.log("Authentication started");
                if (result.data.success) {
                    console.log(result.data)
                   // isAuthenticateds = true;
                    isAuthenticated.set(true);
                    storeUserCredentials(result.data.token);
                    //console.log(isAuthenticated.get());
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };
    var logout = function() {
        destroyUserCredentials();
    };
    loadUserCredentials();
    return {
        login: login,
        register: register,
        logout: logout,
        isAuthenticated: isAuthenticated,
    };



})
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
    });

