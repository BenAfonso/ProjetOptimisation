"use strict";
var Repartition = (function () {
    function Repartition(repartition) {
        this.repartition = repartition;
        this.calculerErreur();
    }
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
    return Repartition;
}());
exports.Repartition = Repartition;
