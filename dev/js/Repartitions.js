"use strict";
var Binome_1 = require('./Binome');
var Assignation_1 = require('./Assignation');
var Repartition_1 = require('./Repartition');
var Repartitions = (function () {
    function Repartitions(etudiants, projets) {
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
    Repartitions.prototype.ajouterEtudiant = function (etudiant) {
        this.etudiants.push(etudiant);
    };
    Repartitions.prototype.calculerBinomesPossibles = function () {
        var i;
        var j;
        for (i = 0; i < this.etudiants.length - 1; i++) {
            for (j = i + 1; j < this.etudiants.length; j++) {
                var binome = new Binome_1.Binome(this.etudiants[i], this.etudiants[j]);
                this.binomesPossibles.push(binome);
            }
        }
    };
    Repartitions.prototype.calculerRepartitionsBinomesPossibles = function () {
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
        var G = this.binomesPossibles;
        var _loop_1 = function() {
            var repartition = [];
            G.forEach(function (binome) {
                var contained = false;
                var i = 0;
                while (i < repartition.length && !contained) {
                    contained = repartition[i].isPartOf(binome);
                    i++;
                }
                if (!contained) {
                    repartition.push(binome);
                }
            });
            if (repartition.length > (this_1.etudiants.length / 2 - 1)) {
                console.log(repartition);
                this_1.repartitionsBinomesPossibles.push(repartition);
            }
            G.splice(0, 1);
        };
        var this_1 = this;
        while (G.length > 0) {
            _loop_1();
        }
    };
    Repartitions.prototype.calculerRepartitionsProjetsPossibles = function () {
        // # Précond: Nombre d'étudiants % 2 == 0 => Nombre de binomes entier
        //TODO Imposer la taille des répartitions à Nombre de binômes
        console.log(this.projets);
        this.anagramma(this.projets, 0);
    };
    Repartitions.prototype.calculerRepartitionsPossibles = function () {
        var repartitions;
        // 5 fois
        var assignations = [];
        // Un ensemble de binomes et un ensemble de projets
        // Binome 1 -> Projet 1
        // Binome 2 -> Projet 2
        var max;
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
        var nbBinomes = this.repartitionsBinomesPossibles.length;
        var nbProjets = this.repartitionsProjetsPossibles.length;
        var nbBinomesParRepartition = this.repartitionsBinomesPossibles[0].length;
        for (var i = 0; i < nbBinomes; i++) {
            for (var j = 0; j < nbProjets; j++) {
                for (var k = 0; k < nbBinomesParRepartition; k++) {
                    var assignation = new Assignation_1.Assignation(this.repartitionsBinomesPossibles[i][k], this.repartitionsProjetsPossibles[j][k]);
                    //console.log(this.repartitionsBinomesPossibles[i][k], this.repartitionsProjetsPossibles[j][k]);
                    assignations.push(assignation);
                }
                var repartition = new Repartition_1.Repartition(assignations);
                assignations = [];
            }
        }
    };
    Repartitions.prototype.getBinomesPossibles = function () {
        return this.binomesPossibles;
    };
    Repartitions.prototype.getRepartitionsBinomesPossibles = function () {
        return this.repartitionsBinomesPossibles;
    };
    Repartitions.prototype.getRepartitionsProjetsPossibles = function () {
        return this.repartitionsProjetsPossibles;
    };
    Repartitions.prototype.getEtudiants = function () {
        return this.etudiants;
    };
    Repartitions.prototype.getProjets = function () {
        return this.projets;
    };
    Repartitions.prototype.getRepartitions = function () {
        return this.repartitions;
    };
    Repartitions.prototype.getNombreRepartitions = function () {
        /* (Combinaison de 2 parmi nombre d'étudiant * Arrangements de nombre de
         binomes parmi nombre de projets) / 2 */
        var N = this.projets.length;
        var p = this.etudiants.length;
        return ((this.factorielle(p) / ((this.factorielle(p - 2) * 2))) * (this.factorielle(N) / this.factorielle(N - (p / 2)))) / 2;
    };
    Repartitions.prototype.factorielle = function (n) {
        if (n == 0)
            return 1;
        else
            return n * this.factorielle(n - 1);
    };
    Repartitions.prototype.anagramma = function (T, first) {
        if ((T.length - first) <= 1) {
            //console.log(T);
            this.repartitionsProjetsPossibles.push(T);
            console.log(this.repartitionsProjetsPossibles);
        }
        else {
            for (var i = 0; i < T.length - first; i++) {
                this.round(T, first);
                this.anagramma(T, first + 1);
            }
        }
    };
    Repartitions.prototype.round = function (T, i) {
        var temp = T[i];
        var j;
        for (j = i; j < T.length - 1; j++) {
            T[j] = T[j + 1];
        }
        T[T.length - 1] = temp;
    };
    return Repartitions;
}());
exports.Repartitions = Repartitions;
