"use strict";
var Repartitions_1 = require('./Repartitions');
var Generator_1 = require('./Generator');
// Créations des projets
var projets = Generator_1.Generator.generateProjets(9);
var etudiants = Generator_1.Generator.generateEtudiants(16, projets);
// Création d'une répartition
var repartitions = new Repartitions_1.Repartitions(etudiants, projets);
console.log("===========================================================================");
console.log("Nombre d'étudiants: " + repartitions.getEtudiants().length);
console.log("Nombre de binômes: " + repartitions.getEtudiants().length / 2);
console.log("Nombre de projets: " + repartitions.getProjets().length);
//console.log("[+] Nombre de répartitions possibles: "+repartitions.getNombreRepartitions());
console.log("===========================================================================");
//console.log(repartitions.getBinomesPossibles());
//console.log(repartitions.getRepartitionsBinomesPossibles());
//console.log(repartitions.getRepartitionsProjetsPossibles());
console.log("===========================================================================");
console.log("");
console.log("Répartitions possibles: ");
console.log("");
//console.log(repartitions.getRepartitions().length);
console.log("");
console.log("===========================================================================");
console.log("");
console.log("Meilleures répartitions: ");
console.log(repartitions.getBestRepartitions().toString());
if (repartitions.getBestRepartitions().length > 1) {
    console.log("===========================================================================");
    console.log("\n\nEt le hasard a choisit: ");
    console.log(repartitions.getBestRepartition().toString());
}
console.log("");
console.log("====> Temps de calcul: " + repartitions.timeElapsed + " ms");
