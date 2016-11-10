import {Etudiant} from './Etudiant';
import {Projet} from './Projet';
import {Binome} from './Binome';
import {Voeux} from './Voeux';

export class Generator {
  static generateEtudiants(n: number, projets: Array<Projet>): Array<Etudiant> {
    let etudiants: Array<Etudiant> = [];
    for(var i = 0; i < n; i++) {
      // Creation de voeux;
      let etudiant = new Etudiant("E"+i,Generator.generateVoeux(projets));
      etudiants.push(etudiant);
    }
    return etudiants;

  }

  static generateProjets(n: number): Array<Projet> {
    let projets: Array<Projet> = [];
    for(var i = 0; i < n; i++) {
      let projet = new Projet("P"+i);
      projets.push(projet);
    }
    return projets;
  }


  static generateVoeux(projets: Array<Projet>): Voeux {
    let projetsVoeux: Array<Projet> = [];
    let projetsTemp: Array<Projet> = projets.slice();
    for (var i = 0; i < 5; i++) {
      let random: number = Math.floor(Math.random() * projetsTemp.length);
      let projetSelect: Projet = projetsTemp[random];
      projetsTemp.splice(random, 1);
      projetsVoeux.push(projetSelect);
    }
    return new Voeux(projetsVoeux);
  }

}
