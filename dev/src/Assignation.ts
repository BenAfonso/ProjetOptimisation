import {Binome} from './Binome';
import {Projet} from './Projet';

export class Assignation {
  binome: Binome;
  projet: Projet;
  erreur: number;

  constructor(binome: Binome, projet: Projet) {
    this.binome = binome;
    this.projet = projet;
    this.calculerErreur();
  }

  calculerErreur() {
    this.erreur = this.binome.getErreur(this.projet);
  }

  getErreur() : number{
    return this.erreur;
  }

  getBinome(): Binome {
    return this.binome;
  }

  getProjet(): Projet {
    return this.projet;
  }


}
