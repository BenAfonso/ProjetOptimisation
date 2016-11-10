import {Assignation} from './Assignation';

export class Repartition {
  repartition: Array<Assignation>;
  erreur: number;

  constructor(repartition: Array<Assignation>) {
    this.repartition = repartition;
    this.calculerErreur();
  }

  getRepartition() {
    return this.repartition;
  }

  calculerErreur() {
    let erreur: number = 0;
    this.repartition.forEach(function(assignation: Assignation) {
      erreur+=assignation.getErreur();
    });
    this.erreur = erreur;
  }

  getErreur() {
    return this.erreur;
  }

  toString() {
    let res: string = "{ "
    this.repartition.forEach(function(assignation) {
      res=res+assignation.toString()+", ";
    });
    return res+"} Erreur: "+this.getErreur();
  }

}
