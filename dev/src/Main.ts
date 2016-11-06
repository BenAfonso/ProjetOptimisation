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

let Projets: Array<Projet> = [P1,P2,P3];

// Création des Voeux
let voeuxE1: Voeux = new Voeux([P1,P2,P3,null,null]);
let voeuxE2: Voeux = new Voeux([null,P1,P3,null,P2]);
let voeuxE3: Voeux = new Voeux([P1,P3,P2,null,null]);
let voeuxE4: Voeux = new Voeux([P1,P2,null,P3,null]);

// Création des Etudiants
let E1: Etudiant = new Etudiant('1', voeuxE1);
let E2: Etudiant = new Etudiant('2', voeuxE2);
let E3: Etudiant = new Etudiant('3', voeuxE3);
let E4: Etudiant = new Etudiant('4', voeuxE4);


let Etudiants: Array<Etudiant> = [E1,E2,E3,E4];


// Création d'une répartition

let repartitions: Repartitions = new Repartitions(Etudiants, Projets);
//console.log(repartitions.getBinomesPossibles());
//console.log(repartitions.getRepartitionsBinomesPossibles());
//console.log(repartitions.getRepartitionsProjetsPossibles());
//console.log(repartitions.getRepartitions());
