import {Etudiant} from './Etudiant';
import {Projet} from './Projet';

export class Binome {
  etudiant1: Etudiant;
  etudiant2: Etudiant;

  constructor(etudiant1: Etudiant, etudiant2: Etudiant) {
    this.etudiant1 = etudiant1;
    this.etudiant2 = etudiant2;
  }

  getEtudiant1() : Etudiant {
    return this.etudiant1;
  }

  getEtudiant2() : Etudiant {
    return this.etudiant2;
  }

  getErreur(projet: Projet): number {
    return this.etudiant1.getErreur(projet)+this.etudiant2.getErreur(projet);
  }

  isPartOf(b2: Binome): boolean {
    return (this.getEtudiant1() == b2.getEtudiant2() || this.getEtudiant2() == b2.getEtudiant1() || this.getEtudiant1() == b2.getEtudiant1() || this.getEtudiant2() == b2.getEtudiant2());
  }

  toString(): string {
    return "("+this.etudiant1.toString()+", "+this.etudiant2.toString()+")";
  }

}
