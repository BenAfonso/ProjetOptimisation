import {Binome} from './Binome';
import {Projet} from './Projet';
import {Assignation} from './Assignation';
import {Etudiant} from './Etudiant';
import {Repartition} from './Repartition';

export class Repartitions {

  repartitions: Array<Repartition>;
  bestRepartitions: Array<Repartition>;
  bestRepartition: Repartition;
  repartitionsProjetsPossibles: Array<Array<Projet>>;
  repartitionsBinomesPossibles: Array<Array<Binome>>;
  etudiants: Array<Etudiant>;
  projets: Array<Projet>;
  binomesPossibles: Array<Binome>;
  projetsPossibles: Array<Array<Projet>>;
  timeElapsed: number;

  constructor(etudiants: Array<Etudiant>, projets: Array<Projet>) {

    this.etudiants = etudiants;
    this.projets = projets;
    this.binomesPossibles = [];
    this.repartitionsBinomesPossibles = [];
    this.repartitionsProjetsPossibles = [];
    this.bestRepartitions = [];
    this.repartitions = [];

    var t0 = new Date().getTime();
    this.compute();
    var t1 = new Date().getTime();

    this.timeElapsed = (t1-t0);
  }

  compute() {

    this.calculerBinomesPossibles();
    this.calculerRepartitionsBinomesPossibles();
    this.calculerRepartitionsProjetsPossibles();
    this.calculerRepartitionsPossibles();

    this.getMinErreur();

    this.getBestRepartitions();

    this.bestRepartition = this.getBestRepartition();


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
              this.repartitionsBinomesPossibles.push(repartition);
            }
            G.splice(0,1);
        }


  }



  calculerRepartitionsProjetsPossibles() {

    // # Précond: Nombre d'étudiants % 2 == 0 => Nombre de binomes entier

    //TODO Imposer la taille des répartitions à Nombre de binômes

    var permutate = function(src: Array<Projet>, minLen: number, maxLen: number) {

    minLen = minLen-1 || 0;
    maxLen = maxLen || src.length+1;
    var Asource = src.slice(); // copy the original so we don't apply results to the original.

    var Aout: Array<Array<Projet>> = [];

    var minMax = function(arr: any){
        var len = arr.length;
        if(len > minLen && len <= maxLen){
            Aout.push(arr);
        }
    }

    var picker = function (arr: any, holder: any, collect: any) {
        if (holder.length) {
           collect.push(holder);
        }
        var len = arr.length;
        for (var i=0; i<len; i++) {
            var arrcopy = arr.slice();
            var elem = arrcopy.splice(i, 1);
            var result = holder.concat(elem);
            minMax(result);
            if (len) {
                picker(arrcopy, result, collect);
            } else {
                collect.push(result);
            }
        }
    }

    picker(Asource, [], []);

    return Aout;


  }

    this.repartitionsProjetsPossibles = permutate(this.projets, this.etudiants.length/2, this.etudiants.length/2);
    //console.log(this.repartitionsProjetsPossibles);
  }

  calculerRepartitionsPossibles() {
      let repartitions: Array<Repartition>;
      let assignations: Array<Assignation> = [];
      let nbBinomes: number = this.repartitionsBinomesPossibles.length;
      let nbProjets: number = this.repartitionsProjetsPossibles.length;
      let nbBinomesParRepartition: number = this.repartitionsBinomesPossibles[0].length;
      let errMin: number = 10000000; //Temp

      for (var i = 0; i < nbBinomes; i++) {

        for (var j = 0; j < nbProjets; j++) {
          for (var k = 0; k < nbBinomesParRepartition; k++) {
            let assignation: Assignation = new Assignation(this.repartitionsBinomesPossibles[i][k], this.repartitionsProjetsPossibles[j][k]);
            assignations.push(assignation);
          }
          let repartition: Repartition = new Repartition(assignations);
          //OPTIMISATION: Ajouter contrôle d'erreur si <= ErreurMin ==> Ajouter.
          // autre idée; compteur d'erreur sur boucle du dessus avec assignation
          // mettre un while et dès que erreur > min:: sortir et ajouter seulement
          // si erreurTotal <= erreurMin

          if (repartition.getErreur() <= errMin) {
            errMin = repartition.getErreur();
            this.repartitions.push(repartition);
          }

          console.log(this.repartitions.length);
          assignations = [];
        }

      }
  }




  getMinErreur() {

    let erreurMin = 100000;

    for (var i = 0; i < this.repartitions.length; i++) {
      if (this.repartitions[i].getErreur() < erreurMin) {
        erreurMin = this.repartitions[i].getErreur();
        this.bestRepartitions = [];
        this.bestRepartitions.push(this.repartitions[i]);
      } else if (this.repartitions[i].getErreur() == erreurMin) {
        this.bestRepartitions.push(this.repartitions[i]);
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

  pickRandomNumberBetween(a: number, b: number) {
    return Math.floor(Math.random() * b) + a;
  }

  getProjets() {
    return this.projets;
  }

  getRepartitions() {
    return this.repartitions;
  }

  getBestRepartitions() {
    return this.bestRepartitions;
  }


  getBestRepartition(): Repartition {
    let rand: number = this.pickRandomNumberBetween(0,this.bestRepartitions.length-1);

    return this.bestRepartitions[rand];
  }

  getNombreRepartitions() {
    /* (Combinaison de 2 parmi nombre d'étudiant * Arrangements de nombre de
     binomes parmi nombre de projets) / 2 */

     let N = this.projets.length;
     let p = this.etudiants.length;

     return ((this.factorielle(p) / ((this.factorielle(p-2)*2))) * (this.factorielle(N)/this.factorielle(N-(p/2)))) / (p/2)
  }

  factorielle(n: number): number {
    if (n==0) return 1
    else return n*this.factorielle(n-1);
  }


  toString(): string {
    let res: string = "[ "
    this.repartitions.forEach(function(repartition) {
      res=res+repartition.toString()+"\na\n";
      console.log(repartition.toString());
    })
    return res+" ]";
  }






}
