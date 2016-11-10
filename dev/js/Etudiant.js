"use strict";
var Settings_1 = require('./Settings');
var Etudiant = (function () {
    function Etudiant(nom, voeux) {
        this.nom = nom;
        this.voeux = voeux;
    }
    Etudiant.prototype.getNom = function () {
        return this.nom;
    };
    Etudiant.prototype.getVoeux = function () {
        return this.voeux;
    };
    Etudiant.prototype.setVoeux = function (voeux) {
        this.voeux = voeux;
    };
    Etudiant.prototype.setNom = function (nom) {
        this.nom = nom;
    };
    Etudiant.prototype.getErreur = function (projet) {
        var err = Settings_1.Settings.CoefficientErreur[this.voeux.getAllVoeux().indexOf(projet)];
        if (err > -1) {
            return err;
        }
        else {
            return Settings_1.Settings.CoefficientErreurMax;
        }
    };
    Etudiant.prototype.toString = function () {
        return this.nom;
    };
    return Etudiant;
}());
exports.Etudiant = Etudiant;
