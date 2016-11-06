import {Binome} from './Binome';
import {Projet} from './Projet';
import {Assignation} from './Assignation';
import {Etudiant} from './Etudiant';
import {Repartition} from './Repartition';

export class Repartitions {

  repartitions: Array<Repartition>;
  repartitionsProjetsPossibles: Array<Array<Projet>>;
  repartitionsBinomesPossibles: Array<Array<Binome>>;
  etudiants: Array<Etudiant>;
  projets: Array<Projet>;
  binomesPossibles: Array<Binome>;
  projetsPossibles: Array<Array<Projet>>;

  constructor(etudiants: Array<Etudiant>, projets: Array<Projet>) {
    this.etudiants = etudiants;
    this.projets = projets;
    this.binomesPossibles = [];
    this.repartitionsBinomesPossibles = [];
    this.repartitionsProjetsPossibles = [];
    this.calculerBinomesPossibles();
    this.calculerRepartitionsBinomesPossibles();
    this.calculerRepartitionsProjetsPossibles();
    this.calculerRepartitionsPossibles();
  }

  ajouterEtudiant(etudiant: Etudiant) {
    this.etudiants.push(etudiant);
  }

  calculerBinomesPossibles() {
    let i: number;
    let j: number;
    for (i = 0; i < this.etudiants.length - 1; i++) {
      for (j = i+1; j < this.etudiants.length; j++) {
        let binome = new Binome(this.etudiants[i],this.etudiants[j]);
        this.binomesPossibles.push(binome);
      }
    }
  }

  calculerRepartitionsBinomesPossibles() {
    // Toutes les combinaisons de binômes possibles
    /*
    let a: Array<Binome> = this.binomesPossibles;
      var fn = function(n: any, src: Array<Binome>, got: Array<Binome>, all: Array<Array<Binome>>) {

        if (n == 0) {
          if (got.length > 0) {
            all[all.length] = got;
          }
          return;
        }
        for (var j = 0; j < src.length; j++) {
          fn(n - 1, src.slice(j + 1), got.concat([src[j]]), new Array(a));
        }
        return;
      }
      let all: any = [];
      for (var i=0; i < a.length; i++) {
        fn(i, a, [], all);
      }
      all.push(a);

      // Enlever les doublons
      this.repartitionsBinomesPossibles = all;
      */
      /*[
        [(1,2),(3,4)],
        [(1,2),(2,4)],
        [(1,4),(2,3)],
      ]*/

      this.repartitionsBinomesPossibles = [];
      let G: Array<Binome> = this.binomesPossibles;
      while (G.length > 0) {
            let repartition: Array<Binome> = [];
            G.forEach(function(binome) {
              let contained: boolean = false
              let i: number = 0;
              while (i < repartition.length && !contained) {
                contained = repartition[i].isPartOf(binome);
                i++;
              }

              if (!contained) {
                repartition.push(binome);
              }


            })
            if (repartition.length > (this.etudiants.length / 2 - 1)) {
              console.log(repartition);
              this.repartitionsBinomesPossibles.push(repartition);
            }
            G.splice(0,1);
        }


  }



  calculerRepartitionsProjetsPossibles() {

    // # Précond: Nombre d'étudiants % 2 == 0 => Nombre de binomes entier

    //TODO Imposer la taille des répartitions à Nombre de binômes
    this.anagramma(this.projets,0);

  }

  calculerRepartitionsPossibles() {
    let repartitions: Array<Repartition>;

    // 5 fois

      let assignations: Array<Assignation> = [];
      // Un ensemble de binomes et un ensemble de projets
      // Binome 1 -> Projet 1
      // Binome 2 -> Projet 2
      let max: number;

      /*
      binomes
      RepartitionProjets
      Pour tout i entre 0 et nbBinomes
        repartition.reset()
        repartition.ajouter(binomes[i], RepartitionProjets[j])
      FinPour


      BINOMES[0][0] = RepartitionProjets[0][0]
      BINOMES[0][1] = RepartitionProjets[0][1]
      BINOMES[0][2] = RepartitionProjets[0][2]
j+1
      BINOMES[0][0] = RepartitionProjets[1][0]
      BINOMES[0][1] = RepartitionProjets[1][1]
      BINOMES[0][2] = RepartitionProjets[1][2]
j+2
      BINOMES[0][0] = RepartitionProjets[2][0]
      BINOMES[0][1] = RepartitionProjets[2][1]
      BINOMES[0][2] = RepartitionProjets[2][2]

      BINOMES[1][0] = RepartitionProjets[1][0]

      */


      //console.log(this.repartitionsBinomesPossibles.length);
      //console.log(this.repartitionsProjetsPossibles);

      let nbBinomes: number = this.repartitionsBinomesPossibles.length;
      let nbProjets: number = this.repartitionsProjetsPossibles.length;
      let nbBinomesParRepartition: number = this.repartitionsBinomesPossibles[0].length;
      for (var i = 0; i < nbBinomes; i++) {
        for (var j = 0; j < nbProjets; j++) {
          for (var k = 0; k < nbBinomesParRepartition; k++) {
            let assignation: Assignation = new Assignation(this.repartitionsBinomesPossibles[i][k], this.repartitionsProjetsPossibles[j][k]);
            //console.log(this.repartitionsBinomesPossibles[i][k], this.repartitionsProjetsPossibles[j][k]);
            assignations.push(assignation);
          }
          let repartition: Repartition = new Repartition(assignations);
          assignations = [];
        }
      }






  }

  getBinomesPossibles() {
    return this.binomesPossibles;
  }

  getRepartitionsBinomesPossibles() {
    return this.repartitionsBinomesPossibles;
  }

  getRepartitionsProjetsPossibles() {
    return this.repartitionsProjetsPossibles;
  }

  getEtudiants() {
    return this.etudiants;
  }

  getProjets() {
    return this.projets;
  }

  getRepartitions() {
    return this.repartitions;
  }

  getNombreRepartitions() {
    /* (Combinaison de 2 parmi nombre d'étudiant * Arrangements de nombre de
     binomes parmi nombre de projets) / 2 */

     let N = this.projets.length;
     let p = this.etudiants.length;

     return ((this.factorielle(p) / ((this.factorielle(p-2)*2))) * (this.factorielle(N)/this.factorielle(N-(p/2)))) / 2
  }

  factorielle(n: number): number {
    if (n==0) return 1
    else return n*this.factorielle(n-1);
  }

  anagramma(T: Array<Projet>,first: number){
       if ((T.length - first) <= 1){
         //console.log(T);
         this.repartitionsProjetsPossibles.push(T);
         console.log(this.repartitionsProjetsPossibles);
         // TODO: Résoudre cette merde
       }else {
         for (var i = 0; i < T.length-first ; i++) {
           this.round(T, first);
           this.anagramma(T, first+1);
         }
       }
  }

  round(T: Array<Projet>, i: number){
      let temp: Projet = T[i];
      let j: number;
      for (j=i;j < T.length-1;j++) {
          T[j] = T[j+1];
      }
      T[T.length-1]= temp;
  }





}
