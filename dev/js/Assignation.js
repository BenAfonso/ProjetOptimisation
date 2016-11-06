"use strict";
var Assignation = (function () {
    function Assignation(binome, projet) {
        this.binome = binome;
        this.projet = projet;
        this.calculerErreur();
    }
    Assignation.prototype.calculerErreur = function () {
        this.erreur = this.binome.getErreur(this.projet);
    };
    Assignation.prototype.getErreur = function () {
        return this.erreur;
    };
    Assignation.prototype.getBinome = function () {
        return this.binome;
    };
    Assignation.prototype.getProjet = function () {
        return this.projet;
    };
    return Assignation;
}());
exports.Assignation = Assignation;
