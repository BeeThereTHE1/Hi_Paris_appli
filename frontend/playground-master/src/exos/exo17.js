"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo17 = {
    hiddenControls: [
        "activation",
        "regularization",
        "regularizationRate",
        "problem",
        "percTrainData",
        "noise",
        "batchSize",
        "showTestData",
        "dataset",
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
        "seedControl",
        "doubleRunButton"
    ],
    forcedState: {
        learningRate: 10,
        dataset: state_1.datasets["gauss"],
        activation: state_1.activations["linear"],
        percTrainData: 50,
        noise: 0,
        batchSize: 10,
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
function initExo17Popups() {
    var overlay = d3.select("#exo17-popup-overlay");
    var page1 = d3.select("#exo17-page1");
    var page2 = d3.select("#exo17-page2");
    overlay.style("display", "flex");
    d3.select("#exo17-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo17-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo17Popups = initExo17Popups;
