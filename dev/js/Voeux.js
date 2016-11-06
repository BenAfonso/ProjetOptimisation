"use strict";
var Voeux = (function () {
    function Voeux(voeux) {
        this.voeux = voeux;
    }
    Voeux.prototype.getAllVoeux = function () {
        return this.voeux;
    };
    Voeux.prototype.getVoeux = function (numero) {
        if (numero < 0 || numero > 4) {
            console.log("Erreur: Numero de voeux entre 0 et 4");
            return;
        }
        return this.voeux[numero];
    };
    return Voeux;
}());
exports.Voeux = Voeux;
