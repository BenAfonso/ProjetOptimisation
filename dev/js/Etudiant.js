"use strict";
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
        var err = this.voeux.getAllVoeux().indexOf(projet);
        if (err > -1) {
            return err * err;
        }
        else {
            return 1000;
        }
    };
    return Etudiant;
}());
exports.Etudiant = Etudiant;
