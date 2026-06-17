"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo3 = {
    hiddenControls: [
        "percTrainData",
        "noise",
        "batchSize",
        "numHiddenLayers",
        "showTestData",
        "discretize",
        "xTimesY",
        "cosX",
        "sinX",
        "cosY",
        "sinY",
        "activation",
        "learningRate",
        "problem",
        "regularization",
        "regularizationRate",
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
        xTimesY: false,
        xSquared: false,
        ySquared: false,
        cosX: false,
        sinX: false,
        cosY: false
    }
};
function initExo3Popups() {
    var overlay = d3.select("#exo3-popup-overlay");
    var page1 = d3.select("#exo3-page1");
    var page2 = d3.select("#exo3-page2");
    overlay.style("display", "flex");
    d3.select("#exo3-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo3-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo3Popups = initExo3Popups;
