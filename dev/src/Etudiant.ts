import {Voeux} from './Voeux';
import {Projet} from './Projet';

export class Etudiant {
  nom: string;
  voeux: Voeux;

  constructor(nom: string, voeux: Voeux) {
    this.nom = nom;
    this.voeux = voeux;
  }

  getNom() {
    return this.nom;
  }

  getVoeux() {
    return this.voeux;
  }

  setVoeux(voeux: Voeux) {
    this.voeux = voeux;
  }

  setNom(nom: string) {
    this.nom = nom;
  }

  getErreur(projet: Projet): number {
    let err = this.voeux.getAllVoeux().indexOf(projet);
    if (err > -1) {
      return err*err;
    } else {
      return 1000;
    }
  }

}
