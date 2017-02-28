var groupeBy = function(profcat, catmed) {//fonction qui recupère les profils dun user avec leurs categorie populate
    if(catmed) var taille = catmed.length, result = [], allMedias = [];

    angular.forEach(profcat,function(pc){
        if(pc.categorie){
            pc.categorie.medias = [];
            for(var i = 0; i<taille; i++) {
                if(pc.categorie._id == catmed[i].categorie){
                    pc.categorie.medias.push(catmed[i].media);
                    if(allMedias.indexOf(catmed[i].media) == -1) {
                        allMedias.push(catmed[i].media);
                    }
                    /*catmed.splice(i,1);
                     taille--; i--;*/
                }
            }
        }

    });
    angular.forEach(profcat, function(pc) {
        if(pc){
            if(pc.categorie){
                var existe = -1;
                angular.forEach(result, function (r, i) {
                    if(pc.profil){
                        if (r._id == pc.profil._id)
                            existe = i;
                    }

                });
                if(existe == -1) {
                    var profil = pc.profil;
                    if(profil){
                        pc.categorie.progression = pc.progression;
                        profil.categories = [pc.categorie]
                        result.push(profil);
                    }

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
    if(data.categories){
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
}
app.factory('IntroFactory', ['$cookieStore','$localStorage',function($cookieStore,$localStorage){
    var factory={
        ShoulAutoStart:"",
        state:false,
        steps:{
            'accueil':[
                        {
                            element: document.querySelector('#step1'),
                            intro: "logo de la bibliothèque axgrip",
                            position:'bottom'
                        },
                        {
                            element: document.querySelectorAll('#step2')[0],
                            intro: "cliquer ici pour avoir le guide d'utilisation de la bibliothèque",
                            position: 'right'
                        },
                        {
                            element: '#step3',
                            intro: 'Moteur de recherche des médias, profils, groupes,catégories,utilisateurs',
                            position: 'left'
                        },
                        {
                            element: '#step4',
                            intro: "onglets de la bibliothèque:<br>accueil: où nous situons déjà<br>médiathèque: contenant tous les médias et catégories " +
                            "de axgrip <br>profils: qui contient tous les profils de axgrip",
                            position:'bottom'

                        },
                        {
                            element: '#step5',
                            intro: "compte d'utilisation et déconnexion",
                            position:'bottom'
                        },
                        {
                            element: '#step9',
                            intro: "Réduire ou agrandir la liste des profils",
                            position:"bottom"
                        },
                        {
                            element: '#step10',
                            intro: "recherche d'un profil désiré",
                            position:"bottom"
                        },
                        {
                            element: '#step11',
                            intro: "Profils de formation de l'utilistateur en cours",
                            position:"right"
                        },
                        {
                            element: '#step13',
                            intro: "permet de trier les médias par ordre de popularité/mieux notés",
                            position:"bottom"
                        },
                        {
                            element: '#step14',
                            intro: "liste des médias de formation de l'utilisateur en cours",

                        },
                        {
                            element: '#step15',
                            intro: "liste des stagiaires que l'utilisateur en cours encadre avec possibilité de recherche",

                        },
                        {
                            element: '#step16',
                            intro: "permet d'agrandir ou réduire la liste des stagiaires de l'utilisateur en cours",

                        }
            ],
            'mediatheque':[
                {
                    element: document.querySelector('#step1'),
                    intro: "logo de la bibliothèque axgrip",
                    position:'bottom'
                },
                {
                    element: document.querySelectorAll('#step2')[0],
                    intro: "cliquer ici pour avoir le guide d'utilisation de la bibliothèque",
                    position: 'right'
                },
                {
                    element: '#step3',
                    intro: 'Moteur de recherche des médias, profils, groupes,catégories,utilisateurs',
                    position: 'left'
                },
                {
                    element: '#step4',
                    intro: "onglets de la bibliothèque:<br>accueil: où nous situons déjà<br>médiathèque: contenant tous les médias et catégories " +
                    "de axgrip <br>profils: qui contient tous les profils de axgrip",
                    position:'bottom'

                },
                {
                    element: '#step5',
                    intro: "compte d'utilisation et déconnexion",
                    position:'bottom'
                },{
                    element: '#step6',
                    intro: "recherche d'une catégorie",
                    position:'right'
                },{
                    element: '#step7',
                    intro: "liste des catégories",
                    position:'right'
                },{
                    element: '#step8',
                    intro: "ajouter un média à la catégorie",
                    position:'bottom'
                },{
                    element: '#step9',
                    intro: "modifier la catégorie",
                    position:'bottom'
                },{
                    element: '#step10',
                    intro: "supprimer la catégorie",
                    position:'bottom'
                },{
                    element: '#step11',
                    intro: "recherche d'un média",
                    position:'bottom'
                },{
                    element: '#step12',
                    intro: "Recherche Type de média",
                    position:'bottom'
                },{
                    element: '#step12',
                    intro: "liste des médias",
                    position:'bottom'
                }
            ],
            'profils':[
                {
                    element: document.querySelector('#step1'),
                    intro: "logo de la bibliothèque axgrip",
                    position:'bottom'
                },
                {
                    element: document.querySelectorAll('#step2')[0],
                    intro: "cliquer ici pour avoir le guide d'utilisation de la bibliothèque",
                    position: 'right'
                },
                {
                    element: '#step3',
                    intro: 'Moteur de recherche des médias, profils, groupes,catégories,utilisateurs',
                    position: 'left'
                },
                {
                    element: '#step4',
                    intro: "onglets de la bibliothèque:<br>accueil: où nous situons déjà<br>médiathèque: contenant tous les médias et catégories " +
                    "de axgrip <br>profils: qui contient tous les profils de axgrip",
                    position:'bottom'

                },
                {
                    element: '#step5',
                    intro: "compte d'utilisation et déconnexion",
                    position:'bottom'
                },{
                    element: '#step6',
                    intro: "liste des profils",
                    position:'bottom'
                },{
                    element: '#step7',
                    intro: "recherche d'un profil",
                    position:'bottom'
                }
            ],
            'useraccount':[
                {
                    element: document.querySelector('#step1'),
                    intro: "logo de la bibliothèque axgrip",
                    position:'bottom'
                },
                {
                    element: document.querySelectorAll('#step2')[0],
                    intro: "cliquer ici pour avoir le guide d'utilisation de la bibliothèque",
                    position: 'right'
                },
                {
                    element: '#step3',
                    intro: 'Moteur de recherche des médias, profils, groupes,catégories,utilisateurs',
                    position: 'left'
                },
                {
                    element: '#step4',
                    intro: "onglets de la bibliothèque:<br>accueil: où nous situons déjà<br>médiathèque: contenant tous les médias et catégories " +
                    "de axgrip <br>profils: qui contient tous les profils de axgrip",
                    position:'bottom'

                },
                {
                    element: '#step5',
                    intro: "compte d'utilisation et déconnexion",
                    position:'bottom'
                },{
                    element: '#step6',
                    intro: "liste des profils ainsi que leur pourcentage",
                    position:'bottom'
                },{
                    element: '#step7',
                    intro: "Données sur l'utilisateur sélectionné",
                    position:'right'
                },{
                    element: '#step8',
                    intro: "Profils terminés par l'utilisateur sélectionné",
                    position:'bottom'
                },{
                    element: '#step9',
                    intro: "Médias des profils de formation de l'utilisateur sélectionné",
                    position:'bottom'
                }
            ],
            'compte':[
                {
                    element: document.querySelector('#step1'),
                    intro: "logo de la bibliothèque axgrip",
                    position:'bottom'
                },
                {
                    element: document.querySelectorAll('#step2')[0],
                    intro: "cliquer ici pour avoir le guide d'utilisation de la bibliothèque",
                    position: 'right'
                },
                {
                    element: '#step3',
                    intro: 'Moteur de recherche des médias, profils, groupes,catégories,utilisateurs',
                    position: 'left'
                },
                {
                    element: '#step4',
                    intro: "onglets de la bibliothèque:<br>accueil: où nous situons déjà<br>médiathèque: contenant tous les médias et catégories " +
                    "de axgrip <br>profils: qui contient tous les profils de axgrip",
                    position:'bottom'

                },
                {
                    element: '#step5',
                    intro: "compte d'utilisation et déconnexion",
                    position:'bottom'
                },{
                    element: '#step6',
                    intro: "recherche d'un profil",
                    position:'bottom'
                },{
                    element: '#step7',
                    intro: "liste des profils",
                    position:'right'
                },{
                    element: '#step8',
                    intro: "profil de l'utilisateur en cours",
                    position:'bottom'
                },{
                    element: '#step9',
                    intro: "création d'une catégorie",
                    position:'bottom'
                },{
                    element: '#step10',
                    intro: "création d'un profil de formation",
                    position:'bottom'
                },{
                    element: '#step11',
                    intro: "création d'un nouvel utilisateur",
                    position:'bottom'
                },{
                    element: '#step12',
                    intro: "recherche d'un stagiaire",
                    position:'left'
                },{
                    element: '#step13',
                    intro: "liste des stagiaires",
                    position:'left'
                }
            ],
            'categorie':[
                {
                    element: document.querySelector('#step1'),
                    intro: "logo de la bibliothèque axgrip",
                    position:'bottom'
                },
                {
                    element: document.querySelectorAll('#step2')[0],
                    intro: "cliquer ici pour avoir le guide d'utilisation de la bibliothèque",
                    position: 'right'
                },
                {
                    element: '#step3',
                    intro: 'Moteur de recherche des médias, profils, groupes,catégories,utilisateurs',
                    position: 'left'
                },
                {
                    element: '#step4',
                    intro: "onglets de la bibliothèque:<br>accueil: où nous situons déjà<br>médiathèque: contenant tous les médias et catégories " +
                    "de axgrip <br>profils: qui contient tous les profils de axgrip",
                    position:'bottom'

                },
                {
                    element: '#step5',
                    intro: "compte d'utilisation et déconnexion",
                    position:'bottom'
                },{
                    element: '#step14',
                    intro: "description et données sur la catégorie",
                    position:'bottom'
                },{
                    element: '#step11',
                    intro: "recherche d'un média",
                    position:'bottom'
                },{
                    element: '#step12',
                    intro: "Recherche Type de média",
                    position:'bottom'
                },{
                    element: '#step12',
                    intro: "liste des médias",
                    position:'bottom'
                },
                {
                    element: '#step15',
                    intro: "liste des conseillers de la catégorie",
                    position:'bottom'
                }
            ],
            'profil':[
                {
                    element: document.querySelector('#step1'),
                    intro: "logo de la bibliothèque axgrip",
                    position:'bottom'
                },
                {
                    element: document.querySelectorAll('#step2')[0],
                    intro: "cliquer ici pour avoir le guide d'utilisation de la bibliothèque",
                    position: 'right'
                },
                {
                    element: '#step3',
                    intro: 'Moteur de recherche des médias, profils, groupes,catégories,utilisateurs',
                    position: 'left'
                },
                {
                    element: '#step4',
                    intro: "onglets de la bibliothèque:<br>accueil: où nous situons déjà<br>médiathèque: contenant tous les médias et catégories " +
                    "de axgrip <br>profils: qui contient tous les profils de axgrip",
                    position:'bottom'

                },
                {
                    element: '#step5',
                    intro: "compte d'utilisation et déconnexion",
                    position:'bottom'
                },{
                    element: '#step8',
                    intro: "données sur le profil de formation",
                    position:'bottom'
                },{
                    element: '#step9',
                    intro: "liste des catégories du profil",
                    position:'bottom'
                },{
                    element: '#step10',
                    intro: "liste des encadreurs du profil",
                    position:'bottom'
                },{
                    element: '#step11',
                    intro: "Utilisateurs ayant achevé le profil",
                    position:'bottom'
                }
            ],
        },
        getSteps:function(state){
            factory.state=state;
            return factory.steps[state];
        },
        auto_start_intro: function(state){
            return $localStorage['intro_'+factory.state+'_'+$cookieStore.get('user').id+'_'+'autostart']!=false;
    },
        changeEvent: function (targetElement, scope) {
            if(this._currentStep==factory.steps[factory.state].length-1){
            $localStorage['intro_'+factory.state+'_'+$cookieStore.get('user').id+'_'+'autostart']= false;
        }
    },
        ExitEvent:function (scope) {
            $localStorage['intro_'+factory.state+'_'+$cookieStore.get('user').id+'_'+'autostart']= false;
    }
    }
    return factory;
}])
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
                    }).then(function(success){
                        var result=groupmediacat(success.data);//fonctin qui recupère le medias de chaque categorie populate
                        factory.categories=result;
                        deferred.resolve(result);
                    },function(error){
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
                    }).then(function(success){
                        factory.categorie=success.data;
                        deferred.resolve(success.data);
                    },function(error,status){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

            };
            return factory;
        }])
.factory('SearchFactory', ['$http','$q',
        'AuthService','isAuthenticated','LivreFactory',function(
        $http , $q ,AuthService,isAuthenticated,LivreFactory){
            var factory = {
                LOCAL_TOKEN_KEY : 'yourTokenKey',
                authToken:'',
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
                search: function(word){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/search?word='+word
                    }).then(function(success){
                        var result=groupmediacat(success.data);//fonctin qui recupère le medias de chaque categorie populate
                        deferred.resolve(result);
                    },function(error){
                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                results: false,
                searchengine: function(word){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/search',
                        params:{search:word}
                    }).then(function(success){
                        factory.results =success.data;
                        deferred.resolve(success.data);
                    },function(error){
                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

            };
            return factory;
        }])
.factory('GroupFactory', ['$http','$q','Upload',
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
                    }).then(function(success){
                        factory.groups=success.data;
                        deferred.resolve(success.data);
                    },function(error,status){
                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                getOne: function(id){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/group/'+id
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                modifiergroupe: function(group){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'PUT',
                        url: '/group/'+group._id,
                        data: group
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
            };
            return factory;
        }])
.factory('ProfilFactory', ['$http','$q','Upload','$cookieStore',
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
                    }).then(function(success){
                        factory.profils=success.data;
                        deferred.resolve(success.data);
                    },function(error){
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
                    }).then(function(success){
                        success.data.objectifs=success.data.objectifs.split(factory.valsplit);
                            //ici on recupère la chaine de caractère et on la rend sous forme de tableau pour pouvoir afficher ç l'ecran
                        deferred.resolve(success.data);
                    },function(error,status){
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
                    }).then(function(success){
                        deferred.resolve(success);
                    },function(error){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                getcategorieProfils: function(tab,iduser){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({method: 'POST',url: '/categorie_profils/user_master',data:{ofuser:tab}
                    }).then(function(success){
                        factory.profsCats=[];
                        factory.allMedias=[];
                        //$cookieStore.put('profsCats',0);
                        var usemed={},use={};
                        factory.allMedias=groupeBy(success.data.ofuser,success.data.ofmed).alm;
                        factory.profsCats=groupeBy(success.data.ofuser,success.data.ofmed).pc;
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
                        deferred.resolve(success);
                    },function(error){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                deletes: function(prof){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'DELETE',
                        url: '/profil/'+prof._id,
                        data:prof
                    }).then(function (resp) {
                        deferred.resolve(resp.data);
                    },function(msg){
                        deferred.reject(msg)
                    });

                    return deferred.promise;
                },
                ajouterProfil: function(prof){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    prof.objectifs=prof.data.join(factory.valsplit)
                    console.log(prof.objectifs)
                    delete prof.data;
                    $http({
                        method: 'POST',
                        url: '/profils',
                        data: prof
                    }).then(function(success){
                        console.log(success)
                        deferred.resolve(success.data);
                    },function(error){
                        console.log(error)
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                modifierProfil: function(prof){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    prof.objectifs=prof.data.join(factory.valsplit)
                    delete prof.data;
                    $http({
                        method: 'PUT',
                        url: '/profil/'+prof._id,
                        data: prof
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }
            };
            return factory;
        }])
.factory('UserFactory', ['$http','$q','Upload',
        'AuthService','isAuthenticated',function( $http , $q ,Upload,AuthService,isAuthenticated){
            var factory = {
                LOCAL_TOKEN_KEY : 'yourTokenKey',
                authToken:'',
                userss: false,
                pourToken:'',
                Tokeni:"",
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
                    }).then(function(success){
                        factory.userss=success.data;
                        deferred.resolve(success.data);
                    },function(error){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },getmedianotation: function(id){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/media/'+id+'/media_user',
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },getToken: function(id){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: '/reset/'+id,
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
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
                        deferred.resolve(resp.data);
                    },function(msg){
                        deferred.reject(msg)
                    });

                    return deferred.promise;
                },updatepassword: function(user,id){//mise a jour de l'utilisateur
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                        url: '/reset/'+id,
                        data:user
                    }).then(function (resp) {
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
                        deferred.resolve(data.data);
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){

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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
                        console.log(error);
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
                    }).then(function(success){
                        factory.medias=success.data;
                        deferred.resolve(success.data);
                    },function(error){
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

                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error){
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

                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(result){
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
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error){
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },
                updatenotation: function(usmed){
                    factory.loadUserCredentials();
                    var deferred = $q.defer();
                    console.log(usmed);
                    $http({
                        method: 'PUT',
                        url: '/medianotation/'+usmed.id,
                        data: usmed
                    }).then(function(success){
                        deferred.resolve(success.data);
                    },function(error,status){
                        //let the function caller know the error
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }


            }
            return factory;
        }])
.factory('isAuthenticated', function(){
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
    })

.service('AuthService', function($q, $http, isAuthenticated,$cookieStore,Upload) {
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



    })
.factory('Auth', function($resource, $rootScope, $cookieStore, $q){
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
.service('sharedProperties', function () {
    var property = 'First';

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
})
.service('sharedmdtabactual', function () {
    var property = false;
    return {
        get: function () {
            return property;
        },
        set: function(value) {
            property = value;
        }
    };
})
.service('sharedmdtabactual2', function () {
    var property;

    return {
        get: function () {
            return property;
        },
        set: function(value) {
            if(property)property=property;
            else property = value;
        }
    };
})
.service('shared', function () {
    var property=0;
    return {
        get: function () {
            return property;
        },
        set: function(value) {
           property = value;
        }
    };
})
    .service('shared2', function () {
    var property=0;
    return {
        get: function () {
            return property;
        },
        set: function(value) {
           property = value;
        }
    };
})
    .service('shared3', function () {
    var property=0;
    return {
        get: function () {
            return property;
        },
        set: function(value) {
           property = value;
        }
    };
})
    .service('shared4', function () {
    var property=0;
    return {
        get: function () {
            return property;
        },
        set: function(value) {
           property = value;
        }
    };
})
    .service('shared5', function () {
    var property=0;
    return {
        get: function () {
            return property;
        },
        set: function(value) {
           property = value;
        }
    };
})
    .service('shared6', function () {
    var property="";
    return {
        get: function () {
            return property;
        },
        set: function(value) {
           property = value;
        }
    };
});

