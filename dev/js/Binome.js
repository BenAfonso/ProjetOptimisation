"use strict";
var Binome = (function () {
    function Binome(etudiant1, etudiant2) {
        this.etudiant1 = etudiant1;
        this.etudiant2 = etudiant2;
    }
    Binome.prototype.getEtudiant1 = function () {
        return this.etudiant1;
    };
    Binome.prototype.getEtudiant2 = function () {
        return this.etudiant2;
    };
    Binome.prototype.getErreur = function (projet) {
        return this.etudiant1.getErreur(projet) + this.etudiant2.getErreur(projet);
    };
    Binome.prototype.isPartOf = function (b2) {
        return (this.getEtudiant1() == b2.getEtudiant2() || this.getEtudiant2() == b2.getEtudiant1() || this.getEtudiant1() == b2.getEtudiant1() || this.getEtudiant2() == b2.getEtudiant2());
    };
    Binome.prototype.toString = function () {
        return "(" + this.etudiant1.toString() + ", " + this.etudiant2.toString() + ")";
    };
    return Binome;
}());
exports.Binome = Binome;
