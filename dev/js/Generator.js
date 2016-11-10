"use strict";
var Etudiant_1 = require('./Etudiant');
var Projet_1 = require('./Projet');
var Voeux_1 = require('./Voeux');
var Generator = (function () {
    function Generator() {
    }
    Generator.generateEtudiants = function (n, projets) {
        var etudiants = [];
        for (var i = 0; i < n; i++) {
            // Creation de voeux;
            var etudiant = new Etudiant_1.Etudiant("E" + i, Generator.generateVoeux(projets));
            etudiants.push(etudiant);
        }
        return etudiants;
    };
    Generator.generateProjets = function (n) {
        var projets = [];
        for (var i = 0; i < n; i++) {
            var projet = new Projet_1.Projet("P" + i);
            projets.push(projet);
        }
        return projets;
    };
    Generator.generateVoeux = function (projets) {
        var projetsVoeux = [];
        var projetsTemp = projets.slice();
        for (var i = 0; i < 5; i++) {
            var random = Math.floor(Math.random() * projetsTemp.length);
            var projetSelect = projetsTemp[random];
            projetsTemp.splice(random, 1);
            projetsVoeux.push(projetSelect);
        }
        return new Voeux_1.Voeux(projetsVoeux);
    };
    return Generator;
}());
exports.Generator = Generator;
