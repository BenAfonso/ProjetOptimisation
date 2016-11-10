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
        this.bestRepartitions = [];
        this.repartitions = [];
        var t0 = new Date().getTime();
        this.compute();
        var t1 = new Date().getTime();
        this.timeElapsed = (t1 - t0);
    }
    Repartitions.prototype.compute = function () {
        this.calculerBinomesPossibles();
        this.calculerRepartitionsBinomesPossibles();
        this.calculerRepartitionsProjetsPossibles();
        this.calculerRepartitionsPossibles();
        this.getMinErreur();
        this.getBestRepartitions();
        this.bestRepartition = this.getBestRepartition();
    };
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
        var permutate = function (src, minLen, maxLen) {
            minLen = minLen - 1 || 0;
            maxLen = maxLen || src.length + 1;
            var Asource = src.slice(); // copy the original so we don't apply results to the original.
            var Aout = [];
            var minMax = function (arr) {
                var len = arr.length;
                if (len > minLen && len <= maxLen) {
                    Aout.push(arr);
                }
            };
            var picker = function (arr, holder, collect) {
                if (holder.length) {
                    collect.push(holder);
                }
                var len = arr.length;
                for (var i = 0; i < len; i++) {
                    var arrcopy = arr.slice();
                    var elem = arrcopy.splice(i, 1);
                    var result = holder.concat(elem);
                    minMax(result);
                    if (len) {
                        picker(arrcopy, result, collect);
                    }
                    else {
                        collect.push(result);
                    }
                }
            };
            picker(Asource, [], []);
            return Aout;
        };
        this.repartitionsProjetsPossibles = permutate(this.projets, this.etudiants.length / 2, this.etudiants.length / 2);
        //console.log(this.repartitionsProjetsPossibles);
    };
    Repartitions.prototype.calculerRepartitionsPossibles = function () {
        var repartitions;
        var assignations = [];
        var nbBinomes = this.repartitionsBinomesPossibles.length;
        var nbProjets = this.repartitionsProjetsPossibles.length;
        var nbBinomesParRepartition = this.repartitionsBinomesPossibles[0].length;
        for (var i = 0; i < nbBinomes; i++) {
            for (var j = 0; j < nbProjets; j++) {
                for (var k = 0; k < nbBinomesParRepartition; k++) {
                    var assignation = new Assignation_1.Assignation(this.repartitionsBinomesPossibles[i][k], this.repartitionsProjetsPossibles[j][k]);
                    assignations.push(assignation);
                }
                var repartition = new Repartition_1.Repartition(assignations);
                this.repartitions.push(repartition);
                assignations = [];
            }
        }
    };
    Repartitions.prototype.getMinErreur = function () {
        var erreurMin = 100000;
        for (var i = 0; i < this.repartitions.length; i++) {
            if (this.repartitions[i].getErreur() < erreurMin) {
                erreurMin = this.repartitions[i].getErreur();
                this.bestRepartitions = [];
                this.bestRepartitions.push(this.repartitions[i]);
            }
            else if (this.repartitions[i].getErreur() == erreurMin) {
                this.bestRepartitions.push(this.repartitions[i]);
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
    Repartitions.prototype.pickRandomNumberBetween = function (a, b) {
        return Math.floor(Math.random() * b) + a;
    };
    Repartitions.prototype.getProjets = function () {
        return this.projets;
    };
    Repartitions.prototype.getRepartitions = function () {
        return this.repartitions;
    };
    Repartitions.prototype.getBestRepartitions = function () {
        return this.bestRepartitions;
    };
    Repartitions.prototype.getBestRepartition = function () {
        var rand = this.pickRandomNumberBetween(0, this.bestRepartitions.length - 1);
        return this.bestRepartitions[rand];
    };
    Repartitions.prototype.getNombreRepartitions = function () {
        /* (Combinaison de 2 parmi nombre d'étudiant * Arrangements de nombre de
         binomes parmi nombre de projets) / 2 */
        var N = this.projets.length;
        var p = this.etudiants.length;
        return ((this.factorielle(p) / ((this.factorielle(p - 2) * 2))) * (this.factorielle(N) / this.factorielle(N - (p / 2)))) / (p / 2);
    };
    Repartitions.prototype.factorielle = function (n) {
        if (n == 0)
            return 1;
        else
            return n * this.factorielle(n - 1);
    };
    Repartitions.prototype.toString = function () {
        var res = "[ ";
        this.repartitions.forEach(function (repartition) {
            res = res + repartition.toString() + "\na\n";
            console.log(repartition.toString());
        });
        return res + " ]";
    };
    return Repartitions;
}());
exports.Repartitions = Repartitions;
