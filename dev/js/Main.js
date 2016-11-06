"use strict";
var Etudiant_1 = require('./Etudiant');
var Projet_1 = require('./Projet');
var Voeux_1 = require('./Voeux');
var Repartitions_1 = require('./Repartitions');
// Créations des projets
var P1 = new Projet_1.Projet("1");
var P2 = new Projet_1.Projet("2");
var P3 = new Projet_1.Projet("3");
var P4 = new Projet_1.Projet("4");
var Projets = [P1, P2, P3];
// Création des Voeux
var voeuxE1 = new Voeux_1.Voeux([P1, P2, P3, null, null]);
var voeuxE2 = new Voeux_1.Voeux([null, P1, P3, null, P2]);
var voeuxE3 = new Voeux_1.Voeux([P1, P3, P2, null, null]);
var voeuxE4 = new Voeux_1.Voeux([P1, P2, null, P3, null]);
// Création des Etudiants
var E1 = new Etudiant_1.Etudiant('1', voeuxE1);
var E2 = new Etudiant_1.Etudiant('2', voeuxE2);
var E3 = new Etudiant_1.Etudiant('3', voeuxE3);
var E4 = new Etudiant_1.Etudiant('4', voeuxE4);
var Etudiants = [E1, E2, E3, E4];
// Création d'une répartition
var repartitions = new Repartitions_1.Repartitions(Etudiants, Projets);
//console.log(repartitions.getBinomesPossibles());
//console.log(repartitions.getRepartitionsBinomesPossibles());
//console.log(repartitions.getRepartitionsProjetsPossibles());
//console.log(repartitions.getRepartitions());
