"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
var d3 = require("d3");
exports.exo8 = {
    hiddenControls: [
        "learningRate",
        "regularization",
        "regularizationRate",
        "problem",
        "percTrainData",
        "noise",
        "batchSize",
        "showTestData",
        "xSquared",
        "ySquared",
        "xTimesY",
        "cosX",
        "cosY",
        "sinX",
        "sinY",
        "numHiddenLayers",
        "weightEditor",
        "biasEditor",
        "seedControl"
    ],
    forcedState: {
        dataset: state_1.datasets["circle"],
        activation: state_1.activations["sigmoid"],
        numHiddenLayers: 1,
        networkShape: [4],
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
 * Initialise la popup d'introduction de l'exercice 8 (2 pages).
 */
function initExo8Popups() {
    var overlay = d3.select("#exo8-popup-overlay");
    var page1 = d3.select("#exo8-page1");
    var page2 = d3.select("#exo8-page2");
    overlay.style("display", "flex");
    d3.select("#exo8-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo8-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo8Popups = initExo8Popups;
