import {Etudiant} from './Etudiant';
import {Projet} from './Projet';
import {Voeux} from './Voeux';
import {Repartitions} from './Repartitions';
import {Assignation} from './Assignation';
import {Binome} from './Binome';

// Créations des projets
let P1: Projet = new Projet("1");
let P2: Projet = new Projet("2");
let P3: Projet = new Projet("3");
let P4: Projet = new Projet("4");
let P5: Projet = new Projet("5");
let P6: Projet = new Projet("6");
let P7: Projet = new Projet("7");
let P8: Projet = new Projet("8");



let Projets: Array<Projet> = [P1,P2,P3,P4,P5,P6,P7,P8];



// Création des Voeux
let voeuxE1: Voeux = new Voeux([P1,P2,P3,P5,P7]);
let voeuxE2: Voeux = new Voeux([P8,P1,P3,P4,P2]);
let voeuxE3: Voeux = new Voeux([P1,P3,P2,P4,P5]);
let voeuxE4: Voeux = new Voeux([P1,P2,P6,P3,P4]);

// Création des Etudiants
let E1: Etudiant = new Etudiant('1', voeuxE1);
let E2: Etudiant = new Etudiant('2', voeuxE2);
let E3: Etudiant = new Etudiant('3', voeuxE3);
let E4: Etudiant = new Etudiant('4', voeuxE4);
let E5: Etudiant = new Etudiant('5', voeuxE4);
let E6: Etudiant = new Etudiant('6', voeuxE3);

let Etudiants: Array<Etudiant> = [E1,E2,E3,E4,E5,E6];


// Création d'une répartition

let repartitions: Repartitions = new Repartitions(Etudiants, Projets);





console.log("===========================================================================")
console.log("Nombre d'étudiants: "+repartitions.getEtudiants().length);
console.log("Nombre de binômes: "+repartitions.getEtudiants().length / 2);
console.log("Nombre de projets: "+repartitions.getProjets().length);

console.log("[+] Nombre de répartitions possibles: "+repartitions.getNombreRepartitions());
console.log("===========================================================================")
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

console.log("");


console.log("====> Temps de calcul: "+repartitions.timeElapsed+" ms");
