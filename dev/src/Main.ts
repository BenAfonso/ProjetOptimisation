import {Etudiant} from './Etudiant';
import {Projet} from './Projet';
import {Voeux} from './Voeux';
import {Repartitions} from './Repartitions';
import {Assignation} from './Assignation';
import {Binome} from './Binome';
import {Generator} from './Generator';

// Créations des projets
let projets: Array<Projet> = Generator.generateProjets(8);
let etudiants: Array<Etudiant> = Generator.generateEtudiants(16,projets);

// Création d'une répartition

let repartitions: Repartitions = new Repartitions(etudiants, projets);





console.log("===========================================================================")
console.log("Nombre d'étudiants: "+repartitions.getEtudiants().length);
console.log("Nombre de binômes: "+repartitions.getEtudiants().length / 2);
console.log("Nombre de projets: "+repartitions.getProjets().length);

//console.log("[+] Nombre de répartitions possibles: "+repartitions.getNombreRepartitions());
console.log("===========================================================================")
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


console.log("====> Temps de calcul: "+repartitions.timeElapsed+" ms");
