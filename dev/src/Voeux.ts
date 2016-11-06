import {Projet} from './Projet';

export class Voeux {

  // Voeux de 0 à 4
  voeux: Array<Projet>;

  constructor(voeux: Array<Projet>) {
    this.voeux = voeux;
  }

  getAllVoeux(): Array<Projet> {
    return this.voeux;
  }
  
  getVoeux(numero: number): Projet {
    if (numero < 0 || numero > 4) {
      console.log("Erreur: Numero de voeux entre 0 et 4");
      return;
    }
    return this.voeux[numero]
  }

}
