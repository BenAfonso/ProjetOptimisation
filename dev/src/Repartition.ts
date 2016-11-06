import {Assignation} from './Assignation';

export class Repartition {
  repartition: Array<Assignation>;
  erreur: number;

  constructor(repartition: Array<Assignation>) {
    this.repartition = repartition;
    this.calculerErreur();
  }

  calculerErreur() {
    let erreur: number = 0;
    this.repartition.forEach(function(assignation: Assignation) {
      erreur+=assignation.getErreur();
    });
    this.erreur = erreur;
  }

}
