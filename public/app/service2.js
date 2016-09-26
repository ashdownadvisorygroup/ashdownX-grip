var groupeBy = function(profcat, catmed) {//fonction qui recupère les profils dun user avec leurs categorie populate
    var taille = catmed.length, result = [], allMedias = [];

    angular.forEach(profcat,function(pc){
        if(pc.categorie){
            pc.categorie.medias = [];
            for(var i = 0; i<taille; i++) {
                if(pc.categorie._id == catmed[i].categorie){
                    pc.categorie.medias.push(catmed[i].media);
                    if(allMedias.indexOf(catmed[i].media) == -1) {
                        allMedias.push(catmed[i].media);
                        //console.log(allMedias)
                    }
                    /*catmed.splice(i,1);
                     taille--; i--;*/
                }
            }
        }

    });
    //console.log(allMedias)
    angular.forEach(profcat, function(pc) {
        if(pc){
            if(pc.categorie){
                var existe = -1;
                angular.forEach(result, function (r, i) {
                    if (r._id == pc.profil._id)
                        existe = i;
                });
                if(existe == -1) {
                    var profil = pc.profil;
                    pc.categorie.progression = pc.progression;
                    profil.categories = [pc.categorie]
                    result.push(profil);
                } else {
                    pc.categorie.progression = pc.progression;
                    result[existe].categories.push(pc.categorie);
                }
            }
        }

    });
    return {pc: result, alm:allMedias};
};
var groupmediacat=function(data){
    angular.forEach(data.categories,function(d){
        if(d){
            d.medias = [];
            var taille=data.catmedias.length;
            for(var i = 0; i<taille; i++) {
                if(d._id == data.catmedias[i].categorie){
                    d.medias.push(data.catmedias[i].media);

                    data.catmedias.splice(i,1);
                    taille--; i--;
                }
            }
        }

    });
    return data.categories;
}
app.factory('CategorieFactory', ['$http','$q','Upload',
        'AuthService','isAuthenticated','LivreFactory',function(
        $http , $q ,Upload,AuthService,isAuthenticated,LivreFactory){
            var factory = {
                LOCAL_TOKEN_KEY : 'yourTokenKey',
                authToken:'',
                categories: false,
                currentProf:0,
                currentCat:0,
                CatMedias:[],
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
                        var result=groupmediacat(data);//fonctin qui recupère le medias de chaque categorie populate
                        factory.categories=result;
                        deferred.resolve(result);
                    }).error(function(error){
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
                        url: '/media/'+id
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                ajouterlivre: function(media){//pour fichier
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    Upload.upload({
                        url: '/categories/'+media.categorie+'/medias',
                        method: 'POST',
                        data:media
                    }).then(function (resp) {
                        console.log(resp.data)
                        deferred.resolve(resp.data);

                    },function(msg){
                        deferred.reject(msg)
                    });

                    return deferred.promise;
                },
                ajouterlivres: function(media){//pour url
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    Upload.upload({
                        url: '/categories/'+media.categorie+'/media',
                        method: 'POST',
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
                        url: '/medias/'+media._id,
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
        }]);
app.factory('GroupFactory', ['$http','$q','Upload',
        'AuthService','isAuthenticated',function( $http , $q ,Upload,AuthService,isAuthenticated){
            var factory = {
                LOCAL_TOKEN_KEY : 'yourTokenKey',
                authToken:'',
                groups: false,
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
                        url: '/groups'
                    }).success(function(data,status){
                        factory.groups=data;
                        deferred.resolve(data);
                    }).error(function(data,status){
                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
            };
            return factory;
        }]);
app.factory('ProfilFactory', ['$http','$q','Upload','$cookieStore',
        'AuthService','isAuthenticated','UserFactory',function( $http , $q ,Upload,$cookieStore,AuthService,
                                                                isAuthenticated,UserFactory){
            var factory = {
                LOCAL_TOKEN_KEY : 'yourTokenKey',
                authToken:'',
                profils: false,
                profsCats:[],
                allMedias:[],
                valsplit:"grip",
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
                        url: '/profils'
                    }).success(function(data,status){
                            angular.forEach(data,function(dat){
                                dat.objectifs=dat.objectifs.split(factory.valsplit);
                                //ici on recupère la chaine de caractère et on la rend sous forme de tableau pour pouvoir afficher ç l'ecran
                            })
                        factory.profils=data;
                        deferred.resolve(data);
                    }).error(function(error){
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
                        url: '/profil/'+id
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                getcatprof: function(id){
                    factory.loadUserCredentials();
                    var categorie;
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/profil/'+id+'/categorie_profil',
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                getcategorieProfils: function(tab,iduser){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({method: 'POST',url: '/categorie_profils/user_master',data:{ofuser:tab}
                    }).success(function(data,status){
                        factory.profsCats=[];
                        factory.allMedias=[];
                        //$cookieStore.put('profsCats',0);
                        var usemed={},use={};
                        factory.allMedias=groupeBy(data.ofuser,data.ofmed).alm;
                        factory.profsCats=groupeBy(data.ofuser,data.ofmed).pc;
                        angular.forEach(factory.profsCats,function(dat){
                            dat.objectifs=dat.objectifs.split(factory.valsplit);
                            //ici on recupère la chaine de caractère et on la rend sous forme de tableau pour pouvoir afficher ç l'ecran
                        })
                        //sharedProfils.setProfils(factory.profsCats);
                        //$cookieStore.put('profsCats',factory.profsCats);
                        if(iduser){
                            angular.forEach(factory.profsCats,function(prf){
                                usemed.user=iduser;
                                usemed.profil=prf._id;
                                UserFactory.getOneprofiluser(usemed).then(function (is) {
                                    if(!is){
                                        prf.progressuser=0;
                                    }
                                    else{
                                        prf.progressuser=is.progression;
                                    }
                                })
                                angular.forEach(prf.categories,function(p){
                                    use.user=iduser;
                                    use.profil=prf._id;
                                    use.categorie= p._id;
                                    UserFactory.getOneprofilusercat(use).then(function(us){
                                        if(!us[0] || !us){
                                            p.etat="";
                                        }
                                        else{
                                            p.etat=us[0].etat;
                                        }

                                    });
                                });
                            });
                        }
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
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
                update: function(prof){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'PUT',
                        url: '/profil/'+prof._id,
                        data: prof
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                ajouterProfil: function(prof){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    prof.objectifs=prof.data.join(factory.valsplit)
                    delete prof.data;
                    console.log(prof.objectifs)
                    console.log(prof)
                    $http({
                        method: 'POST',
                        url: '/profils',
                        data: prof
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
            };
            return factory;
        }]);
app.factory('UserFactory', ['$http','$q','Upload',
        'AuthService','isAuthenticated',function( $http , $q ,Upload,AuthService,isAuthenticated){
            var factory = {
                LOCAL_TOKEN_KEY : 'yourTokenKey',
                authToken:'',
                userss: false,
                pourToken:'',
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
                        url: '/users'
                    }).success(function(data,status){
                        factory.userss=data;
                        deferred.resolve(data);
                    }).error(function(error,status){
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
                        url: '/user/'+id
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                getOneprofiluser: function(usmed){
                    factory.loadUserCredentials();
                    var categorie;
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/users/'+usmed.user+'/'+usmed.profil+'/user_profil'
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                getOneprofilusercat: function(usmed){//route
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/users/'+usmed.user+'/'+usmed.profil+'/'+usmed.categorie+'/user_profil_categorie'
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                getuserprofil: function(){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/profil_users'
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                getOnemediauser: function(usmed){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/medias'+'/'+usmed.user+'/'+usmed.media+'/media_user',
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },getmedianotation: function(id){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/media/'+id+'/media_user',
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },getToken: function(id){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/reset/'+id,
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                updateuser: function(user){//mise a jour de l'utilisateur
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    Upload.upload({
                        method: 'PUT',
                        url: '/user/'+user._id,
                        data:user
                    }).then(function (resp) {
                        console.log(resp.data)
                        deferred.resolve(resp.data);

                    },function(msg){
                        deferred.reject(msg)
                    });

                    return deferred.promise;
                },updatepassword: function(user,id){//mise a jour de l'utilisateur
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'PUT',
                        url: '/reset/'+id,
                        data:user
                    }).then(function (resp) {
                        console.log(resp.data)
                        deferred.resolve(resp.data);
                    },function(msg){
                        deferred.reject(msg)
                    });

                    return deferred.promise;
                },
                updateuserprofil: function(usmed){//pour les fichiers
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'PUT',
                        url: '/users/'+usmed.user+'/'+usmed.profil+'/user_profil',
                        data:usmed
                    }).then(function (data,status) {
                        console.log(data)
                        deferred.resolve(data);
                    },function(msg){
                        deferred.reject(msg)
                    });
                    return deferred.promise;
                },
                updateusermedia: function(usmed){//pour les fichiers
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'PUT',
                        url: '/medias/'+usmed.user+'/'+usmed.media+'/media_user',
                        data:usmed
                    }).then(function (resp) {
                        console.log(resp.data)
                        deferred.resolve(resp.data);
                    },function(msg){
                        deferred.reject(msg)
                    });
                    return deferred.promise;
                },

                deleteuser: function(user){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'DELETE',
                        url: '/user/'+user._id,
                        data:user
                    }).then(function (resp) {
                        deferred.resolve(resp.data);
                    },function(msg){
                        deferred.reject(msg)
                    });
                    return deferred.promise;
                },
                creeruserprofil: function(usmed){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                        url: '/users/'+usmed.user+'/'+usmed.profil+'/user_profil',
                        data: usmed
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){

                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                creerusermedia: function(usmed){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                        url: '/medias/'+usmed.user+'/'+usmed.media+'/media_user',
                        data: usmed
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error,status){
                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                forgot: function(user){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                        url: '/forgot',
                        data: user
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
        }]);
   app.factory('LivreFactory', ['$http','$q','Upload','$sce',
        'AuthService','isAuthenticated',function( $http , $q ,Upload,$sce,AuthService,isAuthenticated){
            var factory = {
                LOCAL_TOKEN_KEY : 'yourTokenKey',
                authToken:'',
                medias: false,
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
                },get: function(){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/medias'
                    }).success(function(data,status){
                        factory.medias=data;
                        deferred.resolve(data);
                    }).error(function(error){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                download: function(id){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/download/'+id

                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error){
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
                        url:' /medias/'+id+'/downloaded',

                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(error){
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
                        url:' /medias/'+id+'/readed',
                    }).success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(result){
                        console.log(result)
                        deferred.reject(result);
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
                        console.log(data)
                        deferred.resolve(data);
                    }).error(function(error){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }


            }
            return factory;
        }]);

    app.factory('isAuthenticated', function(){
        var data = false;
        function set(dataAuth){
            if(data){
                data = data;
            }
            else {data = dataAuth;}
        }
        function get(){
            return data;
        }
        return{
            set:set,
            get:get
        }
    });//,$window
    app.factory('menu', ['$location','ProfilFactory','$cookieStore',function ($location,
                          ProfilFactory,$cookieStore) {

            var self;
           //var profils = ProfilFactory.profsCats;
           //console.log(ProfilFactory.profsCats);
            var profils=$cookieStore.get('profsCats');
            return self = {
                profils:profils,

                toggleSelectSection: function (section) {
                    self.openedSection = (self.openedSection === section ? null : section);
                },
                isSectionSelected: function (section) {
                    return self.openedSection === section;
                },

                selectPage: function (section, page) {
                    page && page.url && $location.path(page.url);
                    self.currentSection = section;
                    self.currentPage = page;
                }
            };

            function sortByHumanName(a, b) {
                return (a.humanName < b.humanName) ? -1 :
                    (a.humanName > b.humanName) ? 1 : 0;
            }

        }]);


app.service('AuthService', function($q, $http, isAuthenticated,$cookieStore,Upload) {
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
            return $q(function(resolve, reject) {
                Upload.upload({url:'/signup',method: 'POST',data:user }).then(function(result) {
                    if (result.data.success) {
                        resolve(result.data.msg);
                    } else {
                        reject(result.data.msg);
                    }
                });
            });
        };
        var login = function(user) {
            return $q(function(resolve, reject) {
                $http.post('/authenticate', user).then(function(result) {
                    if (result.data.success) {
                        isAuthenticated.set(true);
                        storeUserCredentials(result.data.token);
                        $cookieStore.put('user',result.data);
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



    });
app.factory('Auth', function($resource, $rootScope, $cookieStore, $q){
    var auth = {};
    auth.checkPermissionForView = function(view) {
        if (!view.requiresAuthentication) {
            return true;
        }
        return userHasPermissionForView(view);
    };
    auth.isLoggedIn = function(){
        return $cookieStore.get('user') != null;
    };
    var userHasPermissionForView = function(view){
        if(!auth.isLoggedIn()){
            return false;
        }
        if(!view.permissions || !view.permissions.length){
            return true;
        }
        return auth.userHasPermission(view.permissions);
    };
    auth.userHasPermission = function(permissions){
        var found = false;
        angular.forEach(permissions, function(permission, index){
            if ($cookieStore.get('user').permissions.indexOf(permission) >= 0){
                found = true;
                return;
            }
        });
        return found;
    };
    return auth;
});
    app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated
                }[response.status], response);
                return $q.reject(response);
            }
        };
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });
app.service('sharedProperties', function () {
    var property = 'First';

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
});
app.service('sharedmdtabactual', function () {
    var property = false;

    return {
        get: function () {
            return property;
        },
        set: function(value) {
            console.log(property)
            if(property)property=property;
            else property = value;
            console.log(property)
        }
    };
});

