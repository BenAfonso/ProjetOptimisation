"use strict";
var Projet = (function () {
    function Projet(nom) {
        this.nom = nom;
    }
    Projet.prototype.getNom = function () {
        return this.nom;
    };
    Projet.prototype.toString = function () {
        return this.nom;
    };
    return Projet;
}());
exports.Projet = Projet;
