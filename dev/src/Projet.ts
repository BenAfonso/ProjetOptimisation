export class Projet {
  nom: string;

  constructor(nom: string) {
    this.nom = nom;
  }

  getNom() {
    return this.nom;
  }

  toString(): string {
    return this.nom;
  }
}
