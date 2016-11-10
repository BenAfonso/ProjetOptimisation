"use strict";
var Settings = (function () {
    function Settings() {
    }
    Settings.CoefficientErreur = [0, 4, 25, 100, 10000];
    Settings.CoefficientErreurMax = 1000000;
    return Settings;
}());
exports.Settings = Settings;
