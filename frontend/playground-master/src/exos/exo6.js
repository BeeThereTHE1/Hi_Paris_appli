"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var d3 = require("d3");
exports.exo6 = {
    hiddenControls: [
        "learningRate",
        "activation",
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
        activation: state_1.activations["sigmoid"],
        numHiddenLayers: 0,
        networkShape: [],
        x: true,
        y: true,
        xSquared: false,
        ySquared: false,
        xTimesY: false,
        cosX: false,
        sinX: false,
        cosY: false,
        sinY: false
    }
};
/**
 * Initialise la popup d'introduction de l'exercice 6 (2 pages).
 */
function initExo6Popups() {
    var overlay = d3.select("#exo6-popup-overlay");
    var page1 = d3.select("#exo6-page1");
    var page2 = d3.select("#exo6-page2");
    overlay.style("display", "flex");
    d3.select("#exo6-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo6-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo6Popups = initExo6Popups;
