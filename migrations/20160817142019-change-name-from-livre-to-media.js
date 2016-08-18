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
  db.renameCollection("Medias", "media", function(err){
      if(err){
        console.log("Une erreur c'est produite lors du renommage!!!");
        console.log(err);
      }
    else{
        console.log("Le nom de la collection a été modifié avec succès!!!");
      }
  });
  return null;
};

exports.down = function(db) {
  db.renameCollection("media", "Medias", function(err){
    if(err){
      console.log("Une erreur c'est produite lors du l'annulation de la migration");
      console.log(err);
    }
    else{
      console.log("Annulation de la migration effectuée avec succès!!!");
    }
  });
  return null;
};
