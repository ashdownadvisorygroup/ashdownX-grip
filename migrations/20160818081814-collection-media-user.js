'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createCollection("users_medias", function (err) {
    if(err){
      console.log("Erreur");
      console.log(err);
    }
    else{
      console.log("mediauser a ete  créé avec succès");
    }
  });
  return null;
};exports.up = function(db) {
  db.createCollection("categorie_medias", function (err) {
    if(err){
      console.log("Erreur");
      console.log(err);
    }
    else{
      console.log("categoriemedias a ete  créé avec succès");
    }
  });
  return null;
};

exports.down = function(db) {
  db.dropCollection("users_medias", function(err){
    if(err){
      console.log("Une erreur c'est produite lors du l'annulation de la migration");
      console.log(err);
    }
    else{
      console.log("Annulation de la migration(creation de mediauser)effectuée avec succès!!!");
    }
  });
  return null;
};exports.down = function(db) {
  db.dropCollection("categorie_medias", function(err){
    if(err){
      console.log("Une erreur c'est produite lors du l'annulation de la migration");
      console.log(err);
    }
    else{
      console.log("Annulation de la migration(creation de mediauser)effectuée avec succès!!!");
    }
  });
  return null;
};
