"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var d3 = require("d3");
exports.exo7 = {
    hiddenControls: [
        "learningRate",
        "regularization",
        "regularizationRate",
        "problem",
        "percTrainData",
        "noise",
        "batchSize",
        "showTestData",
        "discretize",
        "xSquared",
        "ySquared",
        "xTimesY",
        "cosX",
        "cosY",
        "sinX",
        "sinY",
        "weightEditor",
        "biasEditor",
        "doubleRunButton",
        "seedControl"
    ],
    forcedState: {
        dataset: state_1.datasets["circle"],
        activation: state_1.activations["linear"],
        numHiddenLayers: 1,
        networkShape: [4],
        x: true,
        y: true,
        xTimesY: false,
        xSquared: false,
        ySquared: false,
        cosX: false,
        sinX: false,
        cosY: false,
        sinY: false
    }
};
function initExo7Popups() {
    var overlay = d3.select("#exo7-popup-overlay");
    var page1 = d3.select("#exo7-page1");
    var page2 = d3.select("#exo7-page2");
    // Afficher la popup d'intro au chargement
    overlay.style("display", "flex");
    // Bouton "Suivant" page 1 → page 2
    d3.select("#exo7-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    // Bouton "Commencer" page 2 → ferme la popup
    d3.select("#exo7-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo7Popups = initExo7Popups;
