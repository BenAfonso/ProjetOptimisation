"use strict";
var Repartition = (function () {
    function Repartition(repartition) {
        this.repartition = repartition;
        this.calculerErreur();
    }
    Repartition.prototype.getRepartition = function () {
        return this.repartition;
    };
    Repartition.prototype.calculerErreur = function () {
        var erreur = 0;
        this.repartition.forEach(function (assignation) {
            erreur += assignation.getErreur();
        });
        this.erreur = erreur;
    };
    Repartition.prototype.getErreur = function () {
        return this.erreur;
    };
    Repartition.prototype.toString = function () {
        var res = "{ ";
        this.repartition.forEach(function (assignation) {
            res = res + assignation.toString() + ", ";
        });
        return res + "} Erreur: " + this.getErreur();
    };
    return Repartition;
}());
exports.Repartition = Repartition;
