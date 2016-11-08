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
var P5 = new Projet_1.Projet("5");
var P6 = new Projet_1.Projet("6");
var P7 = new Projet_1.Projet("7");
var P8 = new Projet_1.Projet("8");
var Projets = [P1, P2, P3, P4, P5, P6, P7, P8];
// Création des Voeux
var voeuxE1 = new Voeux_1.Voeux([P1, P2, P3, P5, P7]);
var voeuxE2 = new Voeux_1.Voeux([P8, P1, P3, P4, P2]);
var voeuxE3 = new Voeux_1.Voeux([P1, P3, P2, P4, P5]);
var voeuxE4 = new Voeux_1.Voeux([P1, P2, P6, P3, P4]);
// Création des Etudiants
var E1 = new Etudiant_1.Etudiant('1', voeuxE1);
var E2 = new Etudiant_1.Etudiant('2', voeuxE2);
var E3 = new Etudiant_1.Etudiant('3', voeuxE3);
var E4 = new Etudiant_1.Etudiant('4', voeuxE4);
var E5 = new Etudiant_1.Etudiant('5', voeuxE4);
var E6 = new Etudiant_1.Etudiant('6', voeuxE3);
var Etudiants = [E1, E2, E3, E4, E5, E6];
// Création d'une répartition
var repartitions = new Repartitions_1.Repartitions(Etudiants, Projets);
console.log("===========================================================================");
console.log("Nombre d'étudiants: " + repartitions.getEtudiants().length);
console.log("Nombre de binômes: " + repartitions.getEtudiants().length / 2);
console.log("Nombre de projets: " + repartitions.getProjets().length);
console.log("[+] Nombre de répartitions possibles: " + repartitions.getNombreRepartitions());
console.log("===========================================================================");
//console.log(repartitions.getBinomesPossibles());
//console.log(repartitions.getRepartitionsBinomesPossibles());
//console.log(repartitions.getRepartitionsProjetsPossibles());
console.log("===========================================================================");
console.log("");
console.log("Répartitions possibles: ");
console.log("");
console.log(repartitions.getRepartitions());
console.log("");
console.log("===========================================================================");
console.log("");
console.log("Meilleures répartitions: ");
console.log(repartitions.getBestRepartitions());
if (repartitions.getBestRepartitions().length > 1) {
    console.log("===========================================================================");
    console.log("\n\nEt le hasard a choisit: ");
    console.log(repartitions.getBestRepartition());
}
console.log(repartitions.bestRepartition);
console.log("");
console.log("====> Temps de calcul: " + repartitions.timeElapsed + " ms");
